import { Button } from "@mui/material"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import * as React from "react"

const NavBar: NextPage = () => {
  const router = useRouter()

  return (
    <>
      Nav Bar
      <Button onClick={() => router.push("/account/login")}>Login</Button>
      <Button onClick={() => router.push("/account/signup")}>Signup</Button>
    </>
  )
}

export default NavBar
