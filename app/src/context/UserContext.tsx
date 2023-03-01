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
  currentUser: () => undefined,
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}

type Props = {
  children: ReactNode
}

/**
 * AuthProvider is the Auth Context across the application that can be accessed
 * from any level of the app.
 *
 * @export
 * @param {Props} { children }
 * @return {*}
 */
export function AuthProvider({ children }: Props) {
  const router = useRouter()

  //This setstate holds the reference of the current logged in user
  const [user, setUser] = useState<authContextType["user"]>(null)

  /**
   * This useEffect is triggered anytime the app loads
   * Which means for any reload it will check the localStorage cache to check,
   * if a user is currently logged in
   */
  useEffect(() => {
    const storageUser = localStorage.getItem("user")

    if (storageUser) {
      const loadedUser: userData = JSON.parse(storageUser)

      if (loadedUser && loadedUser != undefined) {
        setUser(loadedUser)
      }
    }
  }, [])

  /**
   * This useEffect is triggered anytime that the user state is changed
   * Which means if a user logs in then it will be cached into the webpage
   */
  useEffect(() => {
    if (user !== authContextDefaultValues.user) {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])

  /**
   * Login function for the UserContext
   *
   * @param {string} username
   * @param {string} password
   * @return {*}
   */
  const login = async (username: string, password: string) => {
    const loggedUser = await fetchWrapper.post(`${baseUrl}/login`, {
      username,
      password,
    })

    if (loggedUser) {
      setUser(loggedUser)
    }

    return loggedUser
  }

  /**
   * Logout function for the user Context
   */
  const logout = () => {
    setUser(null)
    localStorage.setItem("user", JSON.stringify(null))
    router.push("/")
  }

  /**
   * Register function
   *
   * @param {userRegister} signupDetails
   * @return {*}
   */
  const register = async (signupDetails: userRegister) => {
    const JSONdata = JSON.stringify({
      username: signupDetails.username,
      email: signupDetails.email,
      password: signupDetails.password1,
    })

    const response = await fetchWrapper.post(`${baseUrl}/signup`, {
      JSONdata,
    })

    if (response) {
      router.push("/account/login")
      return true
    }

    return false
  }

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
    currentUser,
  }

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
