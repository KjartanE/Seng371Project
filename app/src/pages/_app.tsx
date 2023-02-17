import { AuthProvider } from "@/context/UserContext"
import "@/styles/globals.css"
import { ThemeProvider } from "@mui/system"
import type { AppProps } from "next/app"
import Layout from "./layout/layout"
import { theme } from "@/styles/appTheme"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}
