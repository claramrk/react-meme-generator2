import './my-sass.scss';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

let currentImage;
let currentImageID;
let topText = '_';
let bottomText = '_';
let generatedMemeURL;
export default function App() {
  const [image, setImage] = useState(null);
  const [topTextInput, setTopTextInput] = useState(null);
  const [bottomTextInput, setBottomTextInput] = useState(null);
  const [imageIDInput, setImageIDInput] = useState(null);

  useEffect(() => {
    fetch(`https://api.memegen.link/templates/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        currentImage = data[0];
        currentImageID = currentImage.id;
        generatedMemeURL = `https://api.memegen.link/images/${currentImageID}/${topText}/${bottomText}.png`;
        console.log(generatedMemeURL);

        const imageIds = data.map((d) => d.id);
        console.log(imageIds);
        setImage(generatedMemeURL);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  }, []);

  const handleClick = () => {
    saveAs(generatedMemeURL, `${currentImageID}/${topText}/${bottomText}.png`);
  };

  console.log(topText);
  console.log(bottomText);

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
            <label htmlFor="Top Text">Top Text:</label>
            <input
              name="Top Text"
              id="Top Text"
              onChange={(event) => {
                topText = topTextInput;
                generatedMemeURL = `https://api.memegen.link/images/${currentImageID}/${topText}/${bottomText}.png`;
                console.log(generatedMemeURL);
                setTopTextInput(event.currentTarget.value);
                setImage(generatedMemeURL);
              }}
            />
            <br />
            <label htmlFor="Bottom Text">Bottom Text:</label>
            <input
              name="Bottom Text"
              id="Bottom Text"
              onChange={(event) => {
                bottomText = bottomTextInput;
                generatedMemeURL = `https://api.memegen.link/images/${currentImageID}/${topText}/${bottomText}.png`;
                console.log(generatedMemeURL);
                setBottomTextInput(event.currentTarget.value);
                setImage(generatedMemeURL);
              }}
            />
          </div>
          <br />
          <br />
          <div className="memeTemplateInput">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                currentImageID = imageIDInput;
                topText = '_';
                bottomText = '_';
                generatedMemeURL = `https://api.memegen.link/images/${currentImageID}/${topText}/${bottomText}.png`;
                setImage(generatedMemeURL);
              }}
            >
              <label htmlFor="TemplateSelect">Meme Template</label>
              <br />
              <input
                name="TemplateSelect"
                id="TemplateSelect"
                defaultValue={currentImageID}
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
