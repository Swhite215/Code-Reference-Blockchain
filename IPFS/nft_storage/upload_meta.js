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

async function uploadMeta() {
    try {
        let requestBody = {
            name: "Basic NFT Metadata Test",
            description: "Basic description of NFT",
            image: "https://nftstorage.link/ipfs/CID",
            stl_url: "N/A",
            animation_url: "N/A"
        }

        let headers = {
            "Authorization":  `Bearer ${NFT_STORAGE_KEY}`,
            "Content-Type": "application/json"
        }

        let req = await axios.post(`${endpoint}/upload`, JSON.stringify(requestBody), { headers });

        console.log(req);
    } catch(e) {
        console.log(e);
    }
}


uploadMeta();