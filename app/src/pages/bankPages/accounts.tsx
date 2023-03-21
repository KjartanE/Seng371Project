import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useAuth } from "../../context/UserContext"
import { useAcc } from "@/context/AccountContext"
import { Button, Box, Grid} from '@mui/material';
import { useRouter } from "next/router"
import { color } from "@mui/system";


export default function Main() {
  const userContext = useAuth()
  const router = useRouter()
  const accountContext = useAcc()

  const user = userContext.currentUser()
  // console.log('userContext', userContext);
  // console.log('userContext.currentUser()', userContext.currentUser());
  const account = accountContext.currentAccount()

  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy Bank bank account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/piggy-bank.ico" />
      </Head>
      <main className={styles.accountPage}>
        <Box sx = {{backgroundColor: 'primary.main', width: 1, height: '40%', position: 'top'}}>
          <Grid container spacing = {2} sx = {{paddingTop: '25px'}}>
            <Grid item xs ={2}>
              <Button variant="contained" color = 'secondary' onClick={() => {
                router.push("/main")
              }}>Back</Button>
            </Grid>
            <Grid item xs ={12}>
              <div className={styles.description}>
                Welcome {user?.username || ""}, here are your account balances
              </div>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx = {{
          height: '60%', 
          width: 1, 
          paddingTop: '25px',
          paddingLeft: '25px',
          paddingRight: '25px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          <Grid container spacing = {2} direction = 'column' sx = {{justifyContent: 'center',width: '60%', height: 1}}>
            <Grid item xs= {4} sx = {{height: '50%'}}>
              <Box sx = {{
                bgcolor: '#ffffff', 
                color: "#000000", 
                borderRadius: 2, 
                height: 1, 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: 25
              }}>
                <Box sx = {{ paddingLeft: '25px' }}>Chequing: </Box>
                <Box sx = {{ fontSize: 40, paddingRight: '25px', color: 'primary.main' }}>{account?.checking || ""}</Box>
              </Box>
            </Grid>
            <Grid item xs= {4} sx = {{height: '50%'}}>
              <Box sx = {{
                bgcolor: '#ffffff', 
                color: "#000000", 
                borderRadius: 2, 
                height: 1, 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: 25
              }}>
                  <Box sx = {{
                  paddingLeft: '25px'
                  }}>Savings: </Box>

                  <Box sx = {{
                  fontSize: 40,
                  paddingRight: '25px',
                  color: 'primary.main'
                  }}>{account?.savings || ""}</Box>
              </Box>

            <Grid item xs= {4} sx = {{height: '50%'}}>
              <Box sx = {{paddingTop: '25px'}}>
                <Button variant="contained" color="primary" sx={{ padding: '15px'}} >
                  Transfer Between Accounts
                </Button> 
              </Box>
            </Grid>

            </Grid>
          </Grid>
          <Box sx = {{
            bgcolor: '#ffffff', 
            color: "#000000", 
            borderRadius: 2, 
            width: '35%', 
            height: '80%', 
            padding: '15px',
            fontSize: '25'
          }}>
            Budget info
          </Box>
        </Box>
      </main>
    </>
  )
}
