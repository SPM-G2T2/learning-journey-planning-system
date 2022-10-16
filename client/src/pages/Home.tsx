import { Button, Pagination, Steps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import RoleCourseCard from "../components/RoleCourseCard";
import styles from "../styles/ChooseRole.module.css";
import { Role } from "../types/Role";

export default function Home({ lj }: { lj?: boolean }) {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/active_positions")
      .then((resp) => setRoles(resp.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Create Your Desired Learning Journey</h1>

      <div className={styles.content}>
        <Steps labelPlacement="vertical">
          <Steps.Step title="Choose a role" />
          <Steps.Step title="Choose skills" />
          <Steps.Step title="Choose courses" />
        </Steps>

        <div className={styles.selection}>
          <p className={styles.selectionLabel}>
            Role Selected:{" "}
            <span className={styles.selectionContent}>Repair engineer</span>
          </p>
          <p className={styles.selectionLabel}>
            Skills Selected:{" "}
            <span className={styles.selectionContent}>
              Technical Support, Diagnosis, Parts Inventory
            </span>
          </p>
          <p className={styles.selectionLabel}>
            Courses Selected:{" "}
            <span className={styles.selectionContent}>
              Intro to Technical Support
            </span>
          </p>
        </div>

        {roles.map((role) => (
          <RoleCourseCard role={role} key={role.position_id} />
        ))}
      </div>

      <div className={styles.bottom}>
        <Pagination total={15} defaultPageSize={3} />
        <Button type="primary">Next</Button>
      </div>
    </>
  );
}
