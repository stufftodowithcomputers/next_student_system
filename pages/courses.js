import { getSession } from "next-auth/react";
import { Container } from "react-bootstrap";
import { getStudentData } from "../utils/database/students";
import Courses from "../utils/components/student/Courses";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const student = await getStudentData(session.id);

    return {
        props: {
            session: await getSession(context),
            student: student,
        }
    }
}
function courses({ session, student }) {
    return (
        <Container>
            {session ? 
            <>
                <h1 className="mt-3 mb-5">Courses:</h1>

                <Courses student={student[0]}  />

            </> : 
            <>
                You are not allowed here!
            </>}

        </Container>
    )
}

export default courses
