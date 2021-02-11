import axios from "axios";
import React, { useState, useEffect } from "react";


function App() {



  const [filteredArray, setFilteredArray] = useState([]);


  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((response) => {
        const responseArray = response.data.results;
        const sortedArray = responseArray.sort((a, b) => a.name.first.localeCompare(b.name.first));

        setFilteredArray(sortedArray);

        console.log("onload",filteredArray)

      })
      .catch((err) => console.log(err));
  }, []);
  console.log("before ",filteredArray)

  function handleChange() {
// console.log("before change",filteredArray)
    const nameArray = filteredArray.reverse()
    console.log(nameArray)
    setFilteredArray(nameArray);
    console.log("filtered array", filteredArray)
  }

function sortAsc() {
  let ascArray = [...filteredArray].sort((a, b) => a.name.first > b.name.first ? 1:-1);
  setFilteredArray(ascArray)
}

function sortDec() {
  let decArray = [...filteredArray].sort((a, b) => b.name.first > a.name.first ? 1:-1);
  setFilteredArray(decArray)
}


  return (
    <div className="App">
      <header>
        <h1>Employee Directory</h1>
      </header>
      <button onClick={sortDec}>Sort Decending</button>
      <button onClick={sortAsc}>Sort Ascending</button>
      <div className="container-sm">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">First</th>
              <th scope="col">last</th>
              <th scope="col">Email</th>

            </tr>
          </thead>
          <tbody>
            {filteredArray.map((result) => (
              <tr key={result.login.uuid}>
                <td>{result.name.first}</td>
                <td>{result.name.last}</td>
                <td>{result.email}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;