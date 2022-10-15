import role from "../assets/role.png"
import { Button, Modal, Space } from 'antd';


export default function RoleCourseCard() {

  const info = () => {
    Modal.info({
      title: 'Title of Course (Course Name)',
      content: (
        <div>
            <p> Insert Image here </p>
  
            <p><h4>Course Description:</h4>
              <p> Random desc </p>
            </p>
  
            <p><h4>Course Type:</h4>
              <p> List the type </p>
            </p>
  
            <p><h4> Course Category:</h4>
              <p> Category stuff</p>
            </p>
  
            <p><h4>Skills that the course can fulfil:</h4>
              <p> List of skills </p>
            </p>
        </div>
        
        
        
        ),
      cancelButtonProps : { style: {display : 'none'}},
      onOk() {
        console.log('OK');
      },
    });
  };

  return (
    <div style={{ width: "50vw", justifyContent:"space-between", marginBottom: "1vw" }} className="horizontal card">
      <div className="horizontal">
        <img src={role} alt="role icon" className="icon"/>
        <div className="card-row" style={{margin:"1vw 0 0 1.5vw"}}>
          <p style={{fontSize:"1vw", fontWeight:"700"}}>Role</p>
          <p>Department:</p>
          <p>Description:</p>
        </div>
      </div>
      <Button onClick={info} className="border btn-color">Read More</Button>
    </div>
  );
}