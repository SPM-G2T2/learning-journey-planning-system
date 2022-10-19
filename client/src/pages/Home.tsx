import { Row, Col, Table, Card, Button, Typography } from "antd";
import type { ColumnsType } from 'antd/es/table';
import glorilla_image from "../assets/glorilla_image.png";
import styles from "../styles/Home.module.css";

interface DataType {
  learningJourney: string;
  role: string;
  requiredSkills: number;
  missingSkills: number;
  addedCourses: number;
}

export default function Home() {

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
      width: '25%',
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
  ];
  
  const data: DataType[] = [
    {
      learningJourney: '1',
      role: 'Frontend Developer',
      requiredSkills: 8,
      missingSkills: 4,
      addedCourses: 5,
    },
    {
      learningJourney: '2',
      role: 'Full Stack Engineer',
      requiredSkills: 10,
      missingSkills: 5,
      addedCourses: 2,
    },
    {
      learningJourney: '3',
      role: 'Software Engineer',
      requiredSkills: 3,
      missingSkills: 0,
      addedCourses: 1,
    },
  ];

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
      <Table columns={columns} dataSource={data} pagination={false} className={styles.table}/>
    </Card>
    </>
  );
}
