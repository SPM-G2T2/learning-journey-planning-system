from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class LearningJourney(db.Model):
    __tablename__ = "learningjourney"

    lj_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    staff_id = db.Column(db.Integer, nullable=False)
    skill_id = db.Column(db.Integer, nullable=False)
    position_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.String(20), nullable=False)

    def __init__(self, lj_id, staff_id, skill_id, position_id, course_id): #constructor, initializes the record
        self.lj_id = lj_id
        self.staff_id = staff_id
        self.skill_id = skill_id
        self.position_id = position_id
        self.course_id = course_id


    def json(self): #returns json representation of the table in dict form
        return {"lj_id": self.lj_id, "staff_id": self.staff_id, "skill_id": self.skill_id, "position_id": self.position_id, "course_id": self.course_id}

    #Fill up columns here



@app.route('/') # Just a decorator to route to certain url
def hello():
    return 'Hello, World!'


if __name__ == 'main':
    app.run(host='0.0.0.0', port=5000, debug=True)