const express = require("express");
const { join } = require("path");
const { spawn } = require('child_process');
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const { auth } = require('express-openid-connect');
const path = require('path');
const { exec } = require("child_process");
const fs = require('fs');

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "public")));

const useLinux = true;
// use 'python' for windows, and 'python3' for linux
const pythonCmd = useLinux ? 'python3' : 'python';

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});


app.get('/runStep4', async (req, res) => {
  console.log("About to call python... ");

  // Input is parameterized
  const python = spawn(pythonCmd, ["./scripts/deliverables/codes/pytorch_sample.py"]);
  let dataToSend = '';

  python.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
    // Append each stdout since there are multiple lines of output
    dataToSend += data;
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);

    if (data)
      dataToSend = 'Error running the python script: ' + data;
  });

  python.on('close', (code) => {
    if (code != 0) {
      console.log(`Error! exit code ${code}`);
    }

    console.log(`close: ${dataToSend}`);
    res.send(dataToSend);
  });
});
  


process.on("SIGINT", function() {
  process.exit();
});

module.exports = app;


// const numImages = 20;
// let imageContainersHtml = ""; // Start with an empty string

// for (let i = 1; i <= numImages; i++) {
//   const imageNumber = i.toString().padStart(2, "0"); // Ensure two digits

//   imageContainersHtml += `
//     <div class="image-container">
//       <img src="images/input/S${imageNumber}.jpg" onclick="selectImage(this, 'S${imageNumber}')">
//       <div class="image-text">S${imageNumber}</div>
//     </div>
//   `;
// }

// //res.send(imageContainersHtml);
// //res.render('public/js/app.js', { imageContainersHtml: imageContainersHtml });


