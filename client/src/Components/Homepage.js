import React from "react";
import logo from "../logo.svg";
import "./Homepage.css";
function Homepage(props) {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is the homepage of CERTOSOL web application.
          <br />
          For University Admin, visit the account icon to Login.
          <br />
          For Students or Employers, visit the account icon to View and Verify
          Certificate.
          <br />
        </p>
      </header>

      <footer className="footer">
        Final Year Project by IT-Group 25
        <br />
        Aman Sharma, Vikas Gautam and Abhishek Gangwar
      </footer>
    </div>
  );
}

export default Homepage;
