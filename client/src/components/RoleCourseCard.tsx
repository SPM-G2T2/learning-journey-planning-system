import { Button } from "antd";
import { useState } from "react";
import role from "../assets/role.png";
import styles from "../styles/RoleCourseCard.module.css";
import { Role } from "../types/Role";
import GenericModal from "./GenericModal";

export default function RoleCourseCard(props: { role?: Role }) {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  function handleClose() {
    setModalStatus(false);
  }

  return (
    <div className={`${styles.horizontal} ${styles.card}`}>
      <div className={styles.horizontal}>
        <img src={role} alt="role icon" className="icon" />
        <div className={styles.cardRow}>
          <p className={styles.title}>{props.role?.position_name}</p>
          <p>Department: {props.role?.position_dept}</p>
          <p>Description: {props.role?.position_desc}</p>
        </div>
      </div>
      <Button className={styles.more} onClick={() => setModalStatus(true)}>
        Read More
      </Button>
      <GenericModal
        role={props.role}
        status={modalStatus}
        handleClose={handleClose}
      />
    </div>
  );
}
