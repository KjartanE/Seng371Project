import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useAuth } from "../../context/UserContext"
import { Button, Box, Grid, LinearProgress, CircularProgress, Typography, linearProgressClasses } from "@mui/material"
import { useRouter } from "next/router"
import { color, styled } from "@mui/system"
import { useState } from "react"
import React from "react"
import Accounts from "@/components/main/accounts"
import getTips from "@/helpers/tips"
import { useAcc } from "@/context/AccountContext"


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginTop: '15px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function Main() {
  const userContext = useAuth()
  const router = useRouter()
  const accountContext = useAcc()


  const user = userContext.currentUser()
  const account = accountContext.currentAccount()

  const total = Number(account?.savings) + Number(account?.checking)


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
                Welcome {user?.username || ""}, here are your account balances
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
          <Box
            sx={{
              bgcolor: "#ffffff",
              color: "#000000",
              borderRadius: 2,
              width: "35%",
              height: "80%",
              padding: "15px",
              fontSize: "25",
            }}
          >
            <Button onClick={() => router.push("/bankPages/budgets")}>
              Budget info
            </Button>
            <Box
                    p={4}
                    sx={{
                      flexGrow: 5,
                      height: "100%",
                    }}
                  >
                    {getTips(total)}
                    <Typography fontSize={20} color={"1a90ff"} textAlign="center" sx={{paddingTop:'25px'}}>
                    You have {Math.round((Number(account?.budget) / 2000)*100)}% (${(Number(account?.budget) )}) left in your budget for this month!
                   </Typography>
                    <BorderLinearProgress variant = "determinate" value = {Math.round((Number(account?.budget) / 2000)*100) }></BorderLinearProgress>
                    <Typography fontSize={20} color={"1a90ff"} textAlign="center" sx={{paddingTop:'25px'}}>
                    You have spent ${(2000 - Number(account?.budget) )}
                   </Typography>
                  </Box>
          </Box>
        </Box>
      </main>
    </>
  )
}
