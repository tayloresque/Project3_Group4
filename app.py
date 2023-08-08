# Import dependencies
from flask import Flask, jsonify
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
@app.route("/get_hotel_data")
def get_hotel_data():
    # Retrieve data from MongoDB
    data = list(collection.find({}, {"_id": 0}))
    return jsonify(data)

@app.route("/")
def mainpage():
    return

@app.route("/table1")
def table1():
    return

@app.route("/barchart")
def barchart():
    return

@app.route("/bubblechart")
def bubblechart():
    return

if __name__ == "__main__":
    app.run(debug=True)