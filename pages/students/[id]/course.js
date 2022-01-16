import { getSession } from "next-auth/react";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { getStudentData } from "../../../utils/database/students";

export async function getServerSideProps(context) {
    const { id } = context.query;

    return {
        props: {
            session: await getSession(context),
            student: await getStudentData(id),
        }
    }
}

function Course(props) {
    const { session, student } = props;
    const [ form, setForm ] = useState({
        student: student[0].name,
        name: '',
        teacher: '',
        room: '',
    })

    const resetForm = () => {
        setForm({
            id: student[0].name,
            name: '',
            teacher: '',
            room: '',
        })
    }

    const submitForm = async (e) => {
        await fetch(
            '/api/course',
            {
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        );

        resetForm();
    }

    if(session.user.name !== 'admin') {
        return (
            <>
                Tut, tut. You shouldnt be here.
            </>
        )
    }

    return (
        <Container>
            <h1 className="fs-3 mt-5">Add a course for {student[0].name}</h1>

            <Form onSubmit={submitForm} className="mt-5 mb-2">
                <Form.Label>Class name</Form.Label>
                <Form.Control className="mb-3" type='text' value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Class.." required />
                
                <Form.Label>Class room</Form.Label>
                <Form.Control className="mb-3" type='text' value={form.room} onChange={(e) => setForm({...form, room: e.target.value})} placeholder="Room.." required/>

                <Form.Label>Teacher name</Form.Label>
                <Form.Control className="mb-3" type='text' value={form.teacher} onChange={(e) => setForm({...form, teacher: e.target.value})} placeholder="Teacher.."  required/>

                <Button className="me-5" type="button" variant="danger" onClick={resetForm}>Cancel</Button>
                <Button type="submit" variant="success">Continue</Button>

            </Form>
        </Container>
    )
}

export default Course
