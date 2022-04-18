import React, { useState } from "react"

const Store = React.createContext()
Store.displayName = "Store"

export const useStore = () => React.useContext(Store)

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [entries, setEntries] = useState([])
  const [users, setUsers] = useState([])
  const [notification, setNotification] = useState("")
  const [style, setStyle] = useState("")

  const setMessage = (msg, type) => {
    setNotification(msg)
    setStyle(type)
    setTimeout(() =>{
      setNotification("")
      setStyle("")
    }, 5000)
  }

  return (
    <Store.Provider value={{ user, setUser, entries, setEntries, users, setUsers, notification, setMessage, style }}>{children}</Store.Provider>
  )
}