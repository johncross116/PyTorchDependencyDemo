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

  const python = spawn(pythonCmd, ["./scripts/deliverables/codes/torch_sample.py"]);
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

