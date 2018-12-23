import re
import requests
import urllib.parse
from lxml import html

tag_re = re.compile("<.+?>")

def digest(text):

    links = []

    dom = html.fromstring(text)
    titles = dom.xpath("//div[@id='search']//h3/a")

    for title in titles:
        _title = html.tostring(title, encoding="unicode")
        _link = title.get("href").replace("/url?q=", "").rsplit("&sa", 1)[0]

        if _link.startswith("/search?q"):
            _link = "https://www.google.com" + _link

        _pure_title = re.sub(tag_re, "", _title)
        links.append({
            "title": _pure_title,
            "link": urllib.parse.unquote(_link)
        })
    return links

def search(q, offset=0):

    _url = f"https://www.google.com/search?q={q}&ie=UTF-8"

    if offset:
        _url += f"&start={offset}"

    res = requests.get(_url)
    return digest(res.text)


if __name__ == "__main__":
    search("こたつ")
