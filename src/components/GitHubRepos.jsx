import React from 'react'
import Emoji from 'react-emoji-render'

const GitHubRepos = ({ repos, user }) => {
  const items = repos.map(repo => {
    const { id, url, name, description } = repo.node
    return (
      <li key={id}>
        <a href={url}>
          {name}
        </a>
        <br />
        <span>
          <Emoji text={description} />
        </span>
      </li>
    )
  })

  return (
    <section id="github">
      <h2>GitHub</h2>
      <ul className="alt">{items}</ul>
      <ul className="actions">
        <li>
          <a
            href={`https://github.com/${user}`}
            className="button"
          >
            Show More Items
          </a>
        </li>
      </ul>
    </section>
  )
}

export default GitHubRepos
