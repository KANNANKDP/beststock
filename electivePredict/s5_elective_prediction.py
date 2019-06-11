import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt


def elective_pred(marks,elective1,elective2,course_code1,course_code2):
    soft_computing = pd.read_csv('soft_computing_data.csv')
    soft_computing.dropna(subset=['CS361'], inplace=True)

    X = soft_computing.iloc[:, 1:7].values
    y = soft_computing.iloc[:, -1].values
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

    from sklearn.ensemble import RandomForestClassifier

    #Create a Gaussian Classifier
    clf=RandomForestClassifier(n_estimators=100)

    #Train the model using the training sets y_pred=clf.predict(X_test)
    clf.fit(X_train,y_train)

    y_pred=clf.predict(X_test)
    res1=clf.predict([marks])

    #Import scikit-learn metrics module for accuracy calculation
    from sklearn import metrics
    # Model Accuracy, how often is the classifier correct?
    print("Accuracy:",metrics.accuracy_score(y_test, y_pred))

    optimisation_techniques = pd.read_csv('optimisation_data.csv')
    optimisation_techniques.dropna(subset=['CS365'], inplace=True)

    X = optimisation_techniques.iloc[:, 1:7].values
    y = optimisation_techniques.iloc[:, -1].values
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)

    from sklearn.ensemble import RandomForestClassifier

    #Create a Gaussian Classifier
    clf=RandomForestClassifier(n_estimators=100)

    #Train the model using the training sets y_pred=clf.predict(X_test)
    clf.fit(X_train,y_train)

    y_pred=clf.predict(X_test)

    print(X_test)
    res2=clf.predict([marks])
    print(y_pred)
    print(y_test)

    #Import scikit-learn metrics module for accuracy calculation
    from sklearn import metrics
    # Model Accuracy, how often is the classifier correct?
    print("Accuracy:",metrics.accuracy_score(y_test, y_pred))

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

    recommendation=[]
    if(res1>res2):
        recommendation.append(str(course_code1)+'-'+str(elective1)+' : '+str(grade[res1[0]]))
        recommendation.append(str(course_code2)+'-'+str(elective2)+' : '+str(grade[res2[0]]))
    elif(res1<res2):
        recommendation.append(str(course_code2)+'-'+str(elective2)+' : '+str(grade[res2[0]]))
        recommendation.append(str(course_code1)+'-'+str(elective1)+' : '+str(grade[res1[0]]))
    
    return recommendation

prediction = elective_pred([8,7,7,6,5,6],'Soft Computing','Optimisation Techniques','CS361','CS365')

print(prediction)