import { useState } from "react";
import { Tabs } from "antd";
import CreateRoles from "../components/CreateRoles"
import PreviewRoles from "../components/PreviewRoles"
import CreateSkills from "../components/CreateSkills"
import PreviewSkills from "../components/PreviewSkills"

export default function ManageLJPS() {

  const [rolesStep, setRolesStep] = useState("form");
  const [skillsStep, setSkillsStep] = useState("form2");
  const [form, setForm] = useState(null)
  const [form2, setForm2] = useState(null)

  return (
    <>
      <h1 className="header">Manage LJPS</h1>

      <Tabs
        items={[
          {
            label: "Roles",
            key: "roles",
            children: rolesStep === "form" ? <CreateRoles setForm={setForm} setNext = {setRolesStep} /> : <PreviewRoles form={form} /> ,
          },
          {
            label: "Skills",
            key: "skills",
            children: skillsStep === "form2" ? <CreateSkills setForm={setForm2} setNext = {setSkillsStep} /> : <PreviewSkills form={form2} /> ,
          },
          {
            label: "Courses",
            key: "course",
            children: "Content of Courses",
          },
        ]}
      />
    </>
  );
}