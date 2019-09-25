import React from 'react'
import { createDateFormat } from '../lib/utils'

export type Post = {
  node: {
    id: string
    title: string
    created_at: string
    url: string
  }
}

type QiitaItemsProps = {
  posts: Post[]
  user: string
}

const QiitaItems: React.FC<QiitaItemsProps> = ({ posts, user }) => {
  const items = posts.map(post => {
    const { id, title, created_at, url } = post.node
    const createdAt = createDateFormat(created_at, 'YYYY-MM-DD')

    return (
      <li key={id}>
        {createdAt}
        <a className="item-title" href={url}>
          {title}
        </a>
      </li>
    )
  })

  return (
    <section id="qiita">
      <h2>Qiita</h2>
      <ul className="alt">{items}</ul>
      <ul className="actions">
        <li>
          <a href={`https://qiita.com/${user}`} className="button">
            Show More Items
          </a>
        </li>
      </ul>
    </section>
  )
}

export default QiitaItems
