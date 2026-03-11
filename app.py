from flask import Flask, jsonify, render_template
import json

app = Flask(__name__)

# Load quotes from JSON file
with open('quotes.json', 'r', encoding='utf-8') as f:
    quotes = json.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/quotes')
def get_quotes():
    return jsonify(quotes)

@app.route('/api/quotes/tag/<tag_name>')
def get_quotes_by_tag(tag_name):
    filtered = [q for q in quotes if tag_name in q['tags']]
    return jsonify(filtered)

@app.route('/api/quotes/random')
def get_random_quote():
    import random
    return jsonify(random.choice(quotes))

if __name__ == '__main__':
    app.run(debug=True)
