import React from 'react'
import { connect } from 'react-redux'

const Home = (props) => {
  const { firstName } = props.currentUser
  return (
    <div>
      <h1>Welcome {firstName}!</h1>
      <h2>Onboarding</h2>
    </div>
  )
}
const mapState = ({ currentUser }) => ({ currentUser })

export default connect(mapState)(Home)
