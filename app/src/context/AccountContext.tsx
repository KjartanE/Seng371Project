import { useRouter } from "next/router"
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { fetchWrapper } from "../helpers/fetch-wrapper"
import { IAccount } from "@/helpers/api/account-repo"

const baseUrl = `/api/user/account`

export type accContextType = {
  account: IAccount | null
  getAccount: (accountId: number) => Promise<IAccount | undefined> | null
  currentAccount: () => IAccount | undefined
}

const accContextDefaultValues: accContextType = {
  account: null,
  getAccount: (x: any) => null,
  currentAccount: () => undefined,
}

const AccContext = createContext<accContextType>(accContextDefaultValues)

export function useAcc() {
  return useContext(AccContext)
}

export function AccProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<accContextType["account"]>(null)

  useEffect(() => {
    const getAcc = async (loginId: number) => {
      const loadedAccount = await getAccount(loginId)
      if (loadedAccount && loadedAccount != undefined) {
        setAccount(loadedAccount)
      }
      return loadedAccount
    }

    const storageUser = localStorage.getItem("user")

    if (storageUser) {
      getAcc(JSON.parse(storageUser).login_id).catch(() => {
        console.log("Error loading account")
      })
    }
  }, [])

  /**
   * This useEffect is triggered anytime that the account state is changed
   * Which means if a account logs in then it will be cached into the webpage
   */
  useEffect(() => {
    if (account !== accContextDefaultValues.account) {
      localStorage.setItem("account", JSON.stringify(account))
    }
  }, [account])

  /**
   * Login function for the UserContext
   *
   * @param {string} username
   * @param {string} password
   * @return {*}
   */
  const getAccount = async (
    accountId: number
  ): Promise<IAccount | undefined> => {
    const currentAccount = await fetchWrapper.post(`${baseUrl}/info`, {
      accountId,
    })

    if (currentAccount) {
      setAccount(currentAccount)
    }

    return currentAccount
  }

  const currentAccount = () => {
    if (account) {
      return account
    }
  }

  const value = {
    account,
    getAccount,
    currentAccount,
  }

  return (
    <>
      <AccContext.Provider value={value}>{children}</AccContext.Provider>
    </>
  )
}