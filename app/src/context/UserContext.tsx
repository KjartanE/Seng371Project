import { useRouter } from "next/router"
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { fetchWrapper } from "../helpers/fetch-wrapper"

const baseUrl = `/api/account`

export type authContextType = {
  user: userData | null
  login: (username: string, password: string) => any
  logout: () => void
  register: (signupDetails: userRegister) => any
  findUser: (id: number) => any
  currentUser: () => userData | undefined
}

export interface userData {
  username: string
  email: string
  id: number
}
interface userRegister {
  username: string
  email: string
  password1: string
  password2: string
}

const authContextDefaultValues: authContextType = {
  user: null,
  login: () => null,
  logout: () => {},
  register: () => null,
  findUser: () => null,
  currentUser: () => undefined,
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const router = useRouter()
  const [user, setUser] = useState<authContextType["user"]>(null)

  useEffect(() => {
    const storageUser = localStorage.getItem("user")

    if (storageUser) {
      const loadedUser: userData = JSON.parse(storageUser)

      if (loadedUser && loadedUser != undefined) {
        setUser(loadedUser)
      }
    }
  }, [])

  useEffect(() => {
    if (user !== authContextDefaultValues.user) {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])

  const login = async (username: string, password: string) => {
    console.log('password', password);
    console.log('username', username);
    const loggedUser = await fetchWrapper.post(`${baseUrl}/login`, {
      username,
      password,
    })
    
    console.log('loggedUser', loggedUser);
    if (loggedUser) {
      setUser(loggedUser)
    }

    return loggedUser
  }

  const logout = () => {
    setUser(null)
    localStorage.setItem("user", JSON.stringify(null))
    router.push("/")
  }

  const register = async (signupDetails: userRegister) => {
    console.log('signupDetails', signupDetails);
    const JSONdata = JSON.stringify({
      username: signupDetails.username,
      email: signupDetails.email,
      password: signupDetails.password1,
    })
    
    console.log('JSONdata', JSONdata);
    const response = await fetchWrapper.post(`${baseUrl}/signup`, {
      JSONdata,
    })
    
    console.log('response', response);
    if (response) {
      router.push("/account/login")
      return true
    }

    return false
  }

  const findUser = () => {}

  const currentUser = () => {
    if (user) {
      return user
    }
  }

  const value = {
    user,
    login,
    logout,
    register,
    findUser,
    currentUser,
  }

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
