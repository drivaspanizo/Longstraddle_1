import json
import datetime
from datetime import date, timedelta
import pandas as pd

# Top 20 S&P 500 companies based on market cap (2025)
top_20_companies = [
    {"symbol": "MSFT", "name": "Microsoft Corporation", "market_cap": 3496.12},
    {"symbol": "NVDA", "name": "NVIDIA Corporation", "market_cap": 3457.97},
    {"symbol": "AAPL", "name": "Apple Inc.", "market_cap": 3045.71},
    {"symbol": "AMZN", "name": "Amazon.com, Inc.", "market_cap": 2267.33},
    {"symbol": "GOOG", "name": "Alphabet Inc.", "market_cap": 2114.33},
    {"symbol": "META", "name": "Meta Platforms, Inc.", "market_cap": 1754.27},
    {"symbol": "AVGO", "name": "Broadcom Inc.", "market_cap": 1161.05},
    {"symbol": "BRK.B", "name": "Berkshire Hathaway Inc.", "market_cap": 1064.76},
    {"symbol": "TSLA", "name": "Tesla, Inc.", "market_cap": 950.63},
    {"symbol": "WMT", "name": "Walmart Inc.", "market_cap": 777.85},
    {"symbol": "JPM", "name": "JPMorgan Chase & Co.", "market_cap": 738.49},
    {"symbol": "V", "name": "Visa Inc.", "market_cap": 693.11},
    {"symbol": "LLY", "name": "Eli Lilly and Company", "market_cap": 691.15},
    {"symbol": "MA", "name": "Mastercard Incorporated", "market_cap": 535.86},
    {"symbol": "NFLX", "name": "Netflix, Inc.", "market_cap": 528.34},
    {"symbol": "ORCL", "name": "Oracle Corporation", "market_cap": 487.99},
    {"symbol": "COST", "name": "Costco Wholesale Corporation", "market_cap": 449.75},
    {"symbol": "XOM", "name": "Exxon Mobil Corporation", "market_cap": 449.30},
    {"symbol": "PG", "name": "The Procter & Gamble Company", "market_cap": 384.55},
    {"symbol": "JNJ", "name": "Johnson & Johnson", "market_cap": 373.01}
]

# Create sample earnings dates for demonstration
# Note: These are synthetic dates for demonstration purposes only
current_date = datetime.date(2025, 6, 8)

# Generate earnings dates spread across quarters
earnings_dates = []
base_dates = [
    # Q2 2025 earnings
    datetime.date(2025, 7, 15), datetime.date(2025, 7, 18), datetime.date(2025, 7, 22), datetime.date(2025, 7, 25),
    datetime.date(2025, 7, 29), datetime.date(2025, 8, 1), datetime.date(2025, 8, 5), datetime.date(2025, 8, 8),
    # Q3 2025 earnings  
    datetime.date(2025, 10, 14), datetime.date(2025, 10, 17), datetime.date(2025, 10, 21), datetime.date(2025, 10, 24),
    datetime.date(2025, 10, 28), datetime.date(2025, 10, 31), datetime.date(2025, 11, 4), datetime.date(2025, 11, 7),
    # Q4 2025 earnings
    datetime.date(2026, 1, 20), datetime.date(2026, 1, 23), datetime.date(2026, 1, 27), datetime.date(2026, 1, 30)
]

for i, company in enumerate(top_20_companies):
    earnings_date = base_dates[i % len(base_dates)]
    earnings_dates.append({
        "symbol": company["symbol"],
        "company": company["name"],
        "earnings_date": earnings_date.strftime("%Y-%m-%d"),
        "market_cap": company["market_cap"]
    })

# Sort by earnings date
earnings_dates.sort(key=lambda x: x["earnings_date"])

# Create DataFrame and display
df = pd.DataFrame(earnings_dates)
print("Top 20 S&P 500 Companies Earnings Calendar:")
print(df.head(10))

# Save data as JSON for the web application
earnings_data = {
    "companies": top_20_companies,
    "earnings_calendar": earnings_dates,
    "last_updated": current_date.strftime("%Y-%m-%d")
}

# Save to JSON file
with open("sp500_earnings_data.json", "w") as f:
    json.dump(earnings_data, f, indent=2)

print("\nData saved to sp500_earnings_data.json")
print(f"Total companies: {len(top_20_companies)}")
print(f"Earnings dates generated: {len(earnings_dates)}")