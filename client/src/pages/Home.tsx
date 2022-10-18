import { Row, Col, Table, Card, Button } from "antd";
import type { ColumnsType } from 'antd/es/table';
import glorilla_image from "../assets/glorilla_image.png";
import styles from "../styles/Home.module.css";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default function Home() {

  const columns: ColumnsType<DataType> = [
    {
      title: 'Learning Journey',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Number of skills required',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Number of missing skills',
      dataIndex: 'tags',
      key: 'tags',
    },
    {
      title: 'Number of courses added',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
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
      <div style={{ display: 'flex', marginTop: '2vh', marginBottom: '5vh' }}>
        <h1>My Learning Journeys</h1><Button type="primary" style={{ marginLeft: '3vh' }}>Create New</Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} className={styles.table}/>
    </Card>
    </>
  );
}
