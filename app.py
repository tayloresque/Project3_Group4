from flask import Flask, jsonify, render_template, redirect, send_file
import json
import pymongo

app = Flask(__name__)

# Connect to the MongoDB server
# conn = 'mongodb://localhost:27017'
# client = pymongo.MongoClient(conn)

# Choose a database and collection
# db = client.mydatabase  # Replace 'mydatabase' with your preferred database name
# collection = db.mycollection  # Replace 'mycollection' with your preferred collection name

# Load data from JSON file and insert into MongoDB
# def load_data_to_mongodb():
#     with open('data/hotel_final.json', 'r') as json_file:
#         data = json.load(json_file)
#         collection.insert_many(data)

# # Retrieve data from MongoDB
# def get_hotel_data():
#     data = list(collection.find({}, {'_id': 0}))
#     return data

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/table")
def table():
    return render_template('hotel_table.html')

# def route_get_hotel_data():
#     data = get_hotel_data()
#     return jsonify(data)

@app.route("/getjson")
def jsons():
    return send_file("static/json/hotel_final.json",mimetype="application/json")

if __name__ == '__main__':
    # Load data into MongoDB only if the collection is empty
    # if collection.count_documents({}) == 0:
    #     load_data_to_mongodb()

    app.run(debug=True)

    
