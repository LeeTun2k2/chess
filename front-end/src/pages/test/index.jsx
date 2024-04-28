import axios from "axios";
import React, { useState } from "react";
import appSettings from "../../settings/appSettings";

export default function TestPage() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleSetRedis = async () => {
    try {
      const response = await axios.get(
        `${appSettings.API_PROXY}/test/redis/set?key=${key}&value=${value}`,
      );
      setResult("Value set successfully");
    } catch (error) {
      setResult("Error: " + error?.response?.data?.error);
    }
  };

  const handleGetRedis = async () => {
    try {
      const response = await axios.get(
        `${appSettings.API_PROXY}/test/redis/get?key=${key}`,
      );
      setResult(response.data[key]);
    } catch (error) {
      setResult("Error: " + error?.response?.data?.error);
    }
  };

  return (
    <div>
      <h2>Set/Get Values in Redis</h2>
      <div>
        <label htmlFor="key">Key:</label>
        <input
          type="text"
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="value">Value:</label>
        <input
          type="text"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button onClick={handleSetRedis}>Set Value</button>
      <button onClick={handleGetRedis}>Get Value</button>
      <div>
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
}
