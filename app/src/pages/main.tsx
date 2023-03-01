import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useAuth } from "../context/UserContext"

export default function Main() {
  const userContext = useAuth()

  const user = userContext.currentUser()
  console.log('userContext', userContext);
  console.log('userContext.currentUser()', userContext.currentUser());


  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy Bank Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/piggy-bank.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>Welcome {user?.username || ""}</div>
      </main>
    </>
  )
}
