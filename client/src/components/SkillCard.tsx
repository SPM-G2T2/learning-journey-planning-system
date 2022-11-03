import { Button, Tag } from "antd";
import { useState } from "react";
import styles from "../styles/SkillCard.module.css";
import { Skill } from "../types/Skill";
import GenericModal from "./GenericModal";

export default function SkillCard(props: {
  skill: Skill;
  purpose: "view" | "lj" | "edit";
  staffSkillIDs?: Set<number>;
  // role?: Role;
  // selectedRole?: Role;
  // handleClick: () => void;
  // course?: Course;
}) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const missing =
    props.staffSkillIDs && !props.staffSkillIDs.has(props.skill.skill_id);
  const retired =
    props.purpose === "lj" && props.skill.skill_status === "Retired";

  function handleClose() {
    setModalStatus(false);
  }

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
        {missing && (
          <Tag className={`${styles.status} ${styles.Retired}`}>Missing</Tag>
        )}
        {retired && (
          <Tag className={`${styles.status} ${styles.Retired}`}>Retired</Tag>
        )}
        {props.purpose === "edit" && (
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
      <Button className={styles.more} onClick={() => setModalStatus(true)}>
        Read More
      </Button>
      <GenericModal
        skill={props.skill}
        purpose={props.purpose}
        missing={missing}
        retired={retired}
        status={modalStatus}
        handleClose={handleClose}
      />
    </div>
  );
}
