import React from "react"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import { useStore } from "../store"

const Header = () => {
  const { user, setUser, setMessage } = useStore()

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser")
    setUser(null)
    setMessage("Kirjauduit ulos", "success")
  }

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Kirjanpito</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ?
            <Nav className="justify-content-space-between">
              <NavDropdown title="Toiminnot" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/entries">Kirjanpito</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/new-entry">Lisää uusi tietue</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/invoice">Luo lasku</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/profile">Omat tiedot</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={handleLogout}>Kirjaudu ulos</Nav.Link>
            </Nav>
            :
            <Nav className="justify-content-space-between">
              <Nav.Link as={Link} to="/register">Rekisteröidy</Nav.Link>
              <Nav.Link as={Link} to="/login">Kirjaudu sisään</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header