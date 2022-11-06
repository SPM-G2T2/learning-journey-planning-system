import { Button, Col, Pagination, Row, Steps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import RoleCourseCard from "../components/RoleCourseCard";
import SkillCard from "../components/SkillCard";
import styles from "../styles/ChooseRole.module.css";
import { Role } from "../types/Role";
import { Skill } from "../types/Skill";

export default function Home({ lj }: { lj?: boolean }) {
  const [step, setStep] = useState<number>(0);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [skills, setSkills] = useState<Skill[][]>([]);

  const [rolesStep, setRolesStep] = useState("view");

  const callback = () => {
    setRolesStep(rolesStep);
  }


  useEffect(() => {
    axios
      .get("http://localhost:5000/positions/active")
      .then((resp) => setRoles(resp.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Create Your Desired Learning Journey</h1>

      <div className={styles.content}>
        <Steps labelPlacement="vertical" current={step} className={styles.step}>
          <Steps.Step title="Choose a role" />
          <Steps.Step title="Choose skills" />
          <Steps.Step title="Choose courses" />
        </Steps>

        <div className={styles.selection}>
          <p className={styles.selectionLabel}>
            Role Selected:{" "}
            <span className={styles.selectionContent}>
              {selectedRole?.position_name}
            </span>
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

        <div>
          {step === 0 &&
            roles.map((role) => (
              <RoleCourseCard
                role={role}
                selectedRole={selectedRole}
                editClicked={callback}  
                handleClick={() => {
                  if (selectedRole === role) {
                    setSelectedRole(undefined);
                  } else {
                    setSelectedRole(role);
                  }
                }}
                key={role.position_id}
              />
            ))}

          {step === 1 &&
            skills.map((row) => (
              <Row className={styles.skill}>
                {row.map((skill) => (
                  <Col key={skill.skill_id}>
                    <SkillCard skill={skill} lj={true} />
                  </Col>
                ))}
              </Row>
            ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <Pagination total={15} defaultPageSize={3} />
        <Button
          type="primary"
          onClick={() => {
            if (step === 0) {
              axios
                .get(
                  "http://localhost:5000/positions/" +
                    selectedRole?.position_id +
                    "/skills/active"
                )
                .then((resp) => {
                  const rows = [];
                  let row = [];
                  for (let col of resp.data.data) {
                    if (row.length === 3) {
                      rows.push(row);
                      row = [];
                    }
                    row.push(col);
                  }
                  if (row.length > 0) {
                    rows.push(row);
                  }
                  setSkills(rows);
                })
                .catch((err) => console.log(err));
            } else if (step === 1) {
            }
            setStep(step + 1);
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}
