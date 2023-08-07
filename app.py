# Import dependencies
from flask import Flask, jsonify
import pymongo
# Import main file (.py) here

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

#################################################
# Flask Routes
#################################################
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