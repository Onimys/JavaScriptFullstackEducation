export interface QuoteCategory {
  _id: string
  name: string
  slug: string
  quoteCount: number

  dateAdded: string
  dateModified: string
}

export interface Quote {
  _id: string
  author: string
  authorSlug: string
  content: string
  dateAdded: string
  dateModified: string
  length: number
  tags: QuoteCategory[]
}
