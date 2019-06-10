import os, shutil
import requests
import tabula
from urllib.request import urlopen
from bs4 import BeautifulSoup
import glob


#inputs
degree='B.Tech'
semester='S7'


result_page_database={}
for page_no in range(0,11):
    url = "https://ktu.edu.in/eu/res/viewResults.htm?actionLink=listingTable-controlLink&page="+str(page_no)
    html = urlopen(url)
    soup = BeautifulSoup(html,'html.parser')

    all_links = soup.find_all('a')
    for link in all_links:
        link_text=(link.get_text())
        link_url=(link.get('href'))
        if(degree in link_text):
        	exam_name = link_text.split(' ')
        	# print(exam_name)
        	if(exam_name[1]==degree and exam_name[2]==semester and ((exam_name[4]=='Exam' or exam_name[4]=='Examination') or ((exam_name[4]!='(S)' and exam_name[4]!='(PT)') and (exam_name[5]=='Exam' or exam_name[5]=='Examination')))):
	        	result_page_database[str(link_text)]='https://ktu.edu.in'+str(link_url)
# result_database=[]
# result_no=1

print(result_page_database)
# folder = '/home/muhammad/Documents/proj/project2/Project/scrapping/'+str(semester)+'/'
# # if not glob.glob('*.pdf'):
# for key,value in result_page_database.items():
#     if semester in key:
#         file_url = str(value)
#         html = urlopen(file_url)
#         soup = BeautifulSoup(html,'html.parser')
#         all_links = soup.find_all('a',attrs={'class':'link-results'})
#         for link in all_links:
#             link_text=(link.get_text())
#             link_url=(link.get('href'))
#             result_database.append('https://ktu.edu.in'+str(link_url))
#         for link in result_database:
#             file_url=str(link)
#             r = requests.get(file_url, stream = True)
#             file_name='result'+str(result_no)+'.pdf'
#             with open(folder+str(key)+'/'+file_name,"wb") as pdf:
#                 for chunk in r.iter_content(chunk_size=1024):
#                     # writing one chunk at a time to pdf file 
#                     if chunk:
#                         pdf.write(chunk)
#             result_no+=1