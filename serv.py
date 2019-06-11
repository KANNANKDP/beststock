
from flask import Flask, request,abort,render_template,redirect,url_for
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from werkzeug import secure_filename
import os

import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn import tree
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
#import matplotlib.pyplot as plt
import pickle
from sklearn.externals import joblib

app = Flask(__name__)
UPLOAD_FOLDER = 'upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
api = Api(app)

CORS(app)


def get_analysis(file_path,series_no):

    series=''
    if(series_no==1):
        series='ST-I'
    elif(series_no==2):
        series='ST-II'

    #code to extract course name and course code
    sub_name_data_set=pd.read_excel(file_path,series,skiprows=[0])
    sub_name=sub_name_data_set.iloc[0,2]
    # print(sub_name)
    #code to extract the course outcomes and find out the maximum marks of each co
    co_max_marks = pd.read_excel(file_path,series,skiprows=[x for x in range(0,6)])
    max_marks=[]
    co_indexs=[]
    co_names=[]
    for co_index in range(19,29,1):
        if(co_max_marks.iloc[0,co_index]==0):
            continue
        max_marks.append(co_max_marks.iloc[0,co_index])
        co_indexs.append(co_index)
        co_names.append('co'+str(co_index%19+1))
    # print(max_marks)
    number_cos=len(max_marks)

    # print(number_cos)
    #code to extract data from the excel file
    series = pd.read_excel(file_path,series,na_values=['NaN'],usecols=[0,1,2]+co_indexs,skiprows=[0,1,2,3,4,5,6])

    # print(co_names)
    column_labels=['roll_no','university_roll_no','name']+co_names
    series.columns=column_labels


    #add new column total_marks
    series['total_marks']=0
    for index in range(3,3+number_cos,1):
        series['total_marks']+=series.iloc[:,index]
    # print(series)

    #drop rows having missing values
    series.dropna(subset=['roll_no','university_roll_no','name'], inplace=True)

    #sort the dataframe based on total_marks in descending order
    series = series.sort_values('total_marks',ascending=False)


    #recreate and intialie the index to new ones
    series.index=[x for x in range(1,len(series.index)+1)]
    # print(series)


    #maximium total mark
    max_total_marks=0
    for mark in max_marks:
        max_total_marks+=mark

    #code to calculate total pass and fail
    total_pass=0;total_fail=0
    for total_mark in series.loc[:,'total_marks']:
        if(float(total_mark/max_total_marks)>=0.45):
            total_pass+=1
        else:
            total_fail+=1

    #code to create total_mark distribution
    total_mark=[0 for x in range(0,int(max_total_marks/10))]
    for mark in series.loc[:,'total_marks']:
        if(mark%10==0):
            total_mark[int(mark/10)-1]=total_mark[int(mark/10)-1]+1
        else:
            total_mark[int(mark/10)]=total_mark[int(mark/10)]+1

    top_five = series.head()
    least_five= series.tail()
    least_five.index=[x for x in range(5,0,-1)]

    result={}
    result['series']=series_no
    result['course_name']=sub_name
    result['passed']=total_pass
    result['failed']=total_fail
    result['total_mark_distrib']=total_mark
    result['top_five']=[{
            'uni_no' : top_five.loc[1,'university_roll_no'],
            'name'   : top_five.loc[1,'name'],
            'mark'   : top_five.loc[1,'total_marks']
            },
        {
            'uni_no' : top_five.loc[2,'university_roll_no'],
            'name'   : top_five.loc[2,'name'],
            'mark'   : top_five.loc[2,'total_marks']
            },
        {
            'uni_no' : top_five.loc[3,'university_roll_no'],
            'name'   : top_five.loc[3,'name'],
            'mark'   : top_five.loc[3,'total_marks']
            },
        {
            'uni_no' : top_five.loc[4,'university_roll_no'],
            'name'   : top_five.loc[4,'name'],
            'mark'   : top_five.loc[4,'total_marks']
            },
        {
            'uni_no' : top_five.loc[5,'university_roll_no'],
            'name'   : top_five.loc[5,'name'],
            'mark'   : top_five.loc[5,'total_marks']
            }]

    result['least_five']=[{
            'uni_no' : least_five.loc[1,'university_roll_no'],
            'name'   : least_five.loc[1,'name'],
            'mark'   : least_five.loc[1,'total_marks']
            },
        {
            'uni_no' : least_five.loc[2,'university_roll_no'],
            'name'   : least_five.loc[2,'name'],
            'mark'   : least_five.loc[2,'total_marks']
            },
        {
            'uni_no' : least_five.loc[3,'university_roll_no'],
            'name'   : least_five.loc[3,'name'],
            'mark'   : least_five.loc[3,'total_marks']
            },
        {
            'uni_no' : least_five.loc[4,'university_roll_no'],
            'name'   : least_five.loc[4,'name'],
            'mark'   : least_five.loc[4,'total_marks']
            },
        {
            'uni_no' : least_five.loc[5,'university_roll_no'],
            'name'   : least_five.loc[5,'name'],
            'mark'   : least_five.loc[5,'total_marks']
            }]


    #code to create co distribution
    # marks=[]
    # for co_index in range(3,3+number_cos):
    #     co_list=[]
    #     if(max_marks[co_index-3]%10==0):
    #         co_list=[0 for x in range(0,int(max_marks[co_index-3]/10))]
    #     elif(max_marks[co_index-3]%10!=0):
    #         co_list=[0 for x in range(0,int(max_marks[co_index-3]/10+1))]
    #     print(co_list)
    #     for mark in series.iloc[:,co_index]:
    #         if(mark%10==0):
    #             co_list[int(mark/10)-1]=co_list[int(mark/10)-1]+1
    #         else:
    #             co_list[int(mark/10)]=co_list[int(mark/10)]+1
    #     marks.append(co_list)

    return result


@app.route("/")
def hello():
    return jsonify({'text':'Hello Worldl!'})

class Upload(Resource):
  def post(self,batch,sem,series,course_code):
        UPLOAD_FOLDER='upload/'+batch+'/'+sem+'/'+series
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)
        app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
        f = request.files['file']
        oldname=f.filename
        f.filename=course_code+'.xlsm'
        filename = secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
      	#return jsonify({'msg':'success'})
        if(series=='first'):
            series_num=1
        elif(series=='second'):
            series_num=2
        return get_analysis(UPLOAD_FOLDER+'/'+filename,series_num)


class TestPath(Resource):
    def get(self):
        return jsonify({'text':'Hello World test!'})

class PredictType(Resource):
 def get(self,c1,c2,c3,c4,c5):
    balance_data = pd.read_csv( 'dataset.csv',sep= ',', header= None)
    #print ("Dataset Length:: ", len(balance_data))
    #print ("Dataset Shape:: ", balance_data.shape)

    X = balance_data.values[:, 0:5]
    Y = balance_data.values[:,5]

    #print(balance_data.head(5))
    #print(X)
    #print(Y)
    X_train, X_test, y_train, y_test = train_test_split( X, Y, test_size = 0.3, random_state = 100)

    clf_entropy = DecisionTreeClassifier(criterion = "entropy", random_state = 100,
    max_depth=10, min_samples_leaf=15)

    clf_entropy.fit(X_train, y_train)

    x = clf_entropy.predict([[c1,c2,c3,c4,c5]])
    print(x);
    y_pred_en = clf_entropy.predict(X_test)
    y_pred_en

    #return str(x[0]);
    return jsonify({'text':str(x[0])})

class Analysis(Resource):
    def get(self,unino):
    	#This is the excel file which contains data about Compiler design course
    	series1 = pd.read_excel('CD_2017-18.xlsm',na_values=['NaN'],usecols=[0,1,2,19,20,21],skiprows=[0,1,2,3,4,5,6])
    	co_max_marks = pd.read_excel('CD_2017-18.xlsm',usecols=[19,20,21],skiprows=[x for x in range(0,6)])

    	co_marks=(co_max_marks.iloc[0])
    	max_marks=[]

    	# co_marks=co_max_marks[0]
    	for m_marks in co_marks:
    	    max_marks.append(m_marks)
    	print(max_marks)

    	#add column names to the dataframe
    	series1.columns=['roll_no','university_roll_no','name','co1','co2','co3']

    	#add new column total_marks
    	series1['total_marks']=series1['co1']+series1['co2']+series1['co3']

    	#sort the dataframe based on total_marks in descending order
    	series1 = series1.sort_values('total_marks',ascending=False)

    	#drop rows having missing values
    	series1.dropna(subset=['roll_no','name'], inplace=True)

    	#recreate and intialie the index to new ones
    	series1.index=[x for x in range(1,len(series1.index)+1)]

    	#Analysis about a particular student
    	university_roll_no = unino #get from app
    	series = series1['university_roll_no'] #create a new dataseries
    	df=series1[series==university_roll_no] # create a new dataframe


    	# print(series1.info())
    	# print(series1.describe())
    	# print(series1)

    	analy=""
    	max_mark = series1.loc[series1.index[0],'total_marks']

    	analy=analy+('You secured <strong>' + str(int(df['total_marks'])) + '/40 </strong> and your rank is <b>' + str(df.index[0]) + '</b> in your class.' )+'<br>'

    	analy=analy+('The maximum mark scored in your class is ' + str(max_mark))+'<br>'

    	analy=analy+('The question paper contained the following course outcomes: ' + str([str.upper(series1.columns[co]) for co in range(3,len(series1.columns)-1)]))+'<br>'

    	co1_mark=int(df.loc[df.index[0],'co1'])
    	co2_mark=int(df.loc[df.index[0],'co2'])
    	co3_mark=int(df.loc[df.index[0],'co3'])
    	co1_percentage = int((co1_mark/max_marks[0])*100)
    	co2_percentage = int((co2_mark/max_marks[1])*100)
    	co3_percentage = int((co3_mark/max_marks[2])*100)

    	co_percentage = [co1_percentage, co2_percentage, co3_percentage]
    	# print(co1_percentage,co2_percentage,co3_percentage)

    	for index,co_percent in enumerate(co_percentage):
    	    if(co_percent<=45):
    		          analy=analy+('You scored '+ str(co_percent) + '% from CO' + str(index+1) + ' <i>which is less than the average performance</i>. So, Please refer the following topics : blah blah blah to improve your score')+'<br>'
    	    elif(co_percent>=75):
    		          analy=analy+('You scored '+ str(co_percent) + '% from CO' + str(index+1) + '. Awesome, Keep up the good work and you will reach greater heights. With great knowledge comes great responsibility.')+'<br>'
    	    else:
    		          analy=analy+('You scored '+ str(co_percent) + '% from CO' + str(index+1) + ', you did good to get an overview about the topic but you need to improve a lot.')+'<br>'


    	#print(analy)
    	return jsonify({'analy':analy})


class GetFiles(Resource):
    def get(self,batch,sem,series):
        if not (os.path.isdir('upload/'+batch+'/'+sem+'/'+series)):
            return 'no_files'
        elif(len(os.listdir('upload/'+batch+'/'+sem+'/'+series) ) == 0):
            return 'no_files'
        else:
            return os.listdir('upload/'+batch+'/'+sem+'/'+series)


class Analysis2(Resource):
    def get(self,unino,batch,sem,series,docname):
        #docname = secure_filename(docname)
        docname='upload/'+batch+'/'+sem+'/'+series+'/'+docname
        series1 = pd.read_excel(docname,na_values=['NaN'],usecols=[0,1,2,19,20,21],skiprows=[0,1,2,3,4,5,6])
        sub_name_data_set=pd.read_excel(docname,skiprows=[0])
        sub_name=sub_name_data_set.iloc[0,2]
        co_max_marks = pd.read_excel(docname,usecols=[19,20,21],skiprows=[x for x in range(0,6)])
        co_marks=(co_max_marks.iloc[0])
        max_marks=[]

    	# co_marks=co_max_marks[0]
        for m_marks in co_marks:
    	       max_marks.append(m_marks)
        print(max_marks)

    	#add column names to the dataframe
        series1.columns=['roll_no','university_roll_no','name','co1','co2','co3']

        #add new column total_marks
        series1['total_marks']=series1['co1']+series1['co2']+series1['co3']

        #sort the dataframe based on total_marks in descending order
        series1 = series1.sort_values('total_marks',ascending=False)

        #drop rows having missing values
        series1.dropna(subset=['roll_no','name'], inplace=True)

        #recreate and intialie the index to new ones
        series1.index=[x for x in range(1,len(series1.index)+1)]

        #Analysis about a particular student
        university_roll_no = unino #get from app
        series = series1['university_roll_no'] #create a new dataseries
        df=series1[series==university_roll_no] # create a new dataframe


        # print(series1.info())
        # print(series1.describe())
        # print(series1)

        analy=""
        max_mark = series1.loc[series1.index[0],'total_marks']

        analy=analy+('You secured <strong>' + str(int(df['total_marks'])) + '/40 </strong> and your rank is <b>' + str(df.index[0]) + '</b> in your class.' )+'<br>'

        analy=analy+('The maximum mark scored in your class is ' + str(max_mark))+'<br>'

        analy=analy+('The question paper contained the following course outcomes: ' + str([str.upper(series1.columns[co]) for co in range(3,len(series1.columns)-1)]))+'<br>'

        co1_mark=int(df.loc[df.index[0],'co1'])
        co2_mark=int(df.loc[df.index[0],'co2'])
        co3_mark=int(df.loc[df.index[0],'co3'])
        co1_percentage = int((co1_mark/max_marks[0])*100)
        co2_percentage = int((co2_mark/max_marks[1])*100)
        co3_percentage = int((co3_mark/max_marks[2])*100)

        co_percentage = [co1_percentage, co2_percentage, co3_percentage]
        # print(co1_percentage,co2_percentage,co3_percentage)

        for index,co_percent in enumerate(co_percentage):
            if(co_percent<=45):
                analy=analy+('You scored '+ str(co_percent) + '% from CO' + str(index+1) + ' <i>which is less than the average performance</i>. So, Please refer the following topics : blah blah blah to improve your score')+'<br>'
            elif(co_percent>=75):
                analy=analy+('You scored '+ str(co_percent) + '% from CO' + str(index+1) + '. Awesome, Keep up the good work and you will reach greater heights. With great knowledge comes great responsibility.')+'<br>'
            else:
                analy=analy+('You scored '+ str(co_percent) + '% from CO' + str(index+1) + ', you did good to get an overview about the topic but you need to improve a lot.')+'<br>'


        #print(analy)
        return jsonify({'analy':analy,'subname':sub_name})

def elective_pred1(marks):
    soft_computing_model = joblib.load('electivePredict/soft_computing.pkl')

    # Use the loaded model to make predictions
    res = soft_computing_model.predict([marks])

    grade={
        10:'O',
        9:'A+',
        8:'A',
        7:'B+',
        6:'B',
        5:'C',
        4:'P',
        3:'P',
        2:'F',
        1:'F'
    }
    return grade[res[0]]

def elective_pred2(marks):
    optimisation_techniques_model= joblib.load('electivePredict/optimisation_techniques.pkl')

    # Use the loaded model to make predictions
    res = optimisation_techniques_model.predict([marks])

    grade={
        10:'O',
        9:'A+',
        8:'A',
        7:'B+',
        6:'B',
        5:'C',
        4:'P',
        3:'P',
        2:'F',
        1:'F'
    }
    return grade[res[0]]

class ElectivePredict(Resource):
    def get(self,g1,g2,g3,g4,g5,g6):
        grade_to_mark={
            'O':10,
            'A+':9,
            'A':8,
            'B+':7,
            'B':6,
            'C':5,
            'P':4,
            'F':3,
            'FE':2,
            'Absent':1
        }



        grades=[g1,g2,g3,g4,g5,g6]
        marks=[]
        for grade in grades:
            marks.append(grade_to_mark[grade])
        res1=elective_pred1(marks)
        res2=elective_pred2(marks)

        recommendation=[]
        if(res1<res2):
        	recommendation.append('CS631 Soft Computing : '+str(res1))
        	recommendation.append('CS365 Optimization Techniques : '+str(res2))
        elif(res1>res2):
        	recommendation.append('CS365 Optimization Techniques : '+str(res2))
	        recommendation.append('CS631 Soft Computing : '+str(res1))

        return recommendation



api.add_resource(TestPath, '/test') # Route_1
api.add_resource(PredictType, '/predict/<int:c1>/<int:c2>/<int:c3>/<int:c4>/<int:c5>/')
api.add_resource(Analysis, '/analysis/<unino>')
api.add_resource(Analysis2, '/analysis/<unino>/<batch>/<sem>/<series>/<docname>')
api.add_resource(Upload, '/upload/<batch>/<sem>/<series>/<course_code>/')
api.add_resource(GetFiles, '/getfile/<batch>/<sem>/<series>')
api.add_resource(ElectivePredict,'/elPred/<g1>/<g2>/<g3>/<g4>/<g5>/<g6>/')


if __name__ == '__main__':
   app.run(port=5002,threaded=True)
