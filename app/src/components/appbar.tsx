import { useAuth } from "@/context/UserContext"
import { Box } from "@mui/system"

export default function Appbar() {
  const userContext = useAuth()

  const user = userContext.currentUser()
  console.log("user", user)

  return <Box>display User App details</Box>
}
