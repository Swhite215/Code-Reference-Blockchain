// Import the NFTStorage class and File constructor from the 'nft.storage' package
const { NFTStorage, File } = require('nft.storage');
const axios = require("axios");

// The 'mime' npm package helps us set the correct file type on our File objects
const mime = require('mime')

// The 'fs' builtin module on Node.js provides access to the file system
const { readFile } = require('node:fs/promises');

// The 'path' module provides helpers for manipulating filesystem paths
const path = require('path')

const secrets = require('./secrets/token.json')

// Paste your NFT.Storage API key into the quotes:
const endpoint = 'https://api.nft.storage'
const NFT_STORAGE_KEY = secrets.token;

// GLTF Pipeline
const gltfPipeline = require("gltf-pipeline");
const fsExtra = require("fs-extra");
const glbToGltf = gltfPipeline.glbToGltf;

async function main() {
    // Read in GLB
    let glb = await readFile(path.join(__dirname + "/" + "758_NFT_AWARDS_DESKTOP_FITS.glb"));

    // Convert to GLTF
    let results = await glbToGltf(glb);

    // Parse to JSON
    let json = results.gltf;

    // Upload Data
    uploadGLTF(json);
}

// async function main() {
//     // Read in GLTF
//     let rawData = await readFile(path.join(__dirname + "/" + "monkey.gltf"));

//     // Parse to JSON
//     let json = JSON.parse(rawData);

//     // Upload Data
//     uploadGLTF(json);
// }

async function uploadGLTF(json) {
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