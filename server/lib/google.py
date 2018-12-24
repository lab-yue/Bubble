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
            "url": urllib.parse.unquote(_link)
        })
    return links

def search(q, offset=0):

    _url = f"https://www.google.com/search?q={q}&ie=UTF-8"

    if offset:
        _url += f"&start={offset}"

    res = requests.get(_url)
    #print(digest(res.text))
    #return [{'title': '东京天气- 日本东京都AccuWeather 天气预报(ZH-CN)', 'url': 'https://www.accuweather.com/zh/jp/tokyo/226396/weather-forecast/226396'}, {'title': '天气预报-中国天气网', 'url': 'http://www.weather.com.cn/forecast/'}, {'title': '天气预报_全国,世界主要城市天气预报_新浪天气_新浪网', 'url': 'http://weather.sina.com.cn/'}, {'title': '天气预报,天气预报查询一周,今天,明天,7天,10天,15天_2345天气预报', 'url': 'http://tianqi.2345.com/'}, {'title': '天气- 维基百科，自由的百科全书', 'url': 'https://zh.wikipedia.org/wiki/%E5%A4%A9%E6%B0%94'}, {'title': '天气预报_中国气象局', 'url': 'http://www.cma.gov.cn/2011qxfw/2011qtqyb/'}, {'title': '腾讯天气', 'url': 'https://tianqi.qq.com/'}, {'title': '九天天气预报', 'url': 'http://gb.weather.gov.hk/wxinfo/currwx/fndc.htm'}, {'title': '天气实况&gt;&gt; 天气分析&gt;&gt; 中国&gt;&gt; 地面&gt;&gt; 基本天气分析 - 中央气象台', 'url': 'http://www.nmc.cn/publish/observations/china/dm/weatherchart-h000.htm'}, {'title': '全国主要城市、县当天和未来10天天气预报趋势在线查询、天气预报 ...', 'url': 'http://qq.ip138.com/weather/'}]
    return digest(res.text)

if __name__ == "__main__":
    search("こたつ")
