from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Skill(db.Model):
    __tablename__ = "skill"

    Skill_ID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    Skill_Name = db.Column(db.String(50), nullable=False)
    Skill_Description = db.Column(db.String(255), nullable=False)
    Skill_Status = db.Column(db.String(10), nullable=False)

    def __init__(self, Skill_ID, Skill_Name, Skill_Description, Skill_Status): #constructor, initializes the record
        self.Skill_ID = Skill_ID
        self.Skill_Name = Skill_Name
        self.Skill_Description = Skill_Description
        self.Skill_Status = Skill_Status


    def json(self): #returns json representation of the table in dict form
        return {"Skill_ID": self.Skill_ID, "Skill_Name": self.Skill_Name, "Skill_Description": self.Skill_Description, "Skill_Status": self.Skill_Status}

    #Fill up columns here



@app.route('/') # Just a decorator to route to certain url
def hello():
    return 'Hello, World!'


if __name__ == 'main':
    app.run(host='0.0.0.0', port=5000, debug=True)