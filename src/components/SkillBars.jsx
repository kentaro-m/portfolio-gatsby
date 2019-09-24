import React, { useState, useEffect } from 'react'

const SkillBars = ({ backgroundColor, skills }) => {
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCollapsed(false)
    }, 100);
    return () => clearTimeout(timer);
  }, [])

  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className={collapsed ? 'collapsed' : ''}>
        <ul className="skills">
          {skills.map((skill) => (
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

export default SkillBars