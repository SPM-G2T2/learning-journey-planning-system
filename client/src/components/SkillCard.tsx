import { Button, Tag } from "antd";
import { useState } from "react";
import styles from "../styles/SkillCard.module.css";
import { Skill } from "../types/Skill";
import GenericModal from "./GenericModal";

export default function SkillCard(props: {
  skill: Skill;
  purpose: "view" | "lj" | "edit";
  staffSkillIDs?: Set<number>;
  selectedSkills?: { [key: number]: string };
  handleClick?: () => void;
}) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const missing =
    props.staffSkillIDs && !props.staffSkillIDs.has(props.skill.skill_id);

  function handleClose() {
    setModalStatus(false);
  }

  return (
    <div
      className={`${styles.card} ${
        props.selectedSkills &&
        props.selectedSkills[props.skill.skill_id] &&
        styles.cardSelected
      }`}
      onClick={props.handleClick}
    >
      <p className={styles.title}>
        {props.skill.skill_name}
        {missing && (
          <Tag className={`${styles.status} ${styles.Retired}`}>Missing</Tag>
        )}
        {(props.purpose === "edit" ||
          props.skill.skill_status === "Retired") && (
          <Tag
            className={`${styles.status} ${styles[props.skill.skill_status]}`}
          >
            {props.skill.skill_status}
          </Tag>
        )}
      </p>
      {props.skill.skill_desc.length > 200
        ? props.skill.skill_desc.substring(0, 200) + " ..."
        : props.skill.skill_desc}
      {props.purpose === "edit" ? (
        <Button className={styles.btn} onClick={() => {}}>
          Edit
        </Button>
      ) : (
        <Button
          className={styles.btn}
          onClick={() => (props.purpose === "lj" ? setModalStatus(true) : {})}
        >
          Read More
        </Button>
      )}
      <GenericModal
        skill={props.skill}
        missing={missing}
        status={modalStatus}
        handleClose={handleClose}
      />
    </div>
  );
}
