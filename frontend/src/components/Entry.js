import React from "react"
import Button from "react-bootstrap/Button"

const Entry = ({ entry, index, deleteEntry, user }) => {
  const entryIndex = index + 1

  return (
    <tr>
      <td>{entryIndex}</td>
      <td>{entry.date}</td>
      <td>{entry.description}</td>
      <td>{entry.type}</td>
      <td>{entry.vatPercent} %</td>
      <td>{entry.vatAmount} €</td>
      <td>{entry.price} €</td>
      <td>{entry.unit}</td>
      <td>{entry.amount}</td>
      <td>{entry.includeVat}</td>
      <td>{entry.priceWithoutVat} €</td>
      <td>{entry.priceWithVat} €</td>
      <td>{entry.sum} €</td>
      <td><Button variant="danger" onClick={() => deleteEntry(entry.id, entry, user)}>Poista</Button></td>
    </tr>
  )
}

export default Entry