import React from 'react'
import { createDateFormat } from '../lib/utils'

const Slides = ({ items, user }) => {
  const slides = items.map(item => {
    const { pubDate, guid, link, thumbnail, title } = item
    const createdAt = createDateFormat(pubDate, 'YYYY-MM-DD')

    return (
      <article className="4u 12u$(xsmall) work-item" key={guid}>
        <a href={link} className="image fit thumb">
          <img src={thumbnail} alt="" />
        </a>
        <a href={link} className="slide-title">
          <h3>{title}</h3>
        </a>
        <p>{createdAt}</p>
      </article>
    )
  })

  return (
    <section id="slides">
      <h2>Slides</h2>
      <div className="row">{slides}</div>
      <ul className="actions">
        <li>
          <a
            href={`https://speakerdeck.com/${user}`}
            className="button"
          >
            Show More Slides
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Slides
