import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap"

function Actions({ action, setActions, student }) {
    const [form, setForm] = useState({
        name: student.name,
        action: 'Positive',
        title: '',
        amount: 1,
        comment: '',
        signed: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(
            '../api/students',
            {
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        );
        console.log(new Date().getMonth());
    }

    return (
        <Modal show={action} onHide={() => setActions(!action)}>
            <Modal.Header closeButton closeLabel="Close">
                <h5>Give {student.name} student behaviour points.</h5>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col className='col-sm-12 col-md-6 mb-3'>
                            <Form.Label>Action</Form.Label>
                            <Form.Select value={form.action} onChange={(e) => setForm({...form, action: e.target.value})} required>
                                <option>Positive</option>
                                <option>Negative</option>
                                <option>Note</option>
                            </Form.Select>
                        </Col>
                        <Col className='col-sm-12 col-md-6 mb-3'>
                            {form.action === 'Note' ?
                            <>
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} type='input' placeholder='Enter title..' />

                            </>
                            :
                            <>
                                <Form.Label>Amount</Form.Label>
                                <Form.Select value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} required>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Select>
                            </>
                            }
                        </Col>
                    </Row>

                    {form.action === 'Positive' || form.action === 'Negative' ? '' :
                    <>
                        <FloatingLabel className='mb-3' label='Leave a comment here'>
                            <Form.Control value={form.comment} onChange={(e) => setForm({...form, comment: e.target.value})} as='textarea' style={{ height: '250px' }} required />
                        </FloatingLabel>

                        <FloatingLabel className='mb-3' label='Signed by:'>
                            <Form.Control value={form.signed} onChange={(e) => setForm({...form, signed: e.target.value})} type='input' required />
                        </FloatingLabel>
                    </>
                    }
                    

                    <Button className='me-3' variant="secondary" onClick={() => setActions(!action)}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default Actions
