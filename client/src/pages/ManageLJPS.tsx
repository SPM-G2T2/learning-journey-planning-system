import { useState } from "react";
import { Tabs } from "antd";
import RenderRoles from "../components/RenderRoles";
import RenderCourses from "../components/RenderCourses";
import CreateRoles from "../components/CreateRoles";
import PreviewRoles from "../components/PreviewRoles";
import CreateSkills from "../components/CreateSkills";
import PreviewSkills from "../components/PreviewSkills";
import EditSkills from "../components/EditSkills";

export default function ManageLJPS() {
  const [rolesStep, setRolesStep] = useState("view");
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
              rolesStep === "view" ? <RenderRoles setRolesStep={setRolesStep}/> :
              (rolesStep === "form" ? (
                <CreateRoles setRolesStep={setRolesStep} setForm={setForm} setNext={setRolesStep} />
              ) : (
                <PreviewRoles form={form} setNext={setRolesStep} />
              )),
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
          //  To shift later 
          {
            label: "Edit Skills",
            key: "edit skills",
            children:
              skillsStep === "form" ? (
                <EditSkills setForm={setForm} setNext={setSkillsStep} />
              ) : (
                <PreviewSkills form={form} setNext={setSkillsStep} />
              ),
          },
          {
            label: "Courses",
            key: "course",
            children: <RenderCourses/>,
          },
        ]}
      />
    </>
  );
}
