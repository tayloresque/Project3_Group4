import os
import requests
import pandas as pd
import json
import time
from pymongo import MongoClient

## Import the Priceline API key
from api_keys import priceline_api_key

# List of cities
city_list = [
    'San Jose, CA',
    'Santa Cruz, CA',
    'Newport Beach, CA',
    'Napa, CA',
    'Santa Monica, CA',
    'Long Beach, CA',
    'Fresno, CA',
    'Monterey, CA',
    'Santa Barbara, CA',
    'Palm Springs, CA',
    'Sacramento, CA',
    'Anaheim, CA',
    'San Diego, CA',
    'Los Angeles, CA',
    'San Francisco, CA',
    'San Luis Obispo, CA',
    'Carmel-by-the-Sea, CA',
    'Laguna Beach, CA',
    'Morro Bay, CA',
    'San Clemente, CA',
    'Catalina Island, CA',
    'Pismo Beach, CA',
    'Big Bear Lake, CA',
    'Pasadena, CA',
    'Carlsbad, CA',
    'Yosemite, CA',
    'Huntington Beach, CA',
    'Lake Tahoe, CA',
    'Eureka, CA',
    'Bakersfield, CA',
    'Oceanside, CA'
    
]

# Initialize an empty list to store DataFrames
dfs = []

# Loop through each city in the list
for city in city_list:
    url = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations"
    
    querystring = {"name": city, "search_type": "HOTEL"}

    headers = {
        "X-RapidAPI-Key": priceline_api_key,
        "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com"
    }
    
    while True:
        response = requests.get(url, headers=headers, params=querystring)

        if response.status_code == 200:
            # Get the JSON data
            json_data = response.json()

            # Check if response type is "HOTEL"
            if json_data[0].get('type') == 'HOTEL':
                
                # Load the JSON response data into a list
                list_data = json.loads(response.text)
        
                # Create a DataFrame for the current city and append it to the list
                hotel_data = pd.DataFrame(list_data)
                dfs.append(hotel_data)
                
                break  # Exit the while loop if data is successfully retrieved
            else:
                time.sleep(1)
        else:
            break  # Exit the while loop on error

# Concatenate all DataFrames into a single DataFrame
final_df = pd.concat(dfs, ignore_index=True)

final_df['name'] = final_df['displayLine1']
final_df['city'] = final_df['displayLine2'].str.split(',').str[0]
final_df['state'] = final_df['displayLine2'].str.split(',').str[1]

column_to_select = ['name',
                    'id',
                    'city',
                    'state',
                    'lat',
                    'lon',
                    'score', 
                    'rank', 
                    'rank2', 
                    'globalScore',
                    'country' 
                    ]

# Drop rows where a certain value is present in a specific column
values_to_keep = 'US'  # Replace with the value you want to keep
column_to_check = 'country'   # Replace with the column name

filtered_df_country = final_df[final_df[column_to_check] == values_to_keep]

# Drop rows where a certain value is present in a specific column
values_to_keep = 'HOTEL'  # Replace with the value you want to keep
column_to_check = 'type'   # Replace with the column name

filtered_df_type = filtered_df_country[filtered_df_country[column_to_check] == values_to_keep]

hotel_data_select = filtered_df_type[column_to_select]

hotel_data_select = hotel_data_select.drop_duplicates(subset=['id'], keep='first')

test = hotel_data_select.copy()

test["price"] = ""
test["guestrating"] = ""

for index, row in test.iterrows():
    
    url = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/booking-details"
    
    date_checkin = "2023-10-18"
    date_checkout = "2023-10-19"
    hotel_id = row["id"]
    rooms_number = "1"

    querystring = {"date_checkin": date_checkin,"hotel_id": hotel_id,"date_checkout": date_checkout,"rooms_number": rooms_number}

    headers = {
	    "X-RapidAPI-Key": priceline_api_key,
	    "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    
    response = response.json()

    try:
        test.loc[index, "price"] = response["rooms"][0]["displayableRates"][0]["displayPrice"]
        test.loc[index, "guestrating"] = response["overallGuestRating"]
    except (KeyError, IndexError):
        test.loc[index, "price"] = "No price found"
        test.loc[index, "guestrating"] = "No rating found"
        
    try:
        test.loc[index, "guestrating"] = response["overallGuestRating"]
    except (KeyError, IndexError):
        test.loc[index, "guestrating"] = "No rating found"
        
    time.sleep(1)
        


# Drop rows where a certain value is present in a specific column
values_to_drop = 'No price found'  # Replace with the value you want to drop
column_to_check = 'price'   # Replace with the column name

filtered_test = test[test[column_to_check] != values_to_drop]

# Drop rows where a certain value is present in a specific column
values_to_drop = 'No rating found'  # Replace with the value you want to drop
column_to_check = 'guestrating'   # Replace with the column name

filtered_test = filtered_test[filtered_test[column_to_check] != values_to_drop]
    

# Save DataFrame to CSV
if not os.path.exists("data"):
    os.mkdir("data")

csv_filename = os.path.join("data", 'hotel_data.csv')
filtered_test.to_csv(csv_filename, index=False)

# Save DataFrame to NoSQL (MongoDB)
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['hotel_db']
collection = db['hotels']
collection.insert_many(filtered_test.to_dict('records'))
mongo_client.close()
