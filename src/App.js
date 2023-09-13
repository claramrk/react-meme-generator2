import './my-sass.scss';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [image, setImage] = useState(null);
  const [topTextInput, setTopTextInput] = useState('_');
  const [bottomTextInput, setBottomTextInput] = useState('_');
  const [imageIDInput, setImageIDInput] = useState('aag');

  let generatedMemeURL;

  useEffect(() => {
    fetch(`https://api.memegen.link/templates/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let currentImage = data[0];
        setImageIDInput(currentImage.id);
        generatedMemeURL = `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${bottomTextInput}.png`;
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
    saveAs(
      generatedMemeURL,
      `${imageIDInput}/${topTextInput}/${bottomTextInput}.png`,
    );
  };

  function handleChangeTop(e) {
    generatedMemeURL = `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${bottomTextInput}.png`;
    console.log(generatedMemeURL);
    setTopTextInput(e.currentTarget.value);
    setImage(generatedMemeURL);
  }

  function handleChangeBottom(e) {
    generatedMemeURL = `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${bottomTextInput}.png`;
    console.log(generatedMemeURL);
    setBottomTextInput(e.currentTarget.value);
    setImage(generatedMemeURL);
  }

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
            <label htmlFor="Top Text">Top Text:</label>
            <input name="Top Text" id="Top Text" onChange={handleChangeTop} />
            <br />
            <label htmlFor="Bottom Text">Bottom Text:</label>
            <input
              name="Bottom Text"
              id="Bottom Text"
              onChange={handleChangeBottom}
            />
          </div>
          <div className="memeTemplateInput">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setTopTextInput('_');
                setBottomTextInput('_');
                generatedMemeURL = `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${bottomTextInput}.png`;
                setImage(generatedMemeURL);
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
