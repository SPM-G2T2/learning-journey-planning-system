import { Button } from "antd";
import { useState } from "react";
import role from "../assets/role.png";
import styles from "../styles/RoleCourseCard.module.css";
import { Role } from "../types/Role";
import { Course } from "../types/Course";
import GenericModal from "./GenericModal";

export default function RoleCourseCard(props: {
  role?: Role;
  selectedRole?: Role;
  handleClick: () => void;
  course?: Course;
}) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  function handleClose() {
    setModalStatus(false);
  }

  return (
    <div
      className={`${styles.horizontal} ${styles.card} ${
        props.role === props.selectedRole && styles.cardSelected
      }`}
      onClick={props.handleClick}
    >
      <div className={styles.horizontal}>
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
      </Button>
      <GenericModal
        role={props.role}
        course={props.course}
        status={modalStatus}
        handleClose={handleClose}
      />
    </div>
  );
}
