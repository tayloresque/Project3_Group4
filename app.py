from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Define your MongoDB connection
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['hotel_db']
collection = db['hotels']

@app.route('/get_hotel_data')
def get_hotel_data():
    # Retrieve data from MongoDB
    data = list(collection.find({}, {'_id': 0}))
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)