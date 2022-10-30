import { Row, Col, Table, Card, Button, Typography, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';
import glorilla_image from "../assets/glorilla_image.png";
import styles from "../styles/Home.module.css";
import DeleteLJBtn from "../components/DeleteLearningJourney"
import { useEffect, useState } from "react";

interface DataType {
  key: number;
  learningJourney: number;
  role: String;
  roleStatus: String;
  requiredSkills: number;
  missingSkills: number;
  addedCourses: number;
  editAction: String;
  deleteAction: number;
}

export default function Home() {

  const [staffID] = useState(1);
  const [ljData, setLjData] = useState();
  const [tableData, setTableData] = useState<DataType[]>([]);

  const { Text } = Typography;

  const columns: ColumnsType<DataType> = [
    {
      title: 'Learning Journey',
      dataIndex: 'learningJourney',
      key: 'learningJourney',
      width: '10%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
    },
    {
      title: 'Role Status',
      dataIndex: 'roleStatus',
      key: 'roleStatus',
      render: (status) => status === "Active" ? <Tag color="green">{status}</Tag> : <Tag color="red">{status}</Tag> 
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
      dataIndex: 'editAction',
      key: 'editAction',
      render: (status) => status === "Active" ? (
        <Button>
          Edit
        </Button>
      ) : null,
    },
    {
      title: '',
      dataIndex: 'deleteAction',
      key: 'deleteAction',
      render: (jsonForLJ) => (
        <DeleteLJBtn lj={jsonForLJ}></DeleteLJBtn>
      ),
    },
  ];

  useEffect(() => {
    const loadAsync = async () => {
      try {
        const responseForLJ = await fetch("http://localhost:5000/learning_journeys/" + staffID + "/learning_journeys");
        const jsonForLJ = await responseForLJ.json();
        console.log(jsonForLJ);
        setLjData(jsonForLJ.data);

        var tableDataArr: any = [];

        for (let [key, val] of Object.entries(jsonForLJ.data)) {
            console.log(key + " " + val);
            let ljID = key;
            let values:any = val;
            
            const responseForPS = await fetch("http://localhost:5000/positions/" +  values.position.position_id + "/skills");
            const jsonForPS = await responseForPS.json();
            console.log(jsonForPS.data);
            let uniquePositionSkills = [];
            for (let data of jsonForPS.data) {
              uniquePositionSkills.push(data.skill_id);
            }
            // console.log(uniquePositionSkills);

            const responseForStaffSkills = await fetch("http://localhost:5000/staff/" + staffID + "/skills");
            const jsonForStaffSkills = await responseForStaffSkills.json();
            console.log(jsonForStaffSkills.data);
            let uniqueStaffSkills = [];
            for (let data of jsonForStaffSkills.data) {
              uniqueStaffSkills.push(data.skill_id);
            }
            // console.log(uniqueStaffSkills);

            let countMissingSkills = 0;
            for (let skill of uniquePositionSkills) {
              console.log(skill)
              if (!uniqueStaffSkills.includes(skill)) {
                countMissingSkills++;
              }
            }
    
            let oneTableData = {
              key: Number(ljID),
              learningJourney: Number(ljID),
              role: values.position.position_name,
              roleStatus: values.position.position_status,
              requiredSkills: jsonForPS.data.length,
              missingSkills: countMissingSkills,
              addedCourses: values.course.length,
              editAction: values.position.position_status,
              deleteAction: [ Number(ljID), jsonForLJ.data[ljID] ]
            }
            tableDataArr.push(oneTableData);
        }
        // console.log(tableDataArr);
        setTableData(tableDataArr);
        // console.log(tableData);

      } catch (error) {
        console.log(error);
      } 
    };
    loadAsync();
  }, []);

  // console.log(ljData);
  // console.log(tableData);
    
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