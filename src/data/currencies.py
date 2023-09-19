import requests
import json

url = "https://api.apilayer.com/exchangerates_data/latest?symbols=ETB&base=USD"  # Remove the "symbols" parameter

payload = {}
headers = {
    "apikey": "mTCITByknx60Lm0zpzNALooB0HI4AP76"
}

response = requests.request("GET", url, headers=headers, data=payload)

status_code = response.status_code
result = response.json()  # Parse the response as JSON

if status_code == 200:
    base_currency = "USD"
    currencies = result.get("rates", {})  # Get the rates dictionary

    # Create a dictionary to store the exchange rates
    exchange_rates = {"base": base_currency, "rates": currencies}

    # Save the data to a JSON file
    with open("exchange_rates.json", "w") as json_file:
        json.dump(exchange_rates, json_file, indent=4)

    print("Exchange rates saved to exchange_rates.json")
else:
    print(f"Request failed with status code: {status_code}")
