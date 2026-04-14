from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import joblib, re, json, nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

app = FastAPI(title="Fake Review Detection API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model      = joblib.load("model/best_model.joblib")
vectorizer = joblib.load("model/tfidf_vectorizer.joblib")

try:
    with open("model/model_metadata.json") as f:
        metadata = json.load(f)
except FileNotFoundError:
    metadata = {}

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

FAKE_SIGNALS = [
    "free","win","winning","winner","offer","prize","claim","discount",
    "limited time","click here","guaranteed","hurry","act now",
    "congratulations","selected","exclusive","earn money","make money",
    "risk free","special offer","buy now","expires","unlock",
]

def preprocess(text: str) -> str:
    text = text.lower()
    text = re.sub(r'http\S+|www\S+', '', text)
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    tokens = [lemmatizer.lemmatize(w) for w in text.split()
              if w not in stop_words and len(w) > 2]
    return ' '.join(tokens)

def get_signals(text: str) -> List[str]:
    lower = text.lower()
    return [kw for kw in FAKE_SIGNALS if kw in lower]

def run_prediction(review: str) -> dict:
    cleaned = preprocess(review)
    if not cleaned:
        raise HTTPException(status_code=422, detail="Review too short after cleaning.")
    vec    = vectorizer.transform([cleaned])
    pred   = model.predict(vec)[0]
    proba  = model.predict_proba(vec)[0]
    is_fake = bool(pred == 1)
    return {
        "prediction"  : "Fake Review" if is_fake else "Genuine Review",
        "is_fake"     : is_fake,
        "confidence"  : round(float(max(proba)) * 100, 2),
        "fake_prob"   : round(float(proba[1]) * 100, 2),
        "genuine_prob": round(float(proba[0]) * 100, 2),
        "signals"     : get_signals(review),
    }

class ReviewRequest(BaseModel):
    review: str

class BatchRequest(BaseModel):
    reviews: List[str]

@app.get("/")
def root():
    return {"status": "Fake Review Detection API is running", "docs": "/docs"}

@app.get("/health")
def health():
    return {
        "status"     : "ok",
        "model_name" : metadata.get("model_name", "Linear SVM"),
        "metrics"    : {
            "accuracy" : metadata.get("accuracy",  "91.12%"),
            "f1"       : metadata.get("f1",        "0.9112"),
            "roc_auc"  : metadata.get("roc_auc",   "0.9727"),
        }
    }

@app.post("/predict")
def predict(req: ReviewRequest):
    return run_prediction(req.review)

@app.post("/batch-predict")
def batch_predict(req: BatchRequest):
    if len(req.reviews) > 50:
        raise HTTPException(status_code=400, detail="Max 50 reviews per batch.")
    results    = [run_prediction(r) for r in req.reviews]
    fake_count = sum(1 for r in results if r["is_fake"])
    return {
        "results"      : results,
        "total"        : len(results),
        "fake_count"   : fake_count,
        "genuine_count": len(results) - fake_count,
        "fake_percent" : round(fake_count / len(results) * 100, 1),
    }