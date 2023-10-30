import React, { useState } from "react";
import "./App.css";

const keyOptions = [
  "bcbsma_eligibility_20230731",
  "cofw_marketingcontact_elig_20230628180022",
  "bcbsne_eligibility_20230826",
  "marpai_virta_eligibility_06242023",
  "pdl_test_brdg_virta_elig_20230622171759",
];

const App = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [isContinueClicked, setIsContinueClicked] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleJsonChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleKeyChange = (event) => {
    setSelectedKey(event.target.value);

    if (jsonData.trim() === "") {
      alert("JSON Data cannot be empty!");
    } else {
      setIsContinueClicked(true);
    }
  };
  const convertData = () => {
    if (jsonData.trim() === "" && selectedKey === "") {
      alert("All fields Required!!");
    } else {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
          Cache: "no-cache",
        },
        body: JSON.stringify({
          key: selectedKey,
          objects: JSON.parse(jsonData),
        }), // Convert data to JSON format
      };

      // Call the API
      fetch("http://localhost:5000/api/post-transform-data", options)
        .then((response) => response.json())
        .then((data) => {
          setApiResponse(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const handleContinueClick = () => {
    if (jsonData.trim() === "") {
      alert("JSON Data cannot be empty!");
    } else {
      setIsContinueClicked(true);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>JSON Data Processing</h1>
      <div className="App">
        <div className="key-selection-screen">
          <h2>Enter Your Json Here</h2>
          <textarea
            rows="25"
            cols="50"
            value={jsonData}
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginTop: "10px",
            }}
            onChange={handleJsonChange}
          />
          <button onClick={handleContinueClick} className="custom-button">
            Continue
          </button>
        </div>
        {isContinueClicked && (
          <div className="key-selection-screen">
            <h2>Select a Key:</h2>
            {keyOptions.map((key)=> (
              <div key={key}>
                <input
                  type="radio"
                  id={key}
                  name="key"
                  value={key}
                  checked={selectedKey === key}
                  onChange={handleKeyChange}
                />
                <label htmlFor={key}>{key}</label>
              </div>
            ))}
            {
              <button onClick={convertData} className="custom-button">
                Convert
              </button>
            }
          </div>
        )}
        {apiResponse && (
          <div className="key-selection-screen">
            <h2>API Response:</h2>
            <textarea
              rows="25"
              cols="50"
              readOnly
              value={JSON.stringify(apiResponse, null, 2)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                marginTop: "10px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;