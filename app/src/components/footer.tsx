import { Box } from "@mui/system"
import type { NextPage } from "next"

const useStyles = {
  footer: {
    backgroundColor: "primary.main",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
  },
}

const Footer: NextPage = () => {
  return (
    <Box p={4} sx={useStyles.footer}>
      Created by: Group #13 | Kjartan Einarsson V00885049 | Amy Finck V00878512
      | Charlie Wager V00959352 | Connor Newbery V00921506 | Connor Newbery
      V00921506
    </Box>
  )
}

export default Footer
