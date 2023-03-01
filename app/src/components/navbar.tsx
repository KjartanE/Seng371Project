import { useAuth } from "@/context/UserContext"
import { Button } from "@mui/material"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import * as React from "react"

const NavBar: NextPage = () => {
  const router = useRouter()
  const userContext = useAuth()
  const user = userContext.currentUser()
  return (
    <>
      Nav Bar
      {!user && (
        <>
          <Button onClick={() => router.push("/account/login")}>Login</Button>
          <Button onClick={() => router.push("/account/signup")}>Signup</Button>
        </>
      )}
      {user && user.username && (
        <Button onClick={() => userContext.logout()}>Logout</Button>
      )}
    </>
  )
}

export default NavBar
