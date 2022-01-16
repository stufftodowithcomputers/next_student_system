import { useSession } from "next-auth/react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
    const { data: session } = useSession();

    return (
    <Navbar className="p-3" bg='light' expand='lg'>
        <Container>
            <Navbar.Brand href='/'>Student system</Navbar.Brand>

            <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id='navbar'>
                <Nav className="ms-auto">
                    <Nav.Link href='/'>Home</Nav.Link>
                    {!session ?
                        <>
                            <Nav.Link href='/api/auth/signin'>Sign in</Nav.Link>
                            <Nav.Link href='/api/auth/signup'>Sign up</Nav.Link>
                        </> : 
                        <>
                            {session.user.name === 'admin' ? 
                            <>
                                <Nav.Link href='/students'>Students</Nav.Link>
                            </> : 
                            <>
                                <Nav.Link href='/courses'>Courses</Nav.Link>
                                <Nav.Link href='/notes'>Notes</Nav.Link>
                                <Nav.Link href='/behaviour'>Behaviour</Nav.Link>
                            </>
                            }
                        </> 
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}