import { Alert, Button, Modal } from "antd";
import { Role } from "../types/Role";
import styles from "../styles/GenericModal.module.css";

export default function GenericModal(props: {
  role?: Role;
  status: boolean;
  handleClose: () => void;
}) {
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
          <Alert
            className={styles.status}
            message={props.role?.position_status}
            type={
              props.role?.position_status === "Active" ? "success" : "error"
            }
          />
        </div>
        <h2>Role Description: </h2>
        <p>{props.role?.position_desc}</p>
        <h2>Role Responsibilities: </h2>
        <p>{props.role?.position_res}</p>
        <h2>Department: </h2>
        <p>{props.role?.position_dept}</p>
        <h2>Skills required for the role: </h2>
        <p>some skills</p>
      </Modal>
    </>
  );
}
