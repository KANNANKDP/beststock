from urllib.request import urlopen
import json
from datetime import datetime
from datetime import timedelta
import time
import pickle
from sklearn.externals import joblib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import lightgbm as lgb
from scipy import stats
from scipy.sparse import hstack, csr_matrix
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn import model_selection
from sklearn.metrics import accuracy_score

def get_stock_predictions(preferences):
    preference=preferences.split(',')
    api_key='ZSNK54Y2DD2LW3RG'

    domains={
        'Pharmaceutical':{
            'JNJ':'Johnson & Johnson',
            'PFE':'Pfizer',
            'RHHBY':'Roche Holdings',
            'NVS':'Novartis',
            'ABBV':'AbbVie',
            'MRK':'Merck',
            'ABT':'Abbott Laboratories',
            'BAYRY':'Bayer',
            'GSK':'GlaxoSmithKline',
            'SNY':'Sanofi'
        },
        'Automobile':{
            'FSS':'Federal Signal Corporation',
            'F':'Ford Motor Company',
            'GM':'General Motors Company',
            'HMC':'Honda Motor Company, Ltd.',
            'NAV':'Navistar International Corporation',
            'OSK':'Oshkosh Corporation',
            'REVG':'REV Group, Inc.',
            'TTM':'Tata Motors Ltd',
            'TM':'Toyota Motor Corp Ltd',
            'WBC':'Wabco Holdings Inc.'
        },
        'Information Technology':{
            'AMZN':'Amazon.com',
            'BIDU':'Baidu',
            'AAPL':'Apple',
            'NXPI':'NXP Semiconductors',
            'BABA':'Alibaba Group Holding',
            'STNE':'StoneCo',
            'FB':'Facebook',
            'ADBE':'Adobe',
            'TWTR':'Twitter',
            'IQ':'iQiyi'
        },
        'Banking':{
            'ALLY':'Ally Financial Inc.',
            'ASB':'Associated Banc-Corp',
        	'AX':'Axos Financial, Inc.',
        	'BANC':'Banc of California, Inc.',
            'BXS':'BancorpSouth Bank',
        	'BAC':'Bank of America Corporation',
        	'BOH':'Bank of Hawaii Corporation',
        	'BK':'Bank Of New York Mellon Corporation',
        	'BKU':'BankUnited, Inc.',
        	'BBT':'BB&T Corporation'
        },
        'Consumer Electronics':{
            'EMR':'Emerson Electric Company',
            'GE':'General Electric Company',
            'NC':'NACCO Industries, Inc.',
    		'AOS':'Smith (A.O.) Corporation',
            'SNE':'Sony Corp',
            'WHR':'Whirlpool Corporation',
            'BBY':'Best Buy Co., Inc.'
        }
    }

    result={}
    
    now = datetime.now() - timedelta(days=1)
    print("now =", now)
    dt_string = now.strftime("%Y-%m-%d")
    print("date and time =", dt_string)

    for domain in preference:
        result[domain]={}
        for company in domains[str(domain)]:
            print(company)
            time.sleep(3)
            fetch_url = urlopen("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+str(company)+"&outputsize=full&apikey="+str(api_key))
            company_details = json.loads(fetch_url.read())

            #machine learning model prediction starts here
            model = joblib.load('stock_market_movement.pkl')
            result[domain][str(domains[domain][company])+' ('+str(company)+')']={}
            result[domain][str(domains[domain][company])+' ('+str(company)+')']['open']=company_details['Time Series (Daily)'][dt_string]['1. open']
            result[domain][str(domains[domain][company])+' ('+str(company)+')']['high']=company_details['Time Series (Daily)'][dt_string]['2. high']
            result[domain][str(domains[domain][company])+' ('+str(company)+')']['low']=company_details['Time Series (Daily)'][dt_string]['3. low']
            result[domain][str(domains[domain][company])+' ('+str(company)+')']['close']=company_details['Time Series (Daily)'][dt_string]['4. close']
            result[domain][str(domains[domain][company])+' ('+str(company)+')']['volume']=company_details['Time Series (Daily)'][dt_string]['5. volume']
            confidence_value=model.predict([[result[domain][str(domains[domain][company])+' ('+str(company)+')']['open'],result[domain][str(domains[domain][company])+' ('+str(company)+')']['close'],result[domain][str(domains[domain][company])+' ('+str(company)+')']['volume']]])
            result[domain][str(domains[domain][company])+' ('+str(company)+')']['confidence_value']=round((confidence_value[0]*100),2)

    return result

print(get_stock_predictions('Consumer Electronics'))
