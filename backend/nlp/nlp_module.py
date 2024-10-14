import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
import spacy

# Initialize spaCy model
nlp = spacy.load("en_core_web_sm")

def summarize_text(text, num_sentences=3):
    sentences = sent_tokenize(text)
    if len(sentences) <= num_sentences:
        return text
    return ' '.join(sentences[:num_sentences])

def extract_keywords(text, num_keywords=5):
    doc = nlp(text.lower())
    keywords = []
    for token in doc:
        if token.is_stop or token.is_punct:
            continue
        keywords.append(token.lemma_)
    freq = nltk.FreqDist(keywords)
    return [word for word, freq in freq.most_common(num_keywords)]

def analyze_sentiment(text):
    from nltk.sentiment import SentimentIntensityAnalyzer
    nltk.download('vader_lexicon')
    sia = SentimentIntensityAnalyzer()
    sentiment = sia.polarity_scores(text)
    return sentiment
