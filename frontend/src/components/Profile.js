import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import usersService from "../services/users"
import entryService from "../services/entries"
import EditProfileForm from "./EditProfileForm"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const Profile = ({ user, setUser, entries }) => {
  const [show, setShow] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const entriesByUser = entries?.filter(entry => entry.user.id === user?.id)

  const deleteUser = async (id) => {
    if (window.confirm("Haluatko varmasti poistaa tunnuksen?")){
      try {
        entriesByUser.map(entry => deleteEntry(entry.id, entry.id, user))
        await usersService.remove(id)
        window.localStorage.removeItem("loggedInUser")
        setUser(null)
        navigate("/")
        dispatch(setNotification("Tunnus poistettu", "success"))
      } catch (exception) {
        dispatch(setNotification("Tunnuksen poistaminen epäonnistui", "danger"))
      }
    }
  }

  const deleteEntry = async (id, entry, user) => {
    await entryService.remove(id, entry.id, user)
  }

  if (!user || !entries) return null
  return (
    <main>
      <h2>Omat tiedot</h2>
      <hr/>
      <p>Lisää yrityksen tiedot jotta ne näkyvät laskuissa.</p>
      <div className="invoice-address">
        <span>Sähköposti: {user.email}</span>
        <span>Yrityksen nimi: <b>{user.name}</b></span>
        <span>Osoite: {user.address} {user.postalCode} {user.city}</span>
        <span>Y-tunnus: {user.businessId}</span>
        <span>ALV-tunnus: {user.vatId}</span>
        <span>IBAN-tilinumero: {user.iban}</span>
        <span>Pankin BIC-tunnus: {user.bic}</span>
      </div>
      <Button variant="warning" onClick={() => setShow((!show))}>Muokkaa</Button> <Button variant="danger" onClick={() => deleteUser(user.id)}>Poista tunnus</Button>
      {show && <EditProfileForm setShow={setShow} user={user} setUser={setUser}/>}
    </main>
  )
}

export default Profile