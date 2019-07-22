const axios = require('axios');
const fs = require('fs');

const INTERVAL = 30000;
const URL = 'http://docs.developer.amazonservices.com/en_US/dev_guide/index.html';

function setup() {
  runCaller(URL, INTERVAL);
}

function appendTextToAvailabilityFile(text) {
  fs.appendFile('response/availability.txt', text, function(err) {
    if (err) throw err;
  });
}

function storeWebsiteCopy(data) {
  fs.writeFile('response/web.html', data, function(err) {
    if (err) {
      console.log('Error writing to file web.html');
    }
  });
}

async function runCaller(url, seconds) {
  console.log('Starting at: ', new Date().toTimeString());
  try {
    const { data } = await axios.get(url)
    const message = `Web available at ${new Date().toTimeString()} \n`
    console.log(message);
    appendTextToAvailabilityFile(message);
    storeWebsiteCopy(data);
    setTimeout(runCaller, seconds);
    
  } catch (e) {
    console.log(`Timed out at ${new Date().toTimeString()}`);
    setTimeout(runCaller, seconds);
  }
}

setup();
