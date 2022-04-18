import React from "react"
import Alert from "react-bootstrap/Alert"

const Home = () => {
  return (
    <main>
      <Alert variant="success">
        <Alert.Heading>Tervetuloa kirjanpitopalveluun</Alert.Heading>
        Yhdenkertainen kirjanpito-ohjelma vuoden pituiselle verokaudelle. Laskujen tulostusmahdollisuus.
      </Alert>
    </main>
  )
}

export default Home