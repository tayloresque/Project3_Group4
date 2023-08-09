from flask import Flask, jsonify
from pymongo import MongoClient
import json

app = Flask(__name__)

# Define your MongoDB connection
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['hotel_db']
collection = db['hotels']

# Load data from JSON file and insert into MongoDB
def load_data_to_mongodb():
    with open('data/hotel_final.json', 'r') as json_file:
        data = json.load(json_file)
        for document in data:
            collection.insert_one(document)

@app.route('/get_hotel_data')
def get_hotel_data():
    # Retrieve data from MongoDB
    data = list(collection.find({}, {'_id': 0}))
    return jsonify(data)

if __name__ == '__main__':
    # Load data into MongoDB only if the collection is empty
    if collection.count_documents({}) == 0:
        load_data_to_mongodb()

    app.run(debug=True)



