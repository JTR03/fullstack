import React from 'react'

const Notify = ({error}) => {
  return (
    <div style={{color: 'red'}}>
      <p>{error}</p>
    </div>
  )
}

export default Notify
