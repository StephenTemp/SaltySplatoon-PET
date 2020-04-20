import time
from flask import Flask, jsonify, request
from bson.objectid import ObjectId
from flask_jwt_extended import (
    JWTManager, jwt_required, jwt_optional, create_access_token,
    get_jwt_identity
)

import review_page
import request_write_page

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
        return jsonify(user=current_user), 200
    else:
        return jsonify(user='anonymous user'), 200


def validate_username_and_password(username, password):
    # if username != 'test@test.com' or password != 'pass':
    #     return False
    # else:
    #     return username
    return username

@app.route('/get-reviews', methods=['POST'])
def get_reviews():
    return review_page.get_reviews(get_jwt_identity())

@app.route('/get-possible-reviewers', methods=['POST'])
@jwt_optional
def get_possible_reviews():
    return request_write_page.get_possible_reviewers(get_jwt_identity())

@app.route('/send-review-requests', methods=['POST'])
@jwt_optional
def send_review_requests():
    return request_write_page.send_review_requests(get_jwt_identity(), request.get_json())

@app.route('/get_requested_reviews', methods=['POST'])
@jwt_optional
def get_requested_reviews():
    return request_write_page.get_requested_reviews(get_jwt_identity())

@app.route('/reject_review', methods=['POST'])
@jwt_optional
def reject_review(): #TODO
    print("hello")
    return request_write_page.reject_review({"_id": ObjectId(request.get_json()["_id"])})

@app.route('/time')
def get_current_time():
    print("time started")
    return {'time': time.time()}

if __name__ == '__main__':
    app.run()
