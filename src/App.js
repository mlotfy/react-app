import "./App.css";

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [surahs, setSurahs] = useState([]);
  const [aya, setAyas] = useState([]);

  // Fetch Surah data from API
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((response) => response.json())
      .then((data) => {
        setSurahs(data.data);
        console.log("Surah data:", data);
      })
      .catch((error) => {
        console.error("Error fetching Surah data:", error);
      });
  }, []);
  function GetSurah(i) {
    fetch("https://api.alquran.cloud/v1/surah/" + i)
      .then((response) => response.json())
      .then((data) => {
        setAyas(data.data.ayahs);
        console.log("Surah data:", data);
      })
      .catch((error) => {
        console.error("Error fetching Surah data:", error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <table style={{ direction: "rtl" }}>
          <tr>
            <td style={{ width: "200px", verticalAlign: "top" , backgroundColor: "lightgray"}}>
              <ol>
                {surahs.map((surah) => (
                  <li key={surah.number}>
                    <a onClick={() => GetSurah(surah.number)}>{surah.name}</a>
                  </li>
                ))}
              </ol>
            </td>
            <td style={{ verticalAlign: "top" }}>
              {aya.map((a) => (
                <>
                  {a.text} ({a.numberInSurah})
                </>
              ))}
            </td>
          </tr>
        </table>
      </header>

    </div>
  );
}

export default App;
