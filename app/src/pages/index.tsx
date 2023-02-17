import Head from "next/head"
import styles from "@/styles/Home.module.css"

export default function Home() {
  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy Bank Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/piggy-bank.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>{"Home Page <3"}</div>
      </main>
    </>
  )
}
