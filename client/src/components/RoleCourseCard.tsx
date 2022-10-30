import { Button, Tag } from "antd";
import { useState } from "react";
import role1 from "../assets/role1.png";
import role2 from "../assets/role2.png";
import course1 from "../assets/course1.png";
import course2 from "../assets/course2.png";
import styles from "../styles/RoleCourseCard.module.css";
import { Role } from "../types/Role";
import { Course } from "../types/Course";
import GenericModal from "./GenericModal";

export default function RoleCourseCard(props: {
  edit?: boolean;
  role?: Role;
  selectedRole?: Role;
  selectedCourse?: Course;
  handleClick?: () => void;
  course?: Course;
}) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  function handleClose() {
    setModalStatus(false);
  }
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <div
      // className={`${styles.horizontal} ${styles.card} ${
      //   props.role === props.selectedRole && styles.cardSelected
      // }`}
      className={`${styles.horizontal} ${styles.card} ${ props.role === props.selectedRole  || props.course === props.selectedCourse ?  styles.cardSelected : null}`}
      onClick={props.handleClick}
    >
      <div className={styles.horizontal}>
        { props.role ? ((Math.floor(Math.random() * 2) + 1) === 1 ? <img src={role1} alt="role icon" className={styles.image}/> : <img src={role2} alt="role icon" className={styles.image}/>): (props.course?.course_category === "Technical" ? <img src={course1} alt="role icon" className={styles.image}/> : <img src={course2} alt="role icon" className={styles.image}/>)}
        <div className={styles.cardRow}>
          <p className={styles.title}>
            {props.role
              ? props.role.position_name
              :
                props.course?.course_id +
                ": " +
                props.course?.course_name}
              {props.edit && props.role?.position_status === "Active" ? <Tag className={styles.activeStatus}>Active</Tag> : null}
              {props.edit && props.role?.position_status === "Retired" ? <Tag className={styles.inactiveStatus}>Retired</Tag> : null}
          </p> 
          <p style={{ color: '#374A59', fontWeight: 'bold' }}>
            {" "}
            {props.role ? "Department" : "Category"}: {props.role?.position_dept}{" "}
            {props.course?.course_category}
          </p>
          <p style={{ color: '#374A59' }}>
            {" "}
            Description: {" "}
            {props.role?.position_desc}
            {props.course?.course_desc}
          </p>
        </div>
      </div>
      { props.edit ? 
      <Button className={styles.edit}>
        Edit
      </Button>
      :
      <Button className={styles.more} onClick={() => setModalStatus(true)}>
        Read More
      </Button>}
      <GenericModal
        role={props.role}
        course={props.course}
        status={modalStatus}
        handleClose={handleClose}
      />
    </div>
  );
}
