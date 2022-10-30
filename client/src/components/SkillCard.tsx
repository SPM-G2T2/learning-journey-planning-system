import { Button } from "antd";
import { useState } from "react";
import role from "../assets/role.png";
import styles from "../styles/SkillCard.module.css";
import { Skill } from "../types/Skill";
import GenericModal from "./GenericModal";
import bg from "../assets/skill.png"

export default function SkillCard(props: {
  skill?: Skill;
  // role?: Role;
  // selectedRole?: Role;
  // handleClick: () => void;
  // course?: Course;
}) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  function handleClose() {
    setModalStatus(false);
  }

  return (
    <div
      // className={`${styles.horizontal} ${styles.card} ${
      //   props.role === props.selectedRole && styles.cardSelected
      // }`}
      // onClick={props.handleClick}
      style={{ backgroundImage: `url(${bg})`, border:"1px solid black", backgroundSize:"cover", width:"240px", height:"224px", borderRadius:"16px"}}
    >
      {/* hi
      <p>hello</p>
      <p>hello</p>
      <p>hello</p> */}
      {/* <div className={styles.horizontal}>
        <img src={role} alt="role icon" className="icon" />
        <div className={styles.cardRow}>
          <p className={styles.title}>
            {props.role
              ? props.role.position_name
              : "C" +
                props.course?.course_id +
                ": " +
                props.course?.course_name}
          </p>
          <p>
            {" "}
            {props.role ? "Department" : "Category"}:{props.role?.position_dept}{" "}
            {props.course?.course_category}
          </p>
          <p>
            {" "}
            {props.role ? "Description" : "Type"}: {props.role?.position_desc}{" "}
            {props.course?.course_type}
          </p>
        </div>
      </div>
      <Button className={styles.more} onClick={() => setModalStatus(true)}>
        Read More
      </Button> */}
      <GenericModal
        skill={props.skill}
        status={modalStatus}
        handleClose={handleClose}
      />
    </div>
  );
}
