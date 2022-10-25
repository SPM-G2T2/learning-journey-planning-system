from flask import Blueprint, jsonify

from .model import StaffSkill

staff = Blueprint("staff", __name__)


@staff.route("<string:staff_id>/skills")
def get_skills_by_staff(staff_id):

    staffs = StaffSkill.query.filter_by(staff_id=staff_id).all()
    if staffs:
        return jsonify(
            {
                "data": [staff.json() for staff in staffs]
            }
        )
    return jsonify(
        {
            "message": "Staff not found."
        }
    ), 404
