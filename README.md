<h1 align='center'>📚 💻 All-in-One Learning Journey Planning System 📚 💻 </h1>

## Description:
A Learning Journey Planning System to complement the existing Learning Management System for All-In-One Printing Solution Equipment Servicing Company.

## Product Goal for the First Release:
Provide direction for staff to reach their career aspirations within the company, and allow them to plan their learning journey and track their progress.

## Development Team:

| Name  | Email |
| ------------- | ------------- |
| GOH SOON HAO  | soonhao.goh.2020@scis.smu.edu.sg |
| JETHRO ONG YONG EN | jethro.ong.2020@scis.smu.edu.sg |
| JOEY LAU RUN-QI | joeylau.2020@scis.smu.edu.sg | 
| SHAO ZIHANG  | zihang.shao.2020@scis.smu.edu.sg |
| TEOH CHIN HAO JORDAN  | jordan.teoh.2020@scis.smu.edu.sg |
| WANG ZHIJIE  | zhijie.wang.2020@scis.smu.edu.sg |


## Set Up Guide
1. Clone the repository 
2. Create a ```.env``` file under Server folder and place the password for the database


## Installation Guide 
1. Front-End <br/>
  1.1. ```npm install```
2. Back-End <br/>
  2.1. ```pip install Flask``` <br/>
  2.2. ``` pip install flask-sqlalchemy```  <br/>
  2.3. ``` pip install Flask-Cors```  <br/>
  2.4. ``` pip install mysql-connector``` <br/>
  2.5. ```pip install python-dotenv``` <br/>
  
 ## How to Run the Application?
 1. Run the Client (Front-End) <br/>
  1.1. At the root directory, type ```cd client``` and ```npm run start``` in the terminal
2. Run the Server (Back-End) <br/>
  2.1. At the root directory, type ```cd server``` and ```python main.py``` in the terminal

 
 ## How to Test the Application?
 1. In your Visual Studio Code, click on *"Testing"* on the Activity Bar
 2. Next, click on *"Configure Python Tests"*
 3. From the prompt, select *"[unittest] Standard Python test framework"*
 4. From the prompt, select *"[.] Root directory"*
 5. From the prompt, select *"[*_test.py] Python files ending with ‘_test’"*
 6. The testing panel on the left should populate all the unit tests discovered in the repository
 7. From the context menu, choose *“Run tests”*
 
