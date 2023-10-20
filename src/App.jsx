// App.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DocumentUpload from "./components/home";
import Chat from "./components/chat";

import genrate_auth_token from "./components/utils/getAuthToken";

function App() {
  const [docName, setDocName] = useState(null);

  const handleDocumentUpload = (name) => {
    setDocName(name);
  };

  useEffect(() => {
    async function init() {
      // Check if the token already exists in localStorage
      const existingToken = localStorage.getItem("jwt_token");

      if (!existingToken) {
        // If the token doesn't exist, generate and store it
        const token = await genrate_auth_token("hello@gmail.com");
        localStorage.setItem("jwt_token", token);
        console.log("jwt token set to", token);
      } else {
        // If the token exists, check its expiration
        const decodedToken = JSON.parse(atob(existingToken.split(".")[1]));
        const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
        const currentTime = Date.now();

        // Check if the token has expired (1 hour = 3600 seconds)
        if (currentTime > expirationTime) {
          // Token has expired, refresh it
          const refreshedToken = await genrate_auth_token("hello@gmail.com");
          localStorage.setItem("jwt_token", refreshedToken);
          console.log("jwt token refreshed to", refreshedToken);
        }
      }
    }

    init();

    return () => {
      // You may choose to keep this or remove it based on your requirements
      // Remove the token from localStorage when the component unmounts
     
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/upload"
          element={
            <DocumentUpload
              onDocumentUpload={handleDocumentUpload}
              docName={docName}
            />
          }
        />
        <Route path="/chat" element={<Chat docName={docName} />} />
      </Routes>
    </Router>
  );
}

export default App;
