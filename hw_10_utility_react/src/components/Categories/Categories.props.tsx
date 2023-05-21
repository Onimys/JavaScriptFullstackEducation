import { QuoteCategory } from "interfaces/Quotable.interface"
import { DetailedHTMLProps, HtmlHTMLAttributes } from "react"

export interface CategoriesProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selected?: QuoteCategory[]
  setSelected?: (categories: QuoteCategory[]) => void
}
