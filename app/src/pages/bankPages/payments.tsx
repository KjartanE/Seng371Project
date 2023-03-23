import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useAuth } from "../../context/UserContext"
import { Button, Box, Grid } from "@mui/material"
import { useRouter } from "next/router"
import { color } from "@mui/system"
import { useState } from "react"
import React from "react"
import Accounts from "@/components/main/payments"

export default function Main() {
  const userContext = useAuth()
  const router = useRouter()

  const user = userContext.currentUser()

  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy Bank bank account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/piggy-bank.ico" />
      </Head>
      <main className={styles.accountPage}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: 1,
            height: "40%",
            position: "top",
          }}
        >
          <Grid container spacing={2} sx={{ paddingTop: "35px" }}>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  router.push("/main")
                }}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={12}>
              <div className={styles.description}>
                Welcome {user?.username || ""}, here are your recent and recurring payments
              </div>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            height: "60%",
            width: 1,
            paddingTop: "25px",
            paddingLeft: "25px",
            paddingRight: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            sx={{ justifyContent: "flex-start", width: "60%", height: 1 }}
          >
            <Grid item xs={4} sx={{ height: "33%" }}>
              <Accounts />
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  )
}
