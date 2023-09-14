import './my-sass.scss';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);
  const [topTextInput, setTopTextInput] = useState('_');
  const [bottomTextInput, setBottomTextInput] = useState('_');
  const [imageIDInput, setImageIDInput] = useState('aag');

  const imgURL = `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${bottomTextInput}.png`;

  useEffect(() => {
    fetch(`https://api.memegen.link/templates/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(imgURL);
        setImage(imgURL);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  });

  const handleClick = () => {
    saveAs(image, `${imageIDInput}/${topTextInput}/${bottomTextInput}.png`);
  };

  console.log(topTextInput);
  console.log(bottomTextInput);

  return (
    <body>
      <h1>Meme Generator</h1>
      <div className="main">
        <div className="main-left">
          <div className="memePreview">
            <div className="image-frame">
              <img
                src={image}
                alt="background for meme"
                data-test-id="meme-image"
              />
            </div>
          </div>
        </div>
        <div className="main-right">
          <div className="textInput">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <label htmlFor="Top Text">Top Text:</label>
              <input
                name="Top Text"
                id="Top Text"
                onChange={(event) => {
                  setTopTextInput(event.target.value);
                  setImage(
                    `https://api.memegen.link/images/${imageIDInput}/${event.target.value}/${bottomTextInput}.png`,
                  );
                }}
              />
              <br />
              <label htmlFor="Bottom Text">Bottom Text:</label>
              <input
                name="Bottom Text"
                id="Bottom Text"
                onChange={(event) => {
                  setBottomTextInput(event.currentTarget.value);
                  setImage(
                    `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${event.currentTarget.value}.png`,
                  );
                }}
              />
            </form>
          </div>
          <div className="memeTemplateInput">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setImage(imgURL);
                console.log(imgURL);
              }}
            >
              <label htmlFor="TemplateSelect">Meme Template</label>
              <br />
              <input
                name="TemplateSelect"
                id="TemplateSelect"
                value={imageIDInput}
                onChange={(event) => {
                  setImageIDInput(event.currentTarget.value);
                }}
              />
            </form>
          </div>
          <div className="download">
            <button onClick={handleClick}>Download</button>
          </div>
        </div>
      </div>
    </body>
  );
}
