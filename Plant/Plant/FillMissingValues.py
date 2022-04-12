from pandas import read_csv
import pandas as pd
import numpy as np

# Step 1 :- Read CSV
MissVal = read_csv('CompressorData.csv', parse_dates=['Date'], dayfirst=True)
# Step 2 :- Drop duplicates
MissVal.drop_duplicates(subset=['Date'],inplace=True)
# Step 3 :- Generatte dates from min and max values
date_range = pd.DataFrame({'Date': pd.date_range(min(MissVal['Date']),max(MissVal['Date']), freq='D')})
# Step 4 :- Make left join with Missing values.
c = pd.merge(pd.DataFrame(date_range), pd.DataFrame(MissVal), left_on=['Date'], 
              right_on= ['Date'], how='left')
# Step 5:- Create a new column which will be interpolated
c["TD1New"] = c["TD1"]
# Step 6 :- Apply interpolation.
c["TD1New"].interpolate(method ='linear',inplace=True)
c.to_csv("CompressorFilledValues.csv")