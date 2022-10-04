from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Course(db.Model):
    __tablename__ = "course"

    Course_ID = db.Column(db.String(20), primary_key=True, autoincrement=True, nullable=False)
    Course_Name = db.Column(db.String(50), nullable=False)
    Course_Desc = db.Column(db.String(255), nullable=False)
    Course_Status = db.Column(db.String(15), nullable=False)
    Course_Type = db.Column(db.String(10), nullable=False)
    Course_Category = db.Column(db.String(50), nullable=False)
    Skill_ID = db.Column(db.Integer, nullable=False)

    def __init__(self, Course_ID, Course_Name, Course_Desc, Course_Status, Course_Type, Course_Category, Skill_ID): #constructor, initializes the record
        self.Course_ID = Course_ID
        self.Course_Name = Course_Name
        self.Course_Desc = Course_Desc
        self.Course_Status = Course_Status
        self.Course_Type = Course_Type
        self.Course_Category = Course_Category
        self.Skill_ID = Skill_ID


    def json(self): #returns json representation of the table in dict form
        return {"Course_ID": self.Course_ID, "Course_Name": self.Course_Name, "Course_Desc": self.Course_Desc, "Course_Status": self.Course_Status, "Course_Type": self.Course_Type,
        "Course_Category": self.Course_Category,
        "Skill_ID": self.Skill_ID}

    #Fill up columns here



@app.route('/') # Just a decorator to route to certain url
def hello():
    return 'Hello, World!'


if __name__ == 'main':
    app.run(host='0.0.0.0', port=5000, debug=True)