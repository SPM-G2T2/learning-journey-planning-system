from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Staff(db.Model):
    __tablename__ = "staff"

    Staff_ID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    Staff_FName = db.Column(db.String(50), nullable=False)
    Staff_LName = db.Column(db.String(255), nullable=False)
    Dept = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(50), nullable=False)
    Role_ID = db.Column(db.String(20), nullable=False)

    def __init__(self, Staff_ID, Staff_FName, Staff_LName, Dept, Email, Role_ID): #constructor, initializes the record
        self.Staff_ID = Staff_ID
        self.Staff_FName = Staff_FName
        self.Staff_LName = Staff_LName
        self.Dept = Dept
        self.Email = Email
        self.Role_ID = Role_ID

    def json(self): #returns json representation of the table in dict form
        return {"Staff_ID": self.Staff_ID, "Staff_FName": self.Staff_FName, "Staff_LName": self.Staff_LName, "Dept": self.Dept, "Email": self.Email,
        "Role_ID": self.Role_ID}

    #Fill up columns here



@app.route('/') # Just a decorator to route to certain url
def hello():
    return 'Hello, World!'


if __name__ == 'main':
    app.run(host='0.0.0.0', port=5000, debug=True)