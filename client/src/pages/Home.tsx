import { Row, Col, Table, Card, Button, Typography } from "antd";
import type { ColumnsType } from 'antd/es/table';
import glorilla_image from "../assets/glorilla_image.png";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { PositionSkill } from "../../src/types/PositionSkill";

interface DataType {
  learningJourney: number;
  role: string;
  requiredSkills: number;
  missingSkills: number;
  addedCourses: number;
}

export default function Home() {

  const [staffID] = useState(1);
  const [ljData, setLjData] = useState();
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [countSkills, setCountSkills] = useState();
  // const [requiredSkills, setRequiredSkills] = useState<PositionSkill[]>([]);

  const { Text } = Typography;

  const columns: ColumnsType<DataType> = [
    {
      title: 'Learning Journey',
      dataIndex: 'learningJourney',
      key: 'learningJourney',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
    },
    {
      title: 'Number of skills required',
      dataIndex: 'requiredSkills',
      key: 'requiredSkills',
    },
    {
      title: 'Number of missing skills',
      dataIndex: 'missingSkills',
      key: 'missingSkills',
      render: (text) => text > 0 ? <Text type="danger">{text}</Text> : <Text type="success">{text}</Text> 
    },
    {
      title: 'Number of courses added',
      dataIndex: 'addedCourses',
      key: 'addedCourses',
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Button>
          Edit
        </Button>
      ),
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Button className={styles.deleteButton}>
          Delete
        </Button>
      ),
    },
  ];

  // var tableData: DataType[] = [
    // {
    //   learningJourney: 1,
    //   role: 'Frontend Developer',
    //   requiredSkills: 8,
    //   missingSkills: 4,
    //   addedCourses: 5,
    // },
    // {
    //   learningJourney: 2,
    //   role: 'Full Stack Engineer',
    //   requiredSkills: 10,
    //   missingSkills: 5,
    //   addedCourses: 2,
    // },
    // {
    //   learningJourney: 3,
    //   role: 'Software Engineer',
    //   requiredSkills: 3,
    //   missingSkills: 0,
    //   addedCourses: 1,
    // },
  // ];

  function getPositionSkills(positionID: number) {
    axios
    .get("http://localhost:5001/position_skills/" + positionID)
    .then((resp) => {
      console.log(resp.data.data)
      setCountSkills(resp.data.data.length)
      // setRequiredSkills((oldRequiredSkills) => [...oldRequiredSkills, resp.data.data]);
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("http://localhost:5007/get_learning_journey_by_staff_ID/" + staffID)
      .then(async (resp) => {
        console.log(resp.data.data);
        setLjData(resp.data.data);
        
        for (let data of resp.data.data) {
          console.log(data)
          console.log(typeof(data))
          let ljID = Object.keys(data)[0];
          let values:any = Object.values(data)[0];
          console.log(ljID);
          console.log(values.position.position_name);
          console.log(values.course.length)
          
          getPositionSkills(values.position.position_id);
          console.log(countSkills);

          let oneTableData = {
            learningJourney: Number(ljID),
            role: values.position.position_name,
            requiredSkills: 0,
            missingSkills: 0,
            addedCourses: values.course.length
          }
          setTableData((oldData) => [...oldData, oneTableData]);
          console.log(tableData);
        }

      })
      .catch((err) => console.log(err));

  }, []);

  console.log(ljData);
  console.log(tableData);


  return (
    <>
    <Row className={styles.row}>
      <Col className={styles.col}>
        <img src={glorilla_image} alt="role icon"/>
      </Col>
      <Col className={styles.col}>
        <h1 className={styles.title}>Personalise your own learning journey</h1>
        <p className={styles.quote}>“You cannot reach where you’re going if you continue to be the same person you have always been.”</p>
      </Col>
    </Row>
    <Card className={styles.card}>
      <div style={{ display: 'flex', marginTop: '2vh', marginBottom: '4vh' }}>
        <h1>My Learning Journeys</h1><Button type="primary" style={{ marginLeft: '5vh' }}>Create New</Button>
      </div>
      <Table columns={columns} dataSource={tableData} pagination={false} className={styles.table}/>
    </Card>
    </>
  );
}
