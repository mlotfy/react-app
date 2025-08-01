import "./App.css";

import React, { useEffect, useState } from "react";
import "./App.css";
import AudioPlayer from "./player";

function App() {
  const [surahs, setSurahs] = useState([]);
  const [aya, setAyas] = useState([]);
  const[selectedSurah, setSelectedSurah] = useState(null);
  const [file, setfile] = useState("1");


  const PlayAudio = (s,a) => {
    setfile(`${s}_${a}`);
  }
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
    setSelectedSurah(i);
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
            <td style={{ width: "200px", verticalAlign: "top" , backgroundColor: "blue", color: "white"}}>
              <AudioPlayer id={file} />
              <ol>
                {surahs.map((surah) => (
                  <li key={surah.number}>
                    <a onClick={() => GetSurah(surah.number)}>{surah.name}</a>
                  </li>
                ))}
              </ol>
            </td>
            <td style={{ verticalAlign: "middle" }}>
              {aya.map((a) => (
                <>
                 <a onClick={()=> PlayAudio(selectedSurah ,a.numberInSurah)}> {a.text} ({a.numberInSurah})</a>
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
