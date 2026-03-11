import requests
from bs4 import BeautifulSoup

url = "https://quotes.toscrape.com"

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

quotes = soup.find_all("div", class_="quote")

# Open file for writing
with open('my_quotes_inspirational.txt', 'w', encoding='utf-8') as file:
    
    inspirational_count = 0
    
    for i, quote in enumerate(quotes, 1):
        text = quote.find("span", class_="text").text
        author = quote.find("small", class_="author").text
        
        # Find all tags for this quote
        tag_elements = quote.find_all("a", class_="tag")
        tag_list = [tag.text for tag in tag_elements]
        
        # Check if "inspirational" is in the tags
        if "inspirational" in tag_list:
            inspirational_count += 1
            
            # Print to console
            print(f"INSPIRATIONAL QUOTE #{inspirational_count}")
            print(f"💬 {text}")
            print(f"👤 {author}")
            print(f"🏷️ Tags: {', '.join(tag_list)}")
            print("=" * 60)
            
            # Write to file with nice formatting
            file.write(f"Inspirational Quote #{inspirational_count}\n")
            file.write(f"Text: {text}\n")
            file.write(f"Author: {author}\n")
            file.write(f"Tags: {', '.join(tag_list)}\n")
            file.write("-" * 40 + "\n\n")

print(f"\n✅ Found {inspirational_count} inspirational quotes saved to my_quotes_inspirational.txt")