import { useEffect, useState } from "react"
import { CategoriesProps } from "./Categories.props"
import styles from "./Categories.module.scss"
import cn from "classnames"
import { Space } from "antd"
import axios from "axios"
import CheckableTag from "antd/es/tag/CheckableTag"
import { QuoteCategory } from "interfaces/Quotable.interface"
import { getMultipleRandom } from "helpers/utils"

export const Categories = ({ selected, setSelected, className, ...props }: CategoriesProps) => {
  const [tags, setTags] = useState<QuoteCategory[]>([])

  useEffect(() => {
    axios.get<QuoteCategory[]>(`${process.env.REACT_APP_API}/tags`).then((response) => {
      let { data: tagsData } = response
      tagsData = getMultipleRandom(tagsData, 5)

      setTags(tagsData)
      setSelected && setSelected(tagsData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSelectTag = (tag: QuoteCategory, checked: boolean) => {
    const nextSelectedTags = checked ? [...(selected || []), tag] : (selected || []).filter((t) => t !== tag)
    setSelected && setSelected(nextSelectedTags)
  }

  return (
    <div className={cn(className, styles.select)} {...props}>
      <span style={{ marginRight: 8 }}>Tags:</span>
      <Space size={[0, 8]} wrap>
        {tags.map((tag) => (
          <CheckableTag
            key={tag._id}
            checked={selected ? selected.includes(tag) : false}
            onChange={(checked) => onSelectTag(tag, checked)}
          >
            {tag.name}
          </CheckableTag>
        ))}
      </Space>
    </div>
  )
}
