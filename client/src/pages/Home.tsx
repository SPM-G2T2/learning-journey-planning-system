import { Button, Col, Pagination, Row, Steps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import RoleCourseCard from "../components/RoleCourseCard";
import SkillCard from "../components/SkillCard";
import styles from "../styles/ChooseRole.module.css";
import { Role } from "../types/Role";
import { Skill } from "../types/Skill";

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [skills, setSkills] = useState<Skill[][]>([]);
  const [staffSkillIDs, setStaffSkillIDs] = useState<Set<number>>(new Set());
  const [selectedSkills, setSelectedSkills] = useState<{
    [key: number]: string;
  }>({});
  const staffID = 140001;

  useEffect(() => {
    axios
      .get("http://localhost:5000/positions/all")
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
              {Object.values(selectedSkills).join(", ")}
            </span>
          </p>
          <p className={styles.selectionLabel}>
            Courses Selected:{" "}
            <span className={styles.selectionContent}>
              Intro to Technical Support
            </span>
          </p>
        </div>

        {step === 0 &&
          roles.map(
            (role) =>
              (role.position_status === "Active" ||
                role.position_id === selectedRole?.position_id) && (
                <RoleCourseCard
                  role={role}
                  purpose="lj"
                  selectedRole={selectedRole}
                  handleClick={() => {
                    if (selectedRole === role) {
                      setSelectedRole(undefined);
                    } else {
                      setSelectedRole(role);
                    }
                  }}
                  key={role.position_id}
                />
              )
          )}

        {step === 1 &&
          skills.map((row, i) => (
            <Row key={i}>
              {row.map(
                (skill) =>
                  (skill.skill_status === "Active" ||
                    selectedSkills[skill.skill_id]) && (
                    <Col className={styles.skill} key={skill.skill_id}>
                      <SkillCard
                        skill={skill}
                        purpose="lj"
                        staffSkillIDs={staffSkillIDs}
                        selectedSkills={selectedSkills}
                        handleClick={() => {
                          const newSelectedSkills = { ...selectedSkills };
                          if (newSelectedSkills[skill.skill_id]) {
                            delete newSelectedSkills[skill.skill_id];
                          } else {
                            newSelectedSkills[skill.skill_id] =
                              skill.skill_name;
                          }
                          setSelectedSkills(newSelectedSkills);
                        }}
                      />
                    </Col>
                  )
              )}
            </Row>
          ))}
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
                    "/skills"
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

              axios
                .get("http://localhost:5000/staff/" + staffID + "/skill_ids")
                .then((resp) => setStaffSkillIDs(new Set(resp.data.data)))
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
