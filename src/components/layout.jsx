import React from 'react'
import '../assets/scss/main.scss'

class Template extends React.Component {
  render() {
    const { children } = this.props

    return <div>{children}</div>
  }
}

export default Template
