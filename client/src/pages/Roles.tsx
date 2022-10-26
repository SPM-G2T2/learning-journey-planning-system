import { useState, useEffect } from "react";
import axios from "axios";
import RoleCourseCard from "../components/RoleCourseCard";
import { Role } from "../types/Role";


export default function Roles() {

  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    axios
    .get("http://localhost:5000/positions/all")
    .then((resp) => setRoles(resp.data.data))
    .catch((err) => console.log(err));
  }, []);

  console.log(roles);

  return (
    <>
      <h1>Available Roles</h1>
      <div style={{  width: '50vw', margin: 'auto', marginTop: '10vh' }}>
      {roles.map((role) => (
        <RoleCourseCard role={role} view={true} />
      ))}
      </div>
    </>
  );
}