import React from "react"
import Alert from "react-bootstrap/Alert"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div className="notification">
      {notification &&
      <Alert  fluid="true" className="p-1" variant={notification.style}>
        {notification.msg}
      </Alert>}
    </div>
  )
}
export default Notification