import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import usersService from "../services/users"
import entryService from "../services/entries"
import EditProfileForm from "./EditProfileForm"

const Profile = ({ user, setUser, entries }) => {
  const [show, setShow] = useState(false)

  const navigate = useNavigate()

  const entriesByUser = entries?.filter(entry => entry.user.id === user?.id)

  const deleteUser = async (id) => {
    if (window.confirm("Haluatko varmasti poistaa tunnuksen?")){
      try {
        entriesByUser.map(entry => deleteEntry(entry.id, entry.id, user))
        await usersService.remove(id)
        window.localStorage.removeItem("loggedInUser")
        setUser(null)
        navigate("/")
        //setMessage("Tunnus poistettu", "success")
      } catch (exception) {
        //setMessage("Tunnuksen poistaminen epäonnistui", "danger")
      }
    }
  }

  const deleteEntry = async (id, entry, user) => {
    await entryService.remove(id, entry.id, user)
  }

  if (!user || !entries) return null
  return (
    <main className="form">
      <Card>
        <Card.Body>
          <Card.Title>Omat tiedot</Card.Title>
          <div className="invoice-address">
            <span>Yrityksen nimi: <b>{user.name}</b></span>
            <span>Osoite: {user.address} {user.postalCode} {user.city}</span>
            <span>Y-tunnus: {user.businessId}</span>
            <span>ALV-tunnus: {user.vatId}</span>
            <span>Sähköposti: {user.email}</span>
            <span>IBAN-tilinumero: {user.iban}</span>
            <span>Pankin BIC-tunnus: {user.bic}</span>
          </div>
          <Button variant="warning" onClick={() => setShow((!show))}>Muokkaa</Button> <Button variant="danger" onClick={() => deleteUser(user.id)}>Poista tunnus</Button>
        </Card.Body>
      </Card>
      {show && <EditProfileForm show={show} setShow={setShow} user={user} setUser={setUser}/>}
    </main>
  )
}

export default Profile