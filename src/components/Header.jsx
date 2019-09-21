import React from 'react'
import Img from "gatsby-image"
import { graphql, useStaticQuery } from 'gatsby'

const Header = ({ user }) => {
  const data = useStaticQuery(graphql`
  {
    avatar: file(relativePath: { eq: "avatar.jpeg" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
  `)

  return (
    <header id="header">
      <div className="inner">
        <a href="/" className="image avatar">
          <Img fixed={data.avatar.childImageSharp.fixed} />
        </a>
        <h1>
          <strong>Kentaro Matsushita</strong>{' '}
          <p>Frontend Developer at DMM GAMES.</p>
          <p>Happy coding everyday!</p>
        </h1>
      </div>
      <div id="footer">
        <div className="inner">
          <ul className="icons">
            <li>
              <a
                href={`https://twitter.com/${user.twitter}`}
                className="icon fa-twitter"
              >
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a
                href={`https://github.com/${user.github}`}
                className="icon fa-github"
              >
                <span className="label">Github</span>
              </a>
            </li>
            <li>
              <a
                href={`https://www.facebook.com/${user.facebook}`}
                className="icon fa-facebook"
              >
                <span className="label">Facebook</span>
              </a>
            </li>
            <li>
              <a
                href={`https://www.linkedin.com/in/${user.linkedin}`}
                className="icon fa-linkedin"
              >
                <span className="label">LinkedIn</span>
              </a>
            </li>
          </ul>
          <ul className="copyright">
            <li>&copy; 2018 {user.name}</li>
            <li>
              Design: <a href="http://html5up.net">HTML5 UP</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
