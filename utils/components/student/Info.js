import Image from "next/image"
import { Card, Col, Row } from "react-bootstrap"
import { FaBookOpen, FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa"
import Attendance from "./Attendance"

function Info({ action, setActions, student }) {
    return (
        <Row>
            <Col className='mb-3 col-sm-12 col-md-6 d-flex justify-content-center'>
                <Card className='mt-5' style={{width: '18rem'}}>
                    {student.gender === 'male' ? 
                    <Image width='400' height='400' src='/male.jpg' />
                    :
                    <Image width='400' height='400' src='/female.jpg' />}

                    <Card.Body>
                        <Card.Title>{student.name}</Card.Title>
                        <Card.Text>{student.phone}</Card.Text>
                        <Card.Text>{student.email}</Card.Text>
                        <Card.Text>{student.address}</Card.Text>
                        <Card.Text>{student.zip}, {student.region}, {student.country}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="p-3">
                        <Row>
                            <Col style={{textAlign: 'start'}}><FaRegMinusSquare onClick={() => setActions(!action)} style={{cursor: 'pointer'}} title="Add negative" /></Col>
                            <Col style={{textAlign: 'center'}}><FaBookOpen onClick={() => setActions(!action)} style={{cursor: 'pointer'}} title="Add notes" /></Col>
                            <Col style={{textAlign: 'end'}}><FaRegPlusSquare onClick={() => setActions(!action)} style={{cursor: 'pointer'}} title="Add positive" /></Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
            <Col className='col-sm-12 col-md-6 p-5 d-flex align-items-center justify-content-center'>
                <Attendance student={student} />
            </Col>
        </Row>
    )
}

export default Info
