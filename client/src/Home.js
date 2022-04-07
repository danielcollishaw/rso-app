import React from "react";
import Nav from "./components/nav";
import Dashboard from "./components/cards/dashboard";

function App() {
  const [data, setData] = React.useState(null);

  // Fetches the API GET call from node/express backend
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="Home">
        <Nav></Nav>
        <p className="text-center">
          {(!data) ? "Loading..." : data}
        </p>
        <div className="body">
          <Dashboard></Dashboard>
        </div>
    </div>
  );
}

export default App;
