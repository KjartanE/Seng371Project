import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useAuth } from "../../context/UserContext"
import { useAcc } from "@/context/AccountContext"
import { Button, Box, Grid, Typography } from '@mui/material';
import { useRouter } from "next/router"
import { useState } from "react";
import Accounts from "@/components/main/budgets"

export default function Main() {
  const userContext = useAuth()
  const router = useRouter()
  const accountContext = useAcc()
  const account = accountContext.currentAccount()
  const [budget, setBudget] = useState(account?.budget)
  const user = userContext.currentUser()
  // console.log('userContext', userContext);
  // console.log('userContext.currentUser()', userContext.currentUser());

  const budgetDisplay = (budget) => {
    if(budget > 0){
        return(
        <Box sx={{
          height:"100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}>
          <Typography color="#000000" fontSize="100">You have {budget} left in your budget.  Happy Savings :)</Typography>
          <Button variant="contained">Add Budget</Button>
        </Box>    

        )
    }else{
      return(
        <Box sx={{
          height:"100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}>
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
      )
    }
  }

  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy Bank bank account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/piggy-bank.ico" />
      </Head>
      <main className={styles.main}>
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
                  Welcome {user?.username || ""}, here are your budgets
                </div>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              width: 1,
              height: "60%",
              position: "top",
            }}
          >
            {budgetDisplay(budget)}
          </Box>
      </main>
    </>
  )
}
