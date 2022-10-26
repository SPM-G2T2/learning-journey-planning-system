import { Button, Tag } from "antd";
import { useState } from "react";
import role1 from "../assets/role1.png";
import role2 from "../assets/role2.png";
import styles from "../styles/RoleCourseCard.module.css";
import { Role } from "../types/Role";
import { Course } from "../types/Course";
import GenericModal from "./GenericModal";

export default function RoleCourseCard(props: {
  view?: boolean;
  role?: Role;
  selectedRole?: Role;
  handleClick?: () => void;
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
        { (Math.floor(Math.random() * 2) + 1) === 1 ? <img src={role1} alt="role icon" /> : <img src={role2} alt="role icon" />}
        <div className={styles.cardRow}>
          <p className={styles.title}>
            {props.role
              ? props.role.position_name
              : "C" +
                props.course?.course_id +
                ": " +
                props.course?.course_name}
              {props.view && props.role?.position_status === "Active" ? <Tag className={styles.activeStatus}>Active</Tag> : null}
              {props.view && props.role?.position_status === "Retired" ? <Tag className={styles.inactiveStatus}>Retired</Tag> : null}
          </p> 
          <p style={{ color: '#374A59', fontWeight: 'bold' }}>
            {" "}
            {props.role ? "Department" : "Category"}: {props.role?.position_dept}{" "}
            {props.course?.course_category}
          </p>
          <p style={{ color: '#374A59' }}>
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
