# Meme Generator Web App

## Overview

Welcome to the Meme Generator Web App, a React-based application designed to make meme creation easy using the [memegen.link](https://memegen.link/) website.

## Features

### Basic Functionality

- **Text Input:**
  - Users can easily input text for both the top and bottom sections of the meme.

- **Preview Generated Meme:**
  - Dynamically preview memes with the image element labeled as `data-test-id="meme-image"`.
  - The meme is instantly displayed upon the page's initial load, offering users an immediate preview.

- **Change Meme Template:**
  - Select different meme templates, featuring a variety of background images.
  - The meme template selector is intuitively labeled "Meme template," with specific instructions to choose the Doge meme template.

- **Download Meme:**
  - Empower users to download their created memes with a simple click on the "Download" button.
  - The download button is conveniently labeled for an easy and straightforward user experience.

- **Optimized Image Generation:**
  - Enhance performance by generating meme images only on button click, avoiding unnecessary generation with every keypress.
  - The dedicated "Generate Meme" button is labeled with `data-test-id="generate-meme"`.

- **Favicon:**
  - The app includes a unique favicon, adding a distinctive touch to the overall user experience.

### Implementation

1. **User Interface:**
   - Crafted an intuitive UI with labeled input fields, a live meme preview, and user-friendly selectors.

2. **Optimization:**
   - Optimized meme image generation to improve performance by triggering generation only when the user clicks the "Generate Meme" button.

3. **Download Functionality:**
   - Enabled users to effortlessly download their created memes.

4. **Favicon Integration:**
   - Designed and seamlessly integrated a favicon to give the app a unique and identifiable visual mark.

## How to Run

1. **Clone the Repository:**
   - `git clone <repository-url>`

2. **Navigate to the Project Directory:**
   - `cd meme-generator-web-app`

3. **Install Dependencies:**
   - `npm install`

4. **Start the Development Server:**
   - `npm start`

5. **Access the Application:**
   - Open your browser and visit `http://localhost:3000` to explore and enjoy the Meme Generator Web App.

Feel free to delve into the codebase, contribute improvements, or leverage it as a reference for your projects. If you have suggestions or ideas to enhance the implementation, don't hesitate to open an issue or submit a pull request.

Happy meme-making!
