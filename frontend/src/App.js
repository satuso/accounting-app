import React, { useEffect }  from "react"
import Header from "./components/Header"
import Home from "./components/Home"
import NewEntryForm from "./components/NewEntryForm"
import { Routes, Route } from "react-router-dom"
import Entries from "./components/Entries"
import Login from "./components/Login"
import Profile from "./components/Profile"
import RegisterForm from "./components/RegisterForm"
import { useStore } from "./store"
import entryService from "./services/entries"
import usersService from "./services/users"
import NewInvoiceForm from "./components/NewInvoiceForm"
import Notification from "./components/Notification"

const App = () => {
  const { setUser, setEntries, setUsers } = useStore()

  useEffect(() => {
    entryService.getAll().then(entries =>
      setEntries(entries)
    )
  }, [])

  useEffect(() => {
    usersService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      entryService.setToken(user.token)
    }
  }, [])

  return (
    <>
      <Header />
      <Notification />
      <Routes>
        <Route path="/new-entry" element={<NewEntryForm />}></Route>
        <Route path="/entries" element={<Entries />}></Route>
        <Route path="/invoice" element={<NewInvoiceForm />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App