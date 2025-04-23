import { useState } from "react";
import { shiftHours, positions } from "./DutchData";
import "./App.css";
import "./index.css";
import "./PositionsTable.css";
const PositionsTable = ({ shiftType, shiftPool }) => {
  const [assignments, setAssignments] = useState({});
  const [isFinalized, setIsFinalized] = useState(false);

  const handleSelectChange = (position, time, broista) => {
    setAssignments((prev) => ({
      ...prev,
      [`${position}-${time}`]: broista,
    }));
  };

  const handleFinalize = () => {
    setIsFinalized(true);
  };

  const handleUndoFinalize = () => {
    setIsFinalized(false);
  };

  return (
    <>
      <h2>Positions Table</h2>

      {!isFinalized && (
        <>
        <p>If you have trouble seeing the names on your unfinalized table, turn your phone or device sideways.</p>
          <table border="1">
            <thead>
              <tr>
                <th>Positions</th>
                {shiftHours[shiftType]?.map((time, index) => (
                  <th key={index}>{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => (
                <tr key={index}>
                  <th scope="row">{position}</th>
                  {shiftHours[shiftType]?.map((time, idx) => (
                    <td key={idx}>
                      <select
                        value={assignments[`${position}-${time}`] || ""}
                        onChange={(e) =>
                          handleSelectChange(position, time, e.target.value)
                        }
                      >
                        <option value="">Select Broista</option>
                        {shiftPool.map((broista, index) => (
                          <option key={index} value={broista.name}>
                            {broista.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleFinalize}>Finalize Table</button>
        </>
      )}

      {isFinalized && (
        <>
          <h2>Finalized Positions</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Positions</th>
                {shiftHours[shiftType]?.map((time, index) => (
                  <th key={index}>{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => (
                <tr key={index}>
                  <th scope="row">{position}</th>
                  {shiftHours[shiftType]?.map((time, idx) => (
                    <td key={idx}>
                      {assignments[`${position}-${time}`] || "--"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleUndoFinalize}>Undo Finalize</button>
        </>
      )}
    </>
  );
};

export default PositionsTable;
