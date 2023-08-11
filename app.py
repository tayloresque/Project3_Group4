# Import dependencies
from flask import Flask, jsonify, render_template
import pymongo

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# Establish MongoDB connection
conn = "mongodf://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.hotel_db
collection = db.hotel

# Load data from JSON file and insert into MongoDB
# fix file structure path?
def load_data_to_mongodb():
    with open('static/json/hotel_final.json', 'r') as json_file:
        data = json.load(json_file)
        collection.insert_many(document)

#################################################
# Flask Routes
#################################################
@app.route("/get_hotel_data")
def get_hotel_data():
    
    # Retrieve data from MongoDB
    data = list(collection.find({}, {"_id": 0}))
    return jsonify(data)

# Route for table of hotels, prices, etc.
@app.route("/table1")
def table1():
    return render_template("hotel_table.html")

# Route for barcharts
@app.route("/barchart")
def barchart():
    return render_template("barchart.html")

# Route for bubblecharts
@app.route("/bubblechart")
def bubblechart():
    return render_template("bubble_chart.html")

if __name__ == "__main__":
    app.run(debug=True)
