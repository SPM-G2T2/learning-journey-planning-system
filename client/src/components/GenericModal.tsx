import { Button, Modal, Tag, Badge } from "antd";
import { Role } from "../types/Role";
import styles from "../styles/GenericModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skill } from "../types/Skill";
import { Course } from "../types/Course";

export default function GenericModal(props: {
  role?: Role;
  course?: Course;
  status: boolean;
  handleClose: () => void;
}) {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/positions/" + props.role?.position_id + "/skills")
      .then((resp) => setSkills(resp.data.data))
      .catch((err) => console.log(err));

    axios
      .get(
        "http://localhost:5000/courses/" + props.course?.course_id + "/skills"
      )
      .then((resp) => setSkills(resp.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Modal
        open={props.status}
        onCancel={props.handleClose}
        footer={
          <Button type="primary" onClick={props.handleClose}>
            OK
          </Button>
        }
      >
        <div className={styles.top}>
          <h2>
            {props.role
              ? props.role.position_name
              : props.course?.course_id + ": " + props.course?.course_name}
          </h2>
          <Tag className={styles.status} color="#16C098">
            Active
          </Tag>
        </div>
        <hr className={styles.hr}></hr>
        <h3>Description: </h3>
        <p>
          {props.role?.position_desc} {props.course?.course_desc}
        </p>
        <h3>{props.role ? "Responsibilities:" : null}</h3>
        <ul>
          {props.role?.position_res.split(";").map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
        <h3>{props.role ? "Department:" : null}</h3>
        <p>{props.role?.position_dept}</p>
        <h3>{props.course ? "Type:" : null}</h3>
        <p>
          {props.course
            ? "The course will be conducted " + (props.course.course_type === 'Internal' ? 'in-house' : 'off-site') : null}
        </p>
        <h3>{props.course ? "Category:" : null}</h3>
        <p>{props.course?.course_category}</p>
        <h3>Skills required for the {props.role ? "role" : "course"}:</h3>
        {/* <ul>
          {skills.map((skill) => (
            <li key={skill.skill_id}>{skill.skill_name}</li>
          ))}
        </ul> */}
        {skills.map((skill) => (
            <Badge key={skill.skill_id} count={skill.skill_name} className={styles.badge}></Badge>
          ))}
      </Modal>
    </>
  );
}
