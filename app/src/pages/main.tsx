import Head from "next/head"
import { useAuth } from "../context/UserContext"
import { useAcc } from "@/context/AccountContext"
import { Button, Paper, Typography, LinearProgress } from "@mui/material"
import { useRouter } from "next/router"
import { Box, Container, height } from "@mui/system"
import { theme } from "@/styles/appTheme"
import { alpha } from "@mui/material"
import Accounts from "@/components/main/accounts"
import getTips from "@/helpers/tips"

export default function Main() {
  const userContext = useAuth()
  const accountContext = useAcc()

  const router = useRouter()

  const user = userContext.currentUser()
  const account = accountContext.currentAccount()
  const total = Number(account?.savings) + Number(account?.checking)
 


  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy Bank Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/piggy-bank.ico" />
      </Head>
      <Container maxWidth={"xl"}>
        <Paper elevation={3}>
          <Box
            px={2}
            sx={{
              flexGrow: 0,
              flexDirection: "column",
              backgroundColor: theme.palette.secondary.main,
              display: { xs: "none", md: "flex" },
              height: "40vh",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                flexDirection: "column-reverse",
                display: { xs: "none", md: "flex" },
              }}
            />
            <Typography fontSize={100} color={"white"} textAlign="left">
              <strong>Good morning {user?.username}</strong>
            </Typography>
          </Box>
        </Paper>
        <Paper elevation={1}>
          <Container maxWidth={"xl"}>
            <Box
              p={4}
              sx={{
                flexGrow: 0,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Box
                p={4}
                sx={{
                  flexGrow: 1,
                  height: "100%",
                }}
              >
                <Accounts />
              </Box>

              <Box
                p={4}
                sx={{
                  flexGrow: 1,
                  height: "100%",
                }}
              >
                <Paper elevation={1}>
                  <Box
                    p={4}
                    sx={{
                      flexGrow: 0,
                      height: "100%",
                    }}
                  >
                    {getTips(total)}
                    <LinearProgress variant = "determinate" value = {(Number(account?.budget) / 2000)*100}></LinearProgress>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Container>
    </>
  )
}
