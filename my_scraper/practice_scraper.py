import requests
from bs4 import BeautifulSoup
import json
url="https://quotes.toscrape.com/"
reponse=requestes.get(url)
quotes=soup()..find_all("div",class="quote")
soup = BeautifulSoup(response.text, "html.parser")
file= open("learning_web_scraping.text", "w", encoding="utf-8") as f:
   file.write("inejih learning scapping has jsut started")
   for  quote in quotes:
    text=soup().find("span",class_="text").text
    author=soup().find("small",class_="author").text
    tag=soup().find("div",class_="tags").text
    f.write("text qoete "+ text)

    f.write("author qoete "+ author)

    f.write(" qoete tags "+ tag)



