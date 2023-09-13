import './my-sass.scss';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

let templateArray = [];
let generatedMemeURL;

export default function App() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState(null);
  const [bottomText, setBottomText] = useState(null);

  useEffect(() => {
    fetch(`https://api.memegen.link/templates/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImage(data[0].example.url);
        setTopText(data[0].example.text[0]);
        setBottomText(data[0].example.text[1]);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  }, []);

  const handleClick = () => {
    let url = { image };
    saveAs(url, 'Downloaded-image');
  };

  return (
    <>
      <header>
        <h1>Meme Generator</h1>
      </header>
      <body>
        <div className="memePreview">
          <div className="image-frame">
            <img
              src={image}
              alt="background for meme"
              data-test-id="meme-image"
            />
          </div>
        </div>
        <br />
        <br />
        <div className="textInput">
          <label htmlFor="Top Text">Top Text:</label>
          <input name="Top Text" id="Top Text" value={topText} />
          <br />
          <label htmlFor="Bottom Text">Bottom Text:</label>
          <input name="Bottom Text" id="Bottom Text" value={bottomText} />
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
          <button onClick={handleClick}>Download</button>
        </div>
      </body>
    </>
  );
}
