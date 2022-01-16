import { Accordion, Row, Col } from "react-bootstrap";
import { FaPenFancy } from "react-icons/fa";

function Notes({ student }) {
    return(
        <div>
            {!student.notes ? `No notes for ${student.name}` :
            <div>
                {student.notes.map((note, index) => {
                    return (
                        <Accordion key={index} className='mt-2' defaultChecked={false} flush>
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>{note.action}{note.action == 'Note' ? ` - ${note.title}` : ` - ${note.amount}`}</Accordion.Header>
                                <Accordion.Body>
                                    <p className='p-3'>{note.comment}</p>
                                    
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <h5><FaPenFancy className='me-2' /> {note.signed}</h5>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <h5>{note.date}</h5>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    )
                })}
            </div>
            }
        </div>
    );
}

export default Notes
