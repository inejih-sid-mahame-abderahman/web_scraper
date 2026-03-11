import requests
from bs4 import BeautifulSoup
import json

url = "https://quotes.toscrape.com"

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

quotes = soup.find_all("div", class_="quote")

# Create a list to hold all quotes
all_quotes = []

for quote in quotes:
    text = quote.find("span", class_="text").text
    author = quote.find("small", class_="author").text
    
    # Get tags
    tag_elements = quote.find_all("a", class_="tag")
    tags = [tag.text for tag in tag_elements]
    
    # Create quote dictionary
    quote_data = {
        "text": text,
        "author": author,
        "tags": tags
    }
    
    all_quotes.append(quote_data)

# Save to JSON file
with open('quotes.json', 'w', encoding='utf-8') as f:
    json.dump(all_quotes, f, indent=2, ensure_ascii=False)

print(f"✅ Saved {len(all_quotes)} quotes to quotes.json")