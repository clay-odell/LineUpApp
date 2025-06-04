import { useState } from "react";
import { allShiftHours, broistaData, shiftHours } from "./DutchData";
import { breakCalculator } from "../utils/breakCalculator";
import PositionsTable from "./PositionsTable";
import "./ShiftPool.css";


const ShiftPool = () => {
  const [store, setStore] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [shiftPool, setShiftPool] = useState([]);
  const [selectedBroista, setSelectedBroista] = useState("");
  const [broistaStart, setBroistaStart] = useState("");
  const [broistaEnd, setBroistaEnd] = useState("");
  const [finalShiftPool, setFinalShiftPool] = useState([]);
  const [message, setMessage] = useState("");
  const [isFinalized, setIsFinalized] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBroista && broistaStart && broistaEnd) {
      const { breakTime } = breakCalculator(broistaStart, broistaEnd);
      setShiftPool([
        ...shiftPool,
        {
          name: selectedBroista,
          shiftStart: broistaStart,
          shiftEnd: broistaEnd,
          breakTime,
        },
      ]);

      // Display message
      setMessage(`${selectedBroista} added to the shift pool.`);

      // Make the message disappear after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleUndoLast = () => {
    setShiftPool(shiftPool.slice(0, -1));
    setMessage("Last added broista removed from the shift pool.");
  };

  const handleFinalizedPool = () => {
    setFinalShiftPool([...new Set(shiftPool)]);
    setIsFinalized(true);
    setMessage("Shift pool finalized.");
  };

  const handleUndoFinalize = () => {
    setIsFinalized(false);
    setFinalShiftPool([]);
    setMessage(
      "Finalization undone. You can continue adding to the shift pool."
    );
  };

  const uniqueShiftPool = finalShiftPool.reduce((acc, broista) => {
    if (!acc.some((entry) => entry.name === broista.name)) {
      acc.push(broista);
    }
    return acc;
  }, []);

  return (
    <>
      <h1>Dutch Bros Lineup App</h1>
      <h3 className="h3-instructions">Instructions:</h3>
      <ol className="instructions">
        <li>First, select a store and shift type.</li>
        <li>Select a broista, and select their shift start and end times.</li>
        <li>
          Add to the shift pool, and complete the same process for each
          additional broista.
        </li>
        <li>Finalize the shift pool before proceeding to the lineup table.</li>
        <li>
          If you make a mistake, and you find no other way of undoing it, you
          can always refresh the page and start over at step one.
        </li>
      </ol>

      {message && <p>{message}</p>}

      <h3 className="h3-instructions">Create a Shift Pool:</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="storeSelect">Select a Store:</label>

        <select
          id="storeSelect"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        >
          <option value="" disabled>
            Select a store
          </option>
          {Object.keys(broistaData).map((storeName, index) => (
            <option key={index} value={storeName}>
              {storeName}
            </option>
          ))}
        </select>

        <label htmlFor="shiftType">Select Shift Type:</label>

        <select
          id="shiftType"
          value={shiftType}
          onChange={(e) => setShiftType(e.target.value)}
        >
          <option value="" disabled>
            Select a shift type
          </option>
          {Object.keys(shiftHours).map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {store && (
          <>
            <label htmlFor="broistaSelect">Select a Broista:</label>

            <select
              id="broistaSelect"
              value={selectedBroista}
              onChange={(e) => setSelectedBroista(e.target.value)}
            >
              <option value="" disabled>
                Select a broista
              </option>
              {broistaData[store].map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </>
        )}

        {shiftType && (
          <>
            <label htmlFor="shiftStart">Select Shift Start Time:</label>

            <select
              id="shiftStart"
              value={broistaStart}
              onChange={(e) => setBroistaStart(e.target.value)}
            >
              <option value="" disabled>
                Select a start time
              </option>
              {allShiftHours.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <label htmlFor="shiftEnd">Select Shift End Time:</label>

            <select
              id="shiftEnd"
              value={broistaEnd}
              onChange={(e) => setBroistaEnd(e.target.value)}
            >
              <option value="" disabled>
                Select an end time
              </option>
              {allShiftHours.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </>
        )}
        <div className="container">
      <div className="button-div">
        <button
          type="submit"
          disabled={!selectedBroista || !broistaStart || !broistaEnd}
          className="add"
        >
          Add to Shift Pool
        </button>

        <button
          onClick={handleUndoLast}
          disabled={shiftPool.length === 0}
          className="undo"
        >
          Undo Last Added
        </button>

        <button
          onClick={handleFinalizedPool}
          disabled={shiftPool.length === 0}
          className="finalize"
        >
          Finalize Shift Pool
        </button>

        <button className="undo" onClick={handleUndoFinalize}>
          Undo Finalize Shift Pool
        </button>
        </div>
        </div>
      </form>

      {isFinalized && (
        <>
          <h2 className="shiftPool">Finalized Shift Pool</h2>
          <ul>
            {uniqueShiftPool.map((entry, index) => (
              <li key={index}>
                {entry.name} {entry.shiftStart} to {entry.shiftEnd}
                {entry.breakTime && ` | Break at ${entry.breakTime}`}
              </li>
            ))}
          </ul>

          <PositionsTable shiftPool={uniqueShiftPool} shiftType={shiftType} />
        </>
      )}
    </>
  );
};

export default ShiftPool;
