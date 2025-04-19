import { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { shiftHours } from "./DutchData";

const PositionsTable = () => {
  const [selectedShift, setSelectedShift] = useState("Morning");

  return (
    <>
      <Form.Group controlId="shiftType">
        <Form.Label>Select Shift Type:</Form.Label>
        <Form.Select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
        >
          {Object.keys(shiftHours).map((shift) => (
            <option key={shift} value={shift}>
              {shift}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Position</th>
            {shiftHours[selectedShift].map((hour, index) => (
              <th key={index}>{hour}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Drive Shots</td>
          </tr>
          <tr>
            <td>Line Buster 1</td>
          </tr>
          <tr>
            <td>Drive Milk</td>
          </tr>
          <tr>
            <td>Walkup Shots</td>
          </tr>
          <tr>
            <td>Window</td>
          </tr>
          <tr>
            <td>Walkup Milk</td>
          </tr>
          <tr>
            <td>Line Buster 2</td>
          </tr>
          <tr>
            <td>Pit 1</td>
          </tr>
          <tr>
            <td>Side Bar Shots</td>
          </tr>
          <tr>
            <td>Line Buster 3</td>
          </tr>
          <tr>
            <td>Side Bar Milk</td>
          </tr>
          <tr>
            <td>Pit 2</td>
          </tr>
          <tr>
            <td>Drink Runner</td>
          </tr>
          <tr>
            <td>Flow Master</td>
          </tr>
          <tr>
            <td>Walkup Window</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PositionsTable;
