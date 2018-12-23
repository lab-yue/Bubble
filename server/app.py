from sanic import Sanic
from sanic.response import json,html
from lib import google
from sanic_cors import CORS
import config

app = Sanic()
app = CORS(app, resources={rf"/api/{config.api_ver}*": {"origins": "*"}})

@app.route("/", methods=['GET'])
async def test(request):
    return f'<h1> VER: {config.app_ver}</h1>'

@app.route(f"/api/{config.api_ver}/search", methods=['GET'])
async def query_string(request):
    print(request.args)
    q = request.args.get('q',{'error':'No q'})
    return json(google.search(q[0]))
