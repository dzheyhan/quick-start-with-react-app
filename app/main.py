import jwt
from flask import Flask, request, jsonify
import random
from flask_cors import CORS
from authentication import loginAndGenerateToken

app = Flask(__name__)
CORS(app)


@app.route('/hallo')
def hello():
    name = request.args.get("name", "World")
    return jsonify({
        "number": random.randint(6, 49),
        "name": name
    })


@app.route('/user', methods=['GET'])
def user():
    token = request.headers.get('Authorization')
    print("token", token)
    if token:
        decoded = decodeAuthToken(token)
        if not isinstance(decoded, str):
            return jsonify({
                'email': 'dzheyhan.ahmedov@gmail.com',
                'firstName': 'Dzheyhan',
                'lastName': 'Ahmedov',
            })

    return jsonify('Authorization Error'), 401


# **************** AUTH SERVER *****************
@app.route('/auth/login', methods=['POST'])
def login():
    return loginAndGenerateToken()


# **********************************************
def decodeAuthToken(token):
    try:
        payload = jwt.decode(token, 'super-secret-key', algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Login please'
    except jwt.InvalidTokenError:
        return 'Nice try, invalid token. Login please'



@app.route('/test_get_with_validation')
def testGetWithValidation():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        token = auth_header.split(" ")[1]
    else:
        token = ''

    if token:
        decoded = decodeAuthToken(token)
        if not isinstance(decoded, str):
            if decoded['admin']:
                return jsonify('You Are a Real Admin!!')
            else:
                return jsonify('You Are not an Admin, but at least your token is valid!')
        else:
            return jsonify('Ooops, validation messed up: ' + decoded), 401

    return jsonify('hello')


if __name__ == "__main__":
    app.run(debug=True)
