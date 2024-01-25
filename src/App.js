import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Amplify } from "@aws-amplify/core";
import awsExports from "./aws-exports";
import { get } from "aws-amplify/api";
// import { API } from "aws-amplify";
Amplify.configure(awsExports);
const myAPI = "apid4899049";
const path = "/customers";

const App = () => {
  const [input, setInput] = useState("");
  const [customers, setCustomers] = useState([]);

  // function getCustomer(e) {
  //   let customerId = e.input;
  //   API.get(myAPI, path + "/" + customerId)
  //     .then((response) => {
  //       console.log(response);
  //       let newCustomers = [...customers];
  //       newCustomers.push(response);
  //       setCustomers(newCustomers);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const getCustomer = async (e) => {
    try {
      const customerId = e.input; // Assuming 'e' is an object containing 'input'
      const req = get({
        apiName: myAPI,
        path: `${path}/${customerId}`,
      });
  
      const res = await req.response;
      const response = await res.body.json();
  
      console.log(response);
  
      setCustomers((prevCustomers) => [...prevCustomers, response]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <h1>Super Simple React App</h1>
      <div>
        <input
          placeholder="customer id"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => getCustomer({ input })}>
        Get Customer From Backend
      </button>

      <h2 style={{ visibility: customers.length > 0 ? "visible" : "hidden" }}>
        Response
      </h2>
      {customers.map((thisCustomer, index) => {
        return (
          <div key={thisCustomer.customerId}>
            <span>
              <b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>
              : {thisCustomer.customerName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default App;
