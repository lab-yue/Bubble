from sanic import Sanic
from sanic.response import json,html
from lib import google
from sanic_cors import CORS
import config

app = Sanic()

CORS(app, resources={rf"/get*": {"origins": "*"}})

@app.route("/", methods=['GET'])
async def test(request):
    return f'<h1> VER: {config.app_ver}</h1>'

@app.route(f"/get", methods=['GET'])
async def query_string(request):
    print(request.args)
    q = request.args.get('q',{'error':'No q'})
    offset = request.args.get('offset','null')

    if offset != 'null':
        try:
            offset = int(offset)
        except TypeError:
            return json({"error": "offset invalide"})
    else:
        offset = 0
    return json(google.search(q,offset))
