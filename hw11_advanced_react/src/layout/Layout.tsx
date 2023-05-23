import { FunctionComponent, ReactNode, useState } from "react"
import styles from "./Layout.module.scss"
import { Header } from "./Header/Header"
import { IUserContext, userContext } from "helpers/context"

export interface LayoutProps {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [user] = useState<IUserContext>({ user: { name: "Сергей Поздняков" }, isAuth: true })

  return (
    <userContext.Provider value={user}>
      <div className={styles.wrapper}>
        <Header className={styles.header} />
        <div className={styles.body}>{children}</div>
      </div>
    </userContext.Provider>
  )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}
