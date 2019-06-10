import pandas as pd
import numpy as np

def get_analysis(file_path,series_no):
    # series = pd.read_excel(file_path,na_values=['NaN'],usecols=[0,1,2,19,20,21],skiprows=[0,1,2,3,4,5,6])
    co_max_marks = pd.read_excel(file_path,skiprows=[x for x in range(0,6)])

    max_marks=[]
    for co_index in range(19,30,1):
        if(co_max_marks.iloc[0,co_index]==0):
            break
        max_marks.append(co_max_marks.iloc[0,co_index])

    print(max_marks)
    number_cos=len(max_marks)

    series = pd.read_excel(file_path,na_values=['NaN'],usecols=[0,1,2]+[x for x in range(19,19+number_cos,1)],skiprows=[0,1,2,3,4,5,6])
    
    #add column names to the dataframe
    co_names=[]
    for i in range(1,number_cos+1,1):
        co_names.append('co'+str(i))

    print(co_names)
    column_labels=['roll_no','university_roll_no','name']+co_names
    series.columns=column_labels

    #add new column total_marks
    series['total_marks']=0
    for index in range(1,number_cos+1,1):
        series['total_marks']+=series['co'+str(index)]
    # series['total_marks']=series['co1']+series['co2']+series['co3']

    print(series)
    #sort the dataframe based on total_marks in descending order
    series = series.sort_values('total_marks',ascending=False)

    #drop rows having missing values
    series.dropna(subset=['roll_no','name'], inplace=True)

    #recreate and intialie the index to new ones
    series.index=[x for x in range(1,len(series.index)+1)]

    print(series)

    top_five = series.head()
    last_five= series.tail()
    
    data=(top_five,last_five)

    print(max_marks)
    marks=[]
    for co_index in range(3,3+number_cos):
        co_list=[]
        if(max_marks[co_index-3]%10==0):
            co_list=[0 for x in range(0,int(max_marks[co_index-3]/10))]
        elif(max_marks[co_index-3]%10!=0):
            co_list=[0 for x in range(0,int(max_marks[co_index-3]/10+1))]
        print(co_list)
        for mark in series.iloc[:,co_index]:
            if(mark%10==0):
                co_list[int(mark/10)-1]=co_list[int(mark/10)-1]+1
            else:
                co_list[int(mark/10)]=co_list[int(mark/10)]+1
        marks.append(co_list)
    
    data=data + tuple(marks)

    max_total_marks=0
    for mark in max_marks:
        max_total_marks+=mark

    total_mark=[0 for x in range(0,int(max_total_marks/10))]
    for mark in series.loc[:,'total_marks']:
        if(mark%10==0):
            total_mark[int(mark/10)-1]=total_mark[int(mark/10)-1]+1
        else:
            total_mark[int(mark/10)]=total_mark[int(mark/10)]+1

    total_marks=[]
    total_marks.append(total_mark)

    data = data + tuple(total_marks)
    return data

analysed_result = get_analysis('DS_2017-18.xlsm',1)

print(analysed_result)
