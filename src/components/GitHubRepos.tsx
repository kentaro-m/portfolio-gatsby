import React from 'react'
import Emoji from 'react-emoji-render'

export type Repo = {
  node: {
    id: string
    url: string
    name: string
    description: string
  }
}

type GitHubReposProps = {
  repos: Repo[]
  user: string
}

const GitHubRepos: React.FC<GitHubReposProps> = ({ repos, user }) => {
  const items = repos.map(repo => {
    const { id, url, name, description } = repo.node
    return (
      <li key={id}>
        <a href={url}>{name}</a>
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
          <a href={`https://github.com/${user}`} className="button">
            Show More Items
          </a>
        </li>
      </ul>
    </section>
  )
}

export default GitHubRepos
