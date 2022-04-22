import React, { useState, useEffect }  from "react"
import Header from "./components/Header"
import Home from "./components/Home"
import NewEntryForm from "./components/NewEntryForm"
import { Routes, Route } from "react-router-dom"
import Entries from "./components/Entries"
import Login from "./components/Login"
import Profile from "./components/Profile"
import RegisterForm from "./components/RegisterForm"
import entryService from "./services/entries"
import NewInvoiceForm from "./components/NewInvoiceForm"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { initializeEntries } from "./reducers/entryReducer"
import { initializeUsers } from "./reducers/userReducer"

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const entries = useSelector(state => state.entries)
  let entriesCopy = [...entries]

  const users = useSelector(state => state.users)
  let usersCopy = [...users]

  useEffect(() => {
    dispatch(initializeEntries())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser")
    if (loggedUserJSON) {
      const loggedInUser = JSON.parse(loggedUserJSON)
      entryService.setToken(loggedInUser.token)
      setUser(loggedInUser)
    }
  }, [])

  return (
    <>
      <Header user={user} setUser={setUser}/>
      <Notification />
      <Routes>
        <Route path="/new-entry" element={<NewEntryForm user={user}/>}></Route>
        <Route path="/entries" element={<Entries user={user} users={usersCopy} entries={entriesCopy}/>}></Route>
        <Route path="/invoice" element={<NewInvoiceForm user={user} />}></Route>
        <Route path="/profile" element={<Profile entries={entriesCopy} setUser={setUser} user={user} />}></Route>
        <Route path="/register" element={<RegisterForm user={user} users={usersCopy} setUser={setUser}/>}></Route>
        <Route path="/login" element={<Login user={user} setUser={setUser}/>}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App