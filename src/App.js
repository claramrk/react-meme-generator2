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
  const [currentDate, setCurrentDate] = useState('');
  const [datalist, setDatalist] = useState('');

  /*
  useEffect(() => {
    fetch(`https://api.memegen.link/templates/`)
      .then((response) => response.json())
      .then((data) => {
        const dataIDs = [];
        data.map((d) => dataIDs.push(d.id));
        setDatalist(dataIDs);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  });
*/

  const handleClick = () => {
    saveAs(image, `${imageIDInput}/${topTextInput}/${bottomTextInput}.png`);
  };

  function saveInStorage() {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    return localStorage.setItem(
      `${date}/${month}/${year} ${hours}/${min}/${sec}`,
      `Top Text: ${topTextInput}, Bottom Text: ${bottomTextInput}, Meme Template: ${imageIDInput}`,
    );
  }

  useEffect(() => {
    setInterval(() => {
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const hours = new Date().getHours();
      const min = new Date().getMinutes();
      const sec = new Date().getSeconds();

      setCurrentDate(
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
      );
    }, 1000);
  }, []);

  return (
    <div className="main-main">
      <h1>Meme Generator</h1>
      <p>{currentDate}</p>
      <div className="main">
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
                  if (event.target.value.length > 0) {
                    setTopTextInput(event.target.value);
                    // setImage(
                    //  `https://api.memegen.link/images/${imageIDInput}/${event.target.value}/${bottomTextInput}.png`,
                    // );
                  } else {
                    setTopTextInput('_');
                    // setImage(
                    //  `https://api.memegen.link/images/${imageIDInput}/_/${bottomTextInput}.png`,
                    // );
                  }
                }}
              />
              <br />
              <label htmlFor="Bottom Text">Bottom text</label>
              <input
                name="Bottom Text"
                id="Bottom Text"
                onChange={(event) => {
                  setBottomTextInput(event.currentTarget.value);
                  // setImage(
                  //  `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${event.currentTarget.value}.png`,
                  // );
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
          <div className="generateButton">
            <button
              data-test-id="generate-meme"
              onClick={() => {
                setImage(
                  `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${bottomTextInput}.png`,
                );
                saveInStorage();
              }}
            >
              Generate Meme
            </button>
          </div>

          {/*
          <div className="datalist">
            <input list="data" />

            <datalist>
              {datalist.map((d) => {
                return <option key={`dataID-${d}`} value={d} />;
              })}
              ;
            </datalist>
                      </div>

            */}
        </div>
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
          <div className="download">
            <button onClick={handleClick}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}
