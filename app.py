# from flask import Flask, jsonify
# from pymongo import MongoClient
# import json

# app = Flask(__name__)

# # Define your MongoDB connection
# mongo_client = MongoClient('localhost', 27017)
# db = mongo_client['hotel_db']
# collection = db['hotels']

# # Load data from JSON file and insert into MongoDB
# def load_data_to_mongodb():
#     with open('data/hotel_final.json', 'r') as json_file:
#         data = json.load(json_file)
#         for document in data:
#             collection.insert_one(document)

# @app.route('/get_hotel_data')
# def get_hotel_data():
#     # Retrieve data from MongoDB
#     data = list(collection.find({}, {'_id': 0}))
#     return jsonify(data)

# if __name__ == '__main__':
#     # Load data into MongoDB only if the collection is empty
#     if collection.count_documents({}) == 0:
#         load_data_to_mongodb()

#     app.run(debug=True)




# Import dependencies
from flask import Flask, jsonify, render_template
from pymongo import MongoClient
# Import main file (.py) here

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# Establish MongoDB connection
mongo_client = MongoClient("localhost", 27017)
db = mongo_client["hotel_db"]
collection = db["hotels"]

#################################################
# Flask Routes
#################################################
# Load data from JSON file and insert into MongoDB
def load_data_to_mongodb():
    with open('data/hotel_final.json', 'r') as json_file:
        data = json.load(json_file)
        for document in data:
            collection.insert_one(document)

@app.route("/get_hotel_data")
def get_hotel_data():
    
    # Retrieve data from MongoDB
    data = list(collection.find({}, {"_id": 0}))
    return jsonify(data)

# Route for homepage
@app.route("/")
def mainpage():
    return render_template("index.html")

# Route for table of hotels, prices, etc.
@app.route("/table1")
def table1():
    return render_template("table.html")

# Route for barcharts
@app.route("/barchart")
def barchart():
    return render_template("barchart.html")

# Route for bubblecharts
@app.route("/bubblechart")
def bubblechart():
    return render_template("bubblechart.html")

if __name__ == "__main__":
    app.run(debug=True)
