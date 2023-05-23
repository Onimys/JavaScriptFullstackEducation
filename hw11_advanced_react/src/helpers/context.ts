import { User } from "interfaces/User.interface"
import { createContext } from "react"

export interface IUserContext {
  user: User
  isAuth: boolean
}

export const userContext = createContext<IUserContext>({
  user: {
    name: "undefined",
  },
  isAuth: false,
})
