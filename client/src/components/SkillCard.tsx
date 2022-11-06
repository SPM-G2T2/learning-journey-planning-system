import { Button, Tag } from "antd";
import { useState } from "react";
import styles from "../styles/SkillCard.module.css";
import { Skill } from "../types/Skill";
import GenericModal from "./GenericModal";

export default function SkillCard(props: {
  editClicked: (editSkill: Skill | undefined) => void;
  skill: Skill;
  lj: boolean;
  // role?: Role;
  // selectedRole?: Role;
  // handleClick: () => void;
  // course?: Course;
}) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  function handleClose() {
    setModalStatus(false);
  }

  const color = { Active: "#008767", Retired: "#FF0000" };

  const bgColor = { Active: "#16C098", Retired: "#F3A1A9" };

  return (
    <div
      // className={`${styles.horizontal} ${styles.card} ${
      //   props.role === props.selectedRole && styles.cardSelected
      // }`}
      // onClick={props.handleClick}
      className={styles.card}
    >
      <p className={styles.title}>
        {props.skill.skill_name}
        <Tag className={`${styles.status} ${styles[props.skill.skill_status]}`}>
          {props.skill.skill_status}
        </Tag>
      </p>
      {props.skill.skill_desc.length > 200
        ? props.skill.skill_desc.substring(0, 200) + " ..."
        : props.skill.skill_desc}
      {props.lj ? 
      <Button className={styles.more} onClick={() => setModalStatus(true)}>
        Read More
      </Button>:
      <Button className={styles.edit} onClick={() => props.editClicked(props.skill) }>
            Edit
      </Button> }
      <GenericModal
        skill={props.skill}
        status={modalStatus}
        handleClose={handleClose}
      />
    </div>
  );
}
