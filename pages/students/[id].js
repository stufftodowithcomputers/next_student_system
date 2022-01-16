import Head from "next/head";
import { Container } from "react-bootstrap";
import { getAllStudentsIds, getStudentData } from "../../utils/database/students"
import Info from "../../utils/components/student/Info";
import Behaviour from "../../utils/components/student/Behaviour";
import Notes from "../../utils/components/student/Note";
import Actions from "../../utils/components/student/Actions";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Courses from "../../utils/components/student/Courses";

export async function getStaticProps({ params }) {
    const student = await getStudentData(params.id);

    return {
        props: {
            student
        }
    }
}

export async function getStaticPaths() {
    const paths = await getAllStudentsIds();

    return {
        paths,
        fallback: true,
    }

}

function Information({ student }) {
    const [action, setActions] = useState(false);
    const { data: session } = useSession();

    if(!session) {
        return (
            <>
                <p>You are not allowed to see this page!</p>
            </>
        )
    }
    
    return (
        <Container>
            <Head>
                <title>{student[0].name}</title>
            </Head>

            <Info action={action} setActions={setActions} student={student[0]} />

            <hr className="mt-5 mb-5" />

            <Courses student={student[0]} />

            <hr className="mt-5 mb-5" />

            <Behaviour student={student[0]} />

            <h1 className="mt-5">Notes:</h1>
            <Notes student={student[0]} />

            <Actions action={action} setActions={setActions} student={student[0]} />

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </Container>
    )
}

export default Information
