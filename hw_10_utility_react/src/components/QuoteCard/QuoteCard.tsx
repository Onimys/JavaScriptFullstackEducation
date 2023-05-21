import { Card, Skeleton } from "antd"
import cn from "classnames"
import styles from "./QuoteCard.module.scss"
import { QuoteCardProps } from "./QuoteCard.props"

const { Meta } = Card

export const QuoteCard = ({ quote, loading, className }: QuoteCardProps) => {
  return (
    <Card className={cn(className, styles.card)}>
      <Skeleton loading={loading} paragraph={{ rows: 1 }} active>
        <Meta title={quote.content} description={`${quote.author}. Tags: ${quote.tags}`} />
      </Skeleton>
    </Card>
  )
}
