import './my-sass.scss';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [image, setImage] = useState(
    'https://api.memegen.link/images/aag/_/_.png',
  );
  const [topTextInput, setTopTextInput] = useState('_');
  const [bottomTextInput, setBottomTextInput] = useState('_');
  const [imageIDInput, setImageIDInput] = useState('aag');

  const dataIDs = [];

  useEffect(() => {
    fetch(`https://api.memegen.link/templates/`)
      .then((response) => response.json())
      .then((data) => {
        data.map((d) => dataIDs.push(d.id));
        // console.log(data);
        return dataIDs;
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  });

  console.log(dataIDs);

  const handleClick = () => {
    saveAs(image, `${imageIDInput}/${topTextInput}/${bottomTextInput}.png`);
  };

  return (
    <div className="main-main">
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
              <label htmlFor="Top Text">Top text</label>
              <input
                name="Top Text"
                id="Top Text"
                onChange={(event) => {
                  //  setTopTextInput(event.target.value);
                  if (event.target.value.length > 0) {
                    setTopTextInput(event.target.value);
                    setImage(
                      `https://api.memegen.link/images/${imageIDInput}/${event.target.value}/${bottomTextInput}.png`,
                    );
                  } else {
                    setTopTextInput('_');
                    setImage(
                      `https://api.memegen.link/images/${imageIDInput}/_/${bottomTextInput}.png`,
                    );
                  }
                  // setImage( `https://api.memegen.link/images/${imageIDInput}/${event.target.value}/${bottomTextInput}.png`, );
                }}
              />
              <br />
              <label htmlFor="Bottom Text">Bottom text</label>
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
                setImage(
                  `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${bottomTextInput}.png`,
                );
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
          {/*
          <div className="datalist">
            <input list="data" />

            <datalist>
              {dataIDs.map((d) => {
                return <option key={`dataID-${d}`} value={d} />;
              })}
            </datalist>

          </div>
          */}
          <div className="download">
            <button onClick={handleClick}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}
