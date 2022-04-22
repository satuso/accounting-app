import React, { useState } from "react"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import usersService from "../services/users"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const EditProfileForm = ({ setShow, user, setUser }) => {
  const [email, setEmail] = useState(user.email) 
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [name, setName] = useState(user.name)
  const [businessId, setBusinessId] = useState(user.businessId) 
  const [vatId, setVatId] = useState(user.vatId) 
  const [address, setAddress] = useState(user.address)
  const [postalCode, setPostalCode] = useState(user.postalCode)
  const [city, setCity] = useState(user.city)
  const [iban, setIban] = useState(user.iban)
  const [bic, setBic] = useState(user.bic)

  const dispatch = useDispatch()

  const editProfile = async (e) => {
    e.preventDefault()
    const id = user && user.id
    const userObject = {
      email: email.length === 0 ? user.email : email,
      name: name.length === 0 ? user.name : name,
      businessId: businessId.length === 0 ? user.businessId : businessId,
      vatId: vatId.length === 0 ? user.vatId : vatId,
      address: address.length === 0 ? user.address : address,
      postalCode: postalCode.length === 0 ? user.postalCode : postalCode,
      city: city.length === 0 ? user.city : city,
      iban: iban.length === 0 ? user.iban : iban,
      bic: bic.length === 0 ? user.bic : bic,
      password: password
    }
    try {
      if (password === passwordConfirm){
        await usersService.update(id, userObject)
        setUser(userObject)
        setEmail(user.email)
        setName(user.name)
        setBusinessId(user.businessId)
        setVatId(user.vatId)
        setAddress(user.address)
        setPostalCode(user.postalCode)
        setCity(user.city)
        setPassword("")
        setPasswordConfirm("")
        setShow(false)
        dispatch(setNotification("Tiedot päivitetty", "success"))
      } else {
        dispatch(setNotification("Salasana ei täsmää", "danger"))
      }
    } catch (exception) {
      dispatch(setNotification("Tietojen päivittäminen epäonnistui", "danger"))
    }
  }

  return (
    <main className="form">
      <Card>
        <Card.Header>
          <Card.Title>Muokkaa tietoja</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={editProfile}>
            <Form.Group className="mb-2">
              <Form.Label>Sähköposti</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Sähköposti"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Yrityksen nimi</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Yrityksen nimi"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Y-tunnus</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Y-tunnus"
                value={businessId}
                onChange={({ target }) => setBusinessId(target.value)}
                minLength={9}
                maxLength={9}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>ALV-numero</Form.Label>
              <Form.Control 
                type="text"
                placeholder="ALV-numero"
                value={vatId}
                minLength={10}
                maxLength={10}
                onChange={({ target }) => setVatId(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Katusoite</Form.Label>
              <Form.Control
                type="text"
                placeholder="Katuosoite"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Postinumero</Form.Label>
              <Form.Control 
                type="tel"
                placeholder="Postinumero"
                value={postalCode}
                onChange={({ target }) => setPostalCode(target.value)}
                minLength={5}
                maxLength={5}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Kaupunki</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Kaupunki"
                value={city}
                onChange={({ target }) => setCity(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Yrityksen IBAN-tilinumero</Form.Label>
              <Form.Control
                type="text"
                placeholder="Yrityksen IBAN-tilinumero"
                value={iban}
                onChange={({ target }) => setIban(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Pankin BIC-tunniste</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pankin BIC-tunniste"
                value={bic}
                onChange={({ target }) => setBic(target.value)}  
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Salasana *</Form.Label>
              <br/>
              <Form.Text>Salasana vaaditaan tietojen muuttamiseksi. Voit myös vaihtaa salasanan tässä.</Form.Text>
              <Form.Control
                type="password"
                placeholder="Salasana"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Vahvista salasana *</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Salasana"
                value={passwordConfirm}
                onChange={({ target }) => setPasswordConfirm(target.value)}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">Tallenna</Button>
          </Form>
        </Card.Body>
      </Card>
    </main>
  )
}

export default EditProfileForm