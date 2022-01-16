import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap"

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session);

  return (
    <Container>
      <h1 className="mt-5">Home page</h1>

      {session ? <Button className="mt-5" onClick={() => signOut()}>Log out</Button> : <Button className="mt-5" onClick={() => router.push('/api/auth/signin')}>Log in</Button> }
    </Container>
  )
}