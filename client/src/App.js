import React from "react";
import './App.css';
import Nav from './components/nav';
import Dashboard from './components/cards/dashboard';

function App() {
  const [data, setData] = React.useState(null);

  // Fetches the API GET call from node/express backend
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
        <Nav></Nav>
        <p>
          {(!data) ? "Loading..." : data}
        </p>
        <div className="cardHolder container ml-auto">
          <Dashboard></Dashboard>
        </div>
    </div>
  );
}

export default App;
