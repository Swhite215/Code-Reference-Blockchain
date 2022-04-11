
// Express
const express = require('express')
const app = express()
const port = 3333

// Basic Requires
const path = require("path");
const fs = require("fs");
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

// IPFS Requires
const IPFS = require("ipfs");
const toBuffer = require('it-to-buffer');

// IPFS Global Node
let node;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/upload-file/:fileName', async (req, res) => {
    // Get File
    let filePath = path.join(__dirname + "/" + req.params.fileName + ".txt");
    let file = await readFileAsync(filePath);

    // Add File to IPFS
    let result = await node.add(file);

    // Log Results
    console.log(`Added File CID: ${result.cid}`);

    // Test Getting File Chunks and Converting to String
    const chunks = [];
    for await (const chunk of node.cat(result.cid)) {
        chunks.push(chunk);
    }

    console.log("File Contents:", uint8ArrayConcat(chunks).toString());

    // Return CID
    res.send(result.cid);

});

// Create IPFS Node
createIPFSNode = async () => {
    node = await IPFS.create();
    const version = await node.version();

    console.log(`Version: ${version}`);
}

createIPFSNode();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});