import React from "react"
import Alert from "react-bootstrap/Alert"

const Notification = () => {
  const notification = ""
  const style= ""
  return (
    <div className="notification">
      {notification && 
      <Alert  fluid="true" className="p-1" variant={style}>
        {notification}
      </Alert>}
    </div>
  )
}
export default Notification