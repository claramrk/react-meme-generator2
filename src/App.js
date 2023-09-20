import './my-sass.scss';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [image, setImage] = useState(
    'https://api.memegen.link/images/aag/_/_.gif',
  );
  const [topTextInput, setTopTextInput] = useState('_');
  const [bottomTextInput, setBottomTextInput] = useState('_');
  const [imageIDInput, setImageIDInput] = useState('aag');
  const [currentDate, setCurrentDate] = useState('');

  const [datalist, setDatalist] = useState([]);

  useEffect(() => {
    fetch(`https://api.memegen.link/templates/`)
      .then((response) => response.json())
      .then((data) => {
        const newDataList = [...datalist, ...data];
        setDatalist(newDataList);
        console.log(newDataList);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  }, []);

  const handleClick = () => {
    saveAs(image, `${imageIDInput}/${topTextInput}/${bottomTextInput}.gif`);
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
                  } else {
                    setTopTextInput('_');
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
                }}
              />
            </form>
          </div>
          <div className="memeTemplateInput">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setImage(
                  `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${bottomTextInput}.gif`,
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
                  `https://api.memegen.link/images/${imageIDInput}/${topTextInput}/${bottomTextInput}.gif`,
                );
                saveInStorage();
              }}
            >
              Generate Meme
            </button>
          </div>

          <div className="datalist">
            <select
              list="dataListTemplates"
              id="dataListTemplates"
              name="dataListTemplates"
            >
              <option key="dataID-default" value="default">
                --Please choose an option--
              </option>

              {/*
              {datalist[0].map((d) => {
                return (
                  <option key={`dataID-${d.id}`} value={d.id}>
                    {d.id}
                  </option>
                );
              })}

            */}
            </select>
          </div>
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
