// Import the NFTStorage class and File constructor from the 'nft.storage' package
const { NFTStorage, File } = require('nft.storage');
const axios = require("axios");

// The 'mime' npm package helps us set the correct file type on our File objects
const mime = require('mime')

// The 'fs' builtin module on Node.js provides access to the file system
const fs = require('fs')

// The 'path' module provides helpers for manipulating filesystem paths
const path = require('path')

const secrets = require('./secrets/token.json')

// Paste your NFT.Storage API key into the quotes:
const endpoint = 'https://api.nft.storage'
const NFT_STORAGE_KEY = secrets.token;

async function main() {
    // Read in GLTF
    let rawData = await readFile(path.join(__dirname + "/" + "monkey.gltf"));

    // Parse to JSON
    let json = JSON.parse(rawData);

    // Upload Data
    uploadGLTF(json);
}

async function uploadGLTF() {
    try {

        let headers = {
            "Authorization":  `Bearer ${NFT_STORAGE_KEY}`,
            "Content-Type": "application/json"
        }

        let req = await axios.post(`${endpoint}/upload`, JSON.stringify(json), { headers });

        if (req.status == 200 && req.data.ok) {
            let metaPath = `https://nftstorage.link/ipfs/${req.data.value.cid}`
            return metaPath;
        } else {
            return false;
        }

    } catch(e) {
        console.log(e);
    }
}


main();