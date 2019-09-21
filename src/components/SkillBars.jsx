import React, { Component } from 'react'

export default class SkillBars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ collapsed: false })
    }, 1000)
  }

  render() {
    const { collapsed } = this.state
    const { backgroundColor, skills } = this.props

    return (
      <section id="skills">
        <h2>Skills</h2>
        <div className={collapsed ? 'collapsed' : ''}>
          <ul className="skills">
            {skills.map((skill, index) => (
              <li
                key={skill.type}
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: backgroundColor,
                }}
              >
                <p>
                  {skill.type}
                  <span>{skill.level}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
}
