import { FunctionComponent, ReactNode } from "react"
import styles from "./Layout.module.scss"
import { Header } from "./Header/Header"

export interface LayoutProps {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <div className={styles.body}>{children}</div>
    </div>
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
