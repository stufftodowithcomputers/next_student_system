import Link from "next/link";
import { FaPlus } from 'react-icons/fa';
import { ImBin } from 'react-icons/im';
import { ListGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function Courses({student }) {
    const router = useRouter();
    const { data: session } = useSession();

    const removeCourse = async (class_name) => {
        await fetch(
            '/api/course',
            {
                body: JSON.stringify({
                    name: student.name,
                    class_name: class_name,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            }
        )
        router.reload()
    }

    if(!student.courses) {
        return (
            <>
                <p className="mb-2 mt-2">There are currently no courses</p>
                {session.user.name === 'admin' ? <Link href={`/students/${student._id}/course`}><p style={{cursor: 'pointer'}} className="mb-5 d-flex align-items-center"><FaPlus className="me-2" /> Add a course</p></Link> : ''} 

            </>
        )
    }

    return (
        <>  
            {session ? 
            <>
                {session.user.name === 'admin' ? <Link href={`/students/${student._id}/course`}><p style={{cursor: 'pointer'}} className="mb-5 d-flex align-items-center"><FaPlus className="me-2" /> Add a course</p></Link> : ''} 
                
                <ListGroup>
                    {student.courses.map((course, index) => {
                        return <ListGroup.Item key={index}>
                            <p className="fs-5">{course.name}<span className="float-end text-muted">{course.room}</span></p>
                            <p className="fs-6">{course.teacher} {session.user.name === 'admin' ? <span className="float-end"><ImBin onClick={() => removeCourse(course.name)} /></span> : ''} </p>
                        </ListGroup.Item>
                    })}
                </ListGroup>
                
            </> :
            <>
                test
            </> 
            }
            
        </>
    )
}

export default Courses
