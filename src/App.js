import React, { useEffect, useState } from 'react';

let templateArray = [];

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.memegen.link/templates/`)
      .then((response) => response.json())
      .then((usefulData) => {
        console.log(usefulData);
        setLoading(false);
        setData(usefulData);
        templateArray = usefulData;
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  }, []);
  return (
    <>
      <h1>Meme Generator</h1>
      <div className="App">
        {loading && <p>Loading...</p>}
        {!loading && <p>Fetched data</p>}
      </div>
      <br />
      <br />
      <div className="memePreview">
        <img href="" alt="background for meme" data-test-id="meme-image" />
      </div>
      <br />
      <br />
      <div className="textInput">
        <label htmlFor="Top Text">Top Text:</label>
        <input name="Top Text" id="Top Text" />
        <br />
        <label htmlFor="Bottom Text">Bottom Text:</label>
        <input name="Bottom Text" id="Bottom Text" />
      </div>
      <br />
      <br />
      <div className="memeTemplateInput">
        <label htmlFor="Templates">Meme Template</label>
        <br />
        <select value="Templates">
          <option value="none"> - </option>
          <option value="Template 1">Template 1</option>
          <option value="Template 2">Template 2</option>
        </select>
      </div>
      <br />
      <br />
      <div className="download">
        <button>Download</button>
      </div>
    </>
  );
}
