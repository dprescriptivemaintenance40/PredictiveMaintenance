
import pandas as pd
import pyodbc as odbc

conn = odbc.connect('Driver=SQL SERVER;Server=DESKTOP-CGG65T8;Database=DPMBGProcess;Trusted_Connection = yes')

cursor = conn.cursor()

MissVal = pd.read_sql('SELECT * FROM Compressor_Cleaning',conn, parse_dates=['Date'])
MissVal.drop_duplicates(subset=['Date'],inplace=True)
  # Step 3 :- Generatte dates from min and max values
date_range = pd.DataFrame({'Date': pd.date_range(min(MissVal['Date']),max(MissVal['Date']), freq='D')})
  # Step 4 :- Make left join with Missing values.
c = pd.merge(pd.DataFrame(date_range), pd.DataFrame(MissVal), left_on=['Date'], 
              right_on= ['Date'], how='left')

for col in c.columns:
    if not col=="Date":
      if not col=="Id":
        if not col=="BatchId":
          #c[col+"new"] = c[col]
          c[col].interpolate(method ='linear',inplace=True)
          c.to_csv("DbFilledData.csv")
          a=[[c.TD1],[c.TS1],[c.TD2],[c.TS2],[c.PD1],[c.PD2],[c.DT1],[c.DT2],[c.PR1],[c.PR2]]
          #print(a)
          batch=0
          insert='''INSERT INTO Processed(TD1,TS1,TD2,TS2,PD1,PD2,DT1,DT2,PR1,PR2) VALUES(?,?,?,?,?,?,?,?,?,?) '''
          cursor.execute(insert,c.TD1,c.TS1,c.TD2,c.TS2,c.PD1,c.PD2,c.DT1,c.DT2,c.PR1,c.PR2)
conn.commit()
          #c.to_sql("Compressor_Cleaning",conn)
# Step 5:- Create a new column which will be interpolated
# for col in c.columns:
#     if not col=="Date":
#       if not col=="Id":
#         if not col=="BatchId":
#           #c[col+"new"] = c[col]
#           c[col].interpolate(method ='linear',inplace=True)
#           SQLCommand = ("INSERT INTO Compressor_Processed (BatchId,Date,TD1,TS1,TD2,TS2,PD1,PD2,DT1,DT2,PR1,PR2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)")    
#           Values = [0, c.Date, c.TD1, c.TS1, c.TD2, c.TD2, c.PD1, c.PD2, c.DT1, c.DT2, c.PR1, c.PR2]   
#           #Processing Query    
#           cursor.execute(SQLCommand,Values)  
          #cursor.execute('INSERT INTO Compressor_Processed (BatchId,TD1,TS1,TD2,TS2,PD1,PD2,DT1,DT2,PR1,PR2) values(?,?,?,?,?,?,?,?,?,?,?)', c.BatchId, c.TD1, c.TS1, c.TD2, c.TD2, c.PD1, c.PD2, c.DT1, c.DT2, c.PR1, c.PR2)
          #c.to_csv("DbFilledData.csv")