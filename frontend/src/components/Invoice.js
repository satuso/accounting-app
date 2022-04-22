import React from "react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"

const Invoice = ({
  user, 
  setShow,
  date,
  description,
  price,
  amount,
  totalPrice,
  vatAmount,
  vatPercent,
  priceWithVat,
  priceWithoutVat,
  sum,
  name,
  vatId,
  businessId,
  address,
  postalCode,
  city,
  iban,
  bic,
  interest,
  refNum,
  dueDate
}) => {
  const printRef = React.useRef()

  const handleDownloadPdf = async () => {
    const element = printRef.current
    const canvas = await html2canvas(element)
    const data = canvas.toDataURL("image/png")

    const pdf = new jsPDF()
    const imgProperties = pdf.getImageProperties(data)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("invoice.pdf")
  }

  if (!user) return null
  return (
    <main>
      <div className="center">
        <Button type="button" variant="secondary" onClick={() => setShow(false)}>Edellinen</Button> <Button type="button" onClick={handleDownloadPdf}>Lataa PDF:nä</Button>
      </div>
      <div ref={printRef} className="invoice">
        <div className="invoice-top">
          <div className="invoice-address-container">
            <div className="invoice-address">
              <h4>{user.name}</h4>
              <span>{user.address}</span>
              <span>{user.postalCode} {user.city}</span>
              <span>Y-tunnus: {user.businessId}</span>
              <span>{user.vatId ? `Alv-tunnus: ${user.vatId}` : ""}</span>
            </div>
            <div className="invoice-address">
              <span><b>Vastaanottaja</b></span>
              <span>{name}</span>
              <span>{address}</span>
              <span>{postalCode} {city}</span>
              <span>{businessId ? `Y-tunnus: ${businessId}` : ""}</span>
              <span>{vatId ? `Alv-tunnus: ${vatId}` : ""}</span>
            </div>
          </div>
          <div className="invoice-address-container">
            <div className="invoice-address">
              <h4>Lasku</h4>
            </div>
            <div className="invoice-address">
              <span>Laskun nro: </span>
              <span>Päiväys: {date}</span>
              <span>Eräpäivä: {dueDate}</span>
              <span>Viivästyskorko: {interest} %</span>
              <span>Viitenumero: {refNum}</span>
            </div>
          </div>
        </div>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Kuvaus</th>
              <th>Määrä</th>
              <th>Á Hinta</th>
              <th>Alv %</th>
              <th>Alv määrä €</th>
              <th>Veroton hinta</th>
              <th>Verollinen hinta</th>
              <th>Yhteensä</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{description}</td>
              <td>{amount}</td>
              <td>{price}</td>
              <td>{vatPercent}</td>
              <td>{vatAmount}</td>
              <td>{priceWithoutVat}</td>
              <td>{priceWithVat}</td>
              <td>{totalPrice}</td>
            </tr>
          </tbody>
        </Table>
        <div className="invoice-total">
          <span>Veroton hinta: {priceWithoutVat} €</span>
          <span>Arvonlisävero: {vatAmount} €</span>
          <span>Yhteensä: {sum} €</span>
        </div>
        <Table bordered>
          <tbody>
            <tr>
              <th>Saajan tilinumero</th>
              <td>IBAN {user.iban}</td>
              <td colSpan={2}>BIC {user.bic}</td>
            </tr>
            <tr>
              <th>Saaja</th>
              <td>{name}</td>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <th height="100" width="100">Maksajan nimi ja osoite</th>
              <td height="100"> </td>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <th>Tililtä nro</th>
              <td>IBAN {iban}</td>
              <td colSpan={2}>BIC {bic}</td>
            </tr>
            <tr>
              <th>Allekirjoitus</th>
              <td></td>
              <th width="150">Viitenumero</th>
              <td>123344</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <th>Eräpäivä</th>
              <td>15.5.2022</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <th>Euro</th>
              <td>{totalPrice} €</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </main>
  )
}

export default Invoice