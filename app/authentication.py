import jwt
from flask import request, jsonify
from datetime import datetime, timedelta


def encodeAuthToken(user_id, groups=[]):
    try:
        admin = True if 'admin' in groups else False

        payload = {
            'exp': datetime.utcnow() + timedelta(days=0, seconds=6000),
            'iat': datetime.utcnow(),
            'sub': user_id,
            'admin': admin
        }
        token = jwt.encode(payload, 'super-secret-key', algorithm='HS256')
        return token
    except Exception as e:
        return e


def loginAndGenerateToken():
    valid_user_1 = {'username': "user", 'password': '123'}
    valid_user_2 = {'username': 'admin', 'password': '1234'}

    req_json = request.get_json()
    username = req_json['username']
    password = req_json['password']
    token = ""

    try:
        if username == valid_user_1['username'] and password == valid_user_1['password']:
            token = encodeAuthToken(1)

        if username == valid_user_2['username'] and password == valid_user_2['password']:
            token = encodeAuthToken(2, ['admin'])

        return jsonify({
            'status': 'success',
            'id_token': token.decode("utf-8")
        })
    except Exception as e:
        return jsonify({
            'status': 'Failure',
            'error': "Error"
        }), 401
