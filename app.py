from flask import Flask, jsonify, render_template, redirect
import json
import pymongo

app = Flask(__name__)

# Connect to the MongoDB server
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Choose a database and collection
db = client.mydatabase  # Replace 'mydatabase' with your preferred database name
collection = db.mycollection  # Replace 'mycollection' with your preferred collection name

# Load data from JSON file and insert into MongoDB
def load_data_to_mongodb():
    with open('data/hotel_final.json', 'r') as json_file:
        data = json.load(json_file)
        collection.insert_many(data)

# Retrieve data from MongoDB
def get_hotel_data():
    data = list(collection.find({}, {'_id': 0}))
    return data

@app.route('/get_hotel_data')
def route_get_hotel_data():
    data = get_hotel_data()
    return jsonify(data)

if __name__ == '__main__':
    # Load data into MongoDB only if the collection is empty
    if collection.count_documents({}) == 0:
        load_data_to_mongodb()

    app.run(debug=True)

    @app.route("/")
    def home():
        collection_list = db.collection.find_one()
        return render_template('index.html', collections=collection_list)

    @app.route("/tableee")
    def table():
        return render_template('hotel_table.html')
