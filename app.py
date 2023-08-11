from flask import Flask, render_template, send_file
import json
import pymongo

app = Flask(__name__)

# Connect to the MongoDB server
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Choose a database and collection
db = client.hotel_db  
collection = db.hotel

# Load data from JSON file and insert into MongoDB
def load_data_to_mongodb():
    with open('static/json/hotel_final.json', 'r') as json_file:
        data = json.load(json_file)
        collection.insert_many(data)

# Check if the collection is empty and load data if needed
if collection.count_documents({}) == 0:
    load_data_to_mongodb()


@app.route("/")
def home():
    return render_template('README.html')  # Render the README page

@app.route("/table")
def table():
    return render_template('hotel_table.html')  # Render the hotel table page

@app.route("/chart")
def chart():
    return render_template('bubble_chart.html')  # Render the bubble chart page

@app.route("/getjson")
def jsons():
    return send_file("static/json/hotel_final.json", mimetype="application/json")

if __name__ == '__main__':
    app.run(debug=True)