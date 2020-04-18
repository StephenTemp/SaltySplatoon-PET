from pymongo import MongoClient
from flask import jsonify

client = MongoClient('mongodb://localhost:27017/')

def get_reviews(username):
    return None