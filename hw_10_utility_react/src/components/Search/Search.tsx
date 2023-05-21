import { SearchProps } from "./Search.props"
import styles from "./Search.module.scss"
import cn from "classnames"
import { useState } from "react"
import { SearchOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"

export const Search = ({ onSearch, className, ...props }: SearchProps) => {
  const [value, setValue] = useState<string>("")

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      onSearch(value)
    }
  }

  const handleClick = () => {
    onSearch(value)
  }

  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        className={styles.input}
        placeholder="Какую цитату ищем?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleEnter}
      />
      <Button type="primary" icon={<SearchOutlined />} onClick={handleClick} className={styles.button}>
        Найти
      </Button>
    </div>
  )
}
