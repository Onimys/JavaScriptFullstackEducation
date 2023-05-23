import { DetailedHTMLProps, HtmlHTMLAttributes } from "react"
import { Quote } from "interfaces/Quotable.interface"
import exp from "constants"

export interface QuoteCardProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  quote: Quote
  loading?: boolean
}
