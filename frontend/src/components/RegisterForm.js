import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useStore } from "../store"
import { useNavigate } from "react-router-dom"
import usersService from "../services/users"
import loginService from "../services/login"
import entryService from "../services/entries"

const RegisterForm = () => {
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("") 
  const [passwordConfirm, setPasswordConfirm] = useState("") 
  const [name, setName] = useState("") 
  const [businessId, setBusinessId] = useState("") 
  const [vatId, setVatId] = useState("") 
  const [address, setAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [iban, setIban] = useState("")
  const [bic, setBic] = useState("")

  const { setMessage, setUser, users } = useStore()

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const emails = users.map(user => user.email.toLowerCase())
      if (emails.includes(email.toLowerCase())){
        return setMessage("Sähköposti on jo käytössä", "danger")
      }
      if (password === passwordConfirm){
        await usersService.create({
          email, password, name, businessId, vatId, address, postalCode, city, iban, bic
        })
        const user = await loginService.login({
          email, password
        })
        window.localStorage.setItem(
          "loggedInUser", JSON.stringify(user)
        ) 
        entryService.setToken(user.token)
        setUser(user)
        setEmail("")
        setPassword("")
        setName("")
        setBusinessId("")
        setVatId("")
        setAddress("")
        setPostalCode("")
        setCity("")
        navigate("/profile")
        setMessage("Tunnus luotu! Olet nyt kirjautuneena sisään", "success")
      } else {
        setMessage("Salasana ei täsmää", "danger")
      }
    } catch (exception) {
      setMessage("Rekisteröityminen epäonnistui", "danger")
    }
  }

  return (
    <main className="form">
      <Card>
        <Card.Body>
          <Card.Title>Rekisteröidy</Card.Title>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-2">
              <Form.Label>Sähköposti *</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Sähköposti"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
              <Form.Text className="text-muted">Emme jaa sähköpostiosoitettasi.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Yrityksen nimi *</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Yrityksen nimi"
                value={name}
                onChange={({ target }) => setName(target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Y-tunnus *</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Y-tunnus"
                value={businessId}
                onChange={({ target }) => setBusinessId(target.value)}
                minLength={9}
                maxLength={9}
                required
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
              <Form.Label>Katusoite *</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Katuosoite"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Postinumero *</Form.Label>
              <Form.Control 
                type="tel"
                placeholder="Postinumero"
                value={postalCode}
                onChange={({ target }) => setPostalCode(target.value)}
                minLength={5}
                maxLength={5}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Kaupunki *</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Kaupunki"
                value={city}
                onChange={({ target }) => setCity(target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>IBAN-tilinumero</Form.Label>
              <Form.Control 
                type="text"
                placeholder="IBAN-tilinumero"
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
            <Button variant="success" type="submit">Rekisteröidy</Button>
          </Form>
        </Card.Body>
      </Card>
    </main>
  )
}
export default RegisterForm