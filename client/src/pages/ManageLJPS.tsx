import { useState } from "react";
import { Tabs } from "antd";
import CreateRoles from "../components/CreateRoles";
import PreviewRoles from "../components/PreviewRoles";
import CreateSkills from "../components/CreateSkills";
import PreviewSkills from "../components/PreviewSkills";

export default function ManageLJPS() {
  const [rolesStep, setRolesStep] = useState("form");
  const [skillsStep, setSkillsStep] = useState("form");
  const [form, setForm] = useState(null);

  return (
    <>
      <h1>Manage LJPS</h1>

      <Tabs
        items={[
          {
            label: "Roles",
            key: "roles",
            children: 
              rolesStep === "form" ? (
                <CreateRoles setForm={setForm} setNext={setRolesStep} />
              ) : (
                <PreviewRoles form={form} setNext={setRolesStep} />
              ),
          },
          {
            label: "Skills",
            key: "skills",
            children:
              skillsStep === "form" ? (
                <CreateSkills setForm={setForm} setNext={setSkillsStep} />
              ) : (
                <PreviewSkills form={form} setNext={setSkillsStep} />
              ),
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
