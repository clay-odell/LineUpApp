import { useState } from "react";
import { allShiftHours, broistaData, shiftHours } from "./DutchData";

const ShiftPool = () => {
  const [store, setStore] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [shiftPool, setShiftPool] = useState([]);
  const [selectedBroista, setSelectedBroista] = useState("");
  const [broistaStart, setBroistaStart] = useState("");
  const [broistaEnd, setBroistaEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBroista) {
      setShiftPool([...shiftPool, selectedBroista]);
    }
  };
  const handleUndoLast = (e) => {
    e.preventDefault();
    setShiftPool(shiftPool.slice(0, -1));
    setBroistaStart("");
    setBroistaEnd("");
  };

  return (
    <>
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
        <br />
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
        <br />
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
            <br />
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
            <br />
          </>
        )}
        {shiftType && (
          <>
            <label htmlFor="shiftEnd">Select Shift Start Time:</label>
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
            <br />
          </>
        )}

        <button type="submit" disabled={!selectedBroista}>
          Add to the Shift Pool
        </button>
        <button onClick={handleUndoLast} disabled={shiftPool.length === 0}>
          Undo Last Added
        </button>
      </form>
      <h2>Shift Pool</h2>
      <p>
        {shiftPool} - {broistaStart} -- {broistaEnd}
      </p>
    </>
  );
};

export default ShiftPool;
