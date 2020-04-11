import time
from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager, jwt_required, jwt_optional, create_access_token,
    get_jwt_identity
)

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'super-secret-splatoon'  # Change this!
jwt = JWTManager(app)

# Provide a method to create access tokens. The create_access_token()
# function is used to actually generate the token, and you can return
# it to the caller however you choose.
@app.route('/login', methods=['POST', 'GET'])
def login():
    
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    possible_valid_credentials = validate_username_and_password(username, password)
    
    if possible_valid_credentials:
        # Identity can be any data that is json serializable
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200

    else:
        return jsonify({"msg": "Bad username or password"}), 401
    

@app.route('/get-username', methods=['POST'])
@jwt_optional
def partially_protected():
    # If no JWT is sent in with the request, get_jwt_identity()
    # will return None
    current_user = get_jwt_identity()
    if current_user:
        return jsonify(user="Test User"), 200
    else:
        return jsonify(user='anonymous user'), 200


def validate_username_and_password(username, password):
    if username != 'test@test.com' or password != 'pass':
        return False
    else:
        return username


@app.route('/time')
def get_current_time():
    print("time started")
    return {'time': time.time()}

if __name__ == '__main__':
    app.run()
