import React from "react"
import Alert from "react-bootstrap/Alert"
import { useStore } from "../store"

const Notification = () => {
  const { notification, style } = useStore()
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