import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useAuth } from "../../context/UserContext"
import { useAcc } from "@/context/AccountContext"
import { Button, Box, Grid, Modal, Typography, TextField} from '@mui/material';
import { useRouter } from "next/router"
import { color } from "@mui/system";
import { useState } from "react";
import React from "react";


export default function Main() {
  const userContext = useAuth()
  const router = useRouter()
  const accountContext = useAcc()
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = userContext.currentUser()
  // console.log('userContext', userContext);
  // console.log('userContext.currentUser()', userContext.currentUser());
  const account = accountContext.currentAccount()

  const [checking, setChecking] = useState<number | undefined>(account?.checking)
  const [savings, setSavings] = useState<number | undefined>(account?.savings)
  console.log(account?.checking, account?.savings)
  console.log(checking, savings);

  const [inputValue, setInputValue] = useState(0);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleChequing = () => {
    // Do something with the input value here
    console.log('Input value:', inputValue);
    setChecking(inputValue)
    handleClose();
  };
  const handleSaving = () => {
    // Do something with the input value here
    console.log('Input value:', inputValue);
    setSavings(inputValue)
    handleClose();
  };

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
                <Box sx = {{ fontSize: 40, paddingRight: '25px', color: 'primary.main' }}>{checking || ""}</Box>
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
                  }}>{savings || ""}</Box>
              </Box>

            <Grid item xs= {4} sx = {{height: '50%'}}>
              <Box sx = {{paddingTop: '25px'}}>
                <Button variant="contained" color="primary" sx={{ padding: '15px'}} onClick={handleOpen}>
                  Transfer Between Accounts
                </Button> 
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description">
                <Box sx = {{  position: 'absolute' as 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: 400,
                              bgcolor: 'background.paper',
                              border: '2px solid #000',
                              boxShadow: 24,
                              alignItems: 'center', justifyContent: 'space-between',
                              p: 4,}}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Funds
                  </Typography>
                  <TextField
                    type="number"
                    label="Input Field"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <Button variant="contained" color="primary" sx={{ padding: '5px'}} onClick={handleChequing}>Chequings</Button>
                  <Button variant="contained" color="primary" sx={{ padding: '5px'}} onClick={handleSaving}>Savings</Button>
                </Box>
              </Modal>
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
