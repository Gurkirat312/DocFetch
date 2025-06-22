import React, { useState } from "react";

function App() {
  const [addInput, setAddInput] = useState("");
  const [findInput, setFindInput] = useState("");
  
  const [prefixMap, setPrefixMap] = useState(new Map());
  const [findResults, setFindResults] = useState([]);

  const inputStyle = {
    padding: "8px",
    fontSize: "16px",
    marginRight: "10px",
    width: "300px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "8px 16px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  };

  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "100px",
    fontFamily: "Arial, sans-serif",
  };

  const rowStyle = {
    marginBottom: "15px",
  };

  // Add button handler: map each segment to set of prefix paths
  function handleAdd() {
    if (!addInput.trim()) return;

    const parts = addInput.split("/").filter(Boolean);

    setPrefixMap((prevMap) => {
      const newMap = new Map(prevMap);

      for (let i = 0; i < parts.length; i++) {
        const segment = parts[i];
        const prefixPath = i === 0 ? "" : parts.slice(0, i).join("/") + "/";

        if (!newMap.has(segment)) {
          newMap.set(segment, new Set());
        }
        newMap.get(segment).add(prefixPath);
      }

      return newMap;
    });

    setAddInput("");
  }

  function handleFind() {
    const segment = findInput.trim();
    if (!segment) {
      setFindResults([]);
      return;
    }
    if (prefixMap.has(segment)) {
      setFindResults(Array.from(prefixMap.get(segment)));
    } else {
      setFindResults([]);
    }
  }

  return (
    <div style={containerStyle}>
      {/* Add path input */}
      <div style={rowStyle}>
        <input
          type="text"
          style={inputStyle}
          placeholder="Enter full path to add (e.g. a/b/c)"
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* Find segment input */}
      <div style={rowStyle}>
        <input
          type="text"
          style={inputStyle}
          placeholder="Enter segment to find (e.g. c)"
          value={findInput}
          onChange={(e) => setFindInput(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleFind}>
          Find
        </button>
      </div>

      {/* Display find results */}
      <div style={{ marginTop: 20, width: "400px", textAlign: "left" }}>
        <h3>Prefix paths for segment "{findInput}":</h3>
        {findResults.length === 0 ? (
          <p>No prefix paths found.</p>
        ) : (
          <ul>
            {findResults.map((prefix, idx) => (
              <li key={idx}>{prefix || "(root)"}</li> // show "(root)" for empty string
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
