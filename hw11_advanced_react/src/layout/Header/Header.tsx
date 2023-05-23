import { DetailedHTMLProps, HtmlHTMLAttributes, useContext } from "react"
import styles from "./Header.module.scss"
import { ReactComponent as Logo } from "./logo.svg"
import cn from "classnames"
import { Typography } from "antd"
import { userContext } from "helpers/context"

export type HeaderProps = DetailedHTMLProps<HtmlHTMLAttributes<HTMLHeadElement>, HTMLHeadElement>

const { Title } = Typography

// TODO - Отдельный компонент для поиска
export const Header = ({ className, ...props }: HeaderProps) => {
  const { user } = useContext(userContext)

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo width={100} height={100} />
      <Title level={3} className={styles["title"]}>
        HW_10_UTILITY_REACT
        <a href={process.env.REACT_APP_API}>{process.env.REACT_APP_API}</a>
        <div className={styles.subtitle}>
          Реализация {user.name}. Quotable is a free, open source quotations API. It was originally built as part of a
          FreeCodeCamp project. If you are interested in contributing, please check out the Contributors Guide.
        </div>
      </Title>
      <div></div>
    </header>
  )
}
