import React, { useState } from "react"
import { Image, Typography } from "antd"
import axios from "axios"
import { withLayout } from "../layout/Layout"
import { Quote, QuoteCategory } from "interfaces/Quotable.interface"
import { QuoteCard, Search, Categories } from "components"
import styles from "./App.module.scss"

const { Title } = Typography

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<QuoteCategory[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])

  const onSearch = (query: string) => {
    setLoading(true)

    axios
      .get<Quote[]>(`${process.env.REACT_APP_API}/quotes/random`, {
        params: { tags: selectedTags.map((t) => t.slug).join("|"), query: query, limit: 5 },
      })
      .then((response) => {
        const { data: quotesData } = response
        setQuotes(quotesData)
        setLoading(false)
      })
  }

  return (
    <>
      <Search onSearch={onSearch} />
      <Categories selected={selectedTags} setSelected={setSelectedTags} />

      {quotes && quotes.map((q) => <QuoteCard key={q._id} quote={q} loading={loading} />)}
      {!quotes.length && !loading && (
        <div className={styles["empty-result-wrapper"]}>
          <Image rootClassName={styles["empty-result"]} preview={false} src="./notfound.png" alt="No search result" />
          <Title level={2} className={styles["empty-result-title"]}>
            Ничего не найдено
          </Title>
        </div>
      )}
    </>
  )
}

export default withLayout(App)
