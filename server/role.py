from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Role(db.Model):
    __tablename__ = "Role"

    Role_ID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    Role_Name = db.Column(db.String(50), nullable=False)

    def __init__(self, Role_ID, Role_Name): #constructor, initializes the record
        self.Role_ID = Role_ID
        self.Role_Name = Role_Name
        

    def json(self): #returns json representation of the table in dict form
        return {"Role_ID": self.Role_ID, "Role_Name": self.Role_Name}

    #Fill up columns here



@app.route('/') # Just a decorator to route to certain url
def hello():
    return 'Hello, World!'


if __name__ == 'main':
    app.run(host='0.0.0.0', port=5000, debug=True)