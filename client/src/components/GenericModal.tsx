import { Button, Modal, Tag } from "antd";
import { Role } from "../types/Role";
import styles from "../styles/GenericModal.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skill } from "../types/Skill";

export default function GenericModal(props: {
  role?: Role;
  status: boolean;
  handleClose: () => void;
}) {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/position_skills/" + props.role?.position_id)
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
          <h1>{props.role?.position_name}</h1>
          <Tag className={styles.status} color="#16C098">
            Active
          </Tag>
        </div>
        <h2>Role Description: </h2>
        <p>{props.role?.position_desc}</p>
        <h2>Role Responsibilities: </h2>
        <ul>
          {props.role?.position_res.split(";").map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
        <h2>Department: </h2>
        <p>{props.role?.position_dept}</p>
        <h2>Skills required for the role: </h2>
        <ul>
          {skills.map((skill) => (
            <li key={skill.skill_id}>{skill.skill_name}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
