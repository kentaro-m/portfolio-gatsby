import React from 'react'
import '../assets/scss/main.scss'

type TemplateProps = {
  children: JSX.Element[]
}

const Template: React.FC<TemplateProps> = ({ children }) => (
  <div>{children}</div>
)

export default Template
