
// Express
const express = require('express')
const app = express()
const port = 3333

// Basic Requires
const path = require("path");
const fs = require("fs");
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// IPFS Requires
const IPFS = require("ipfs");
const toBuffer = require('it-to-buffer');

// IPFS Global Node
let node;

app.get('/', (req, res) => {
  res.send('Hello World!')
});


// Using IPFS Regular Files API
app.post('/upload-file/:fileName', async (req, res) => {
    // Get File
    let filePath = path.join(__dirname + "/" + req.params.fileName + ".txt");
    let file = await readFileAsync(filePath);

    // Add File to IPFS
    let result = await node.add(file, { pin: true });

    // Log Results
    console.log(`Added File CID: ${result.cid}`);

    // Test Getting File Chunks and Converting to String
    const bufferedContents = await toBuffer(node.cat(result.cid));
    const string = new TextDecoder().decode(bufferedContents);

    console.log("File Contents:", string);

    // Write File
    let writeFilePath = path.join(__dirname + "/" + "writeTest" + ".txt");
    let writtenFile = await writeFileAsync(writeFilePath, string);

    // Return CID
    res.send(result);

});

// Using IPFS Mutable File System API

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