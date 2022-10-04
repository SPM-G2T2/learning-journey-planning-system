import { useState } from "react";
import { Tabs } from "antd";
import CreateRoles from "../components/CreateRoles"
import PreviewRoles from "../components/PreviewRoles"

export default function ManageLJPS() {

  const [rolesStep, setRolesStep] = useState("form");
  const [form, setForm] = useState(null)

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
            children: "Content of Skills",
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
