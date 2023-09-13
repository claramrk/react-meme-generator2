import './my-sass.scss';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

let currentImage;
let currentImageLink;
let topText;
let bottomText;
let generatedMemeURL;
let currentImageLinkSliced;

export default function App() {
  const [image, setImage] = useState(null);
  const [topTextInput, setTopTextInput] = useState(null);
  const [bottomTextInput, setBottomTextInput] = useState(null);

  useEffect(() => {
    fetch(`https://api.memegen.link/templates/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        currentImage = data[2];
        currentImageLink = currentImage.blank;
        currentImageLinkSliced = currentImageLink.slice(0, -4);
        topText = currentImage.example.text[0];
        bottomText = currentImage.example.text[1];
        generatedMemeURL = `${currentImageLinkSliced}/${topText}_/${bottomText}.png`;
        console.log(generatedMemeURL);

        let imageIds = data.map((d) => d.id);
        console.log(imageIds);
        setImage(generatedMemeURL);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  }, []);

  const handleClick = () => {
    saveAs(generatedMemeURL, 'Downloaded-image');
  };

  console.log(topText);
  console.log(bottomText);

  return (
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
        <input
          name="Top Text"
          id="Top Text"
          onChange={(event) => {
            setTopTextInput(event.currentTarget.value);
            topText = topTextInput;
            generatedMemeURL = `${currentImageLinkSliced}/${topText}_/${bottomText}.png`;
            console.log(generatedMemeURL);
            setImage(generatedMemeURL);
          }}
        />
        <br />
        <label htmlFor="Bottom Text">Bottom Text:</label>
        <input
          name="Bottom Text"
          id="Bottom Text"
          onChange={(event) => {
            setBottomTextInput(event.currentTarget.value);
            bottomText = bottomTextInput;
            generatedMemeURL = `${currentImageLinkSliced}/${topText}_/${bottomText}.png`;
            console.log(generatedMemeURL);
            setImage(generatedMemeURL);
          }}
        />
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
  );
}
