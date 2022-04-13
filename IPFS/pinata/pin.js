const fs = require('fs');
const path = require('path');
const pinataSDK = require('@pinata/sdk');

// Get API Key and Secret Key from your Pinata account:
// https://app.pinata.cloud/keys
const pinata = pinataSDK('ApiKey', 'SecretKey');

async function main() {

    const imgPath = path.join(__dirname, '.', 'img');

    const files = fs.readdirSync(imgPath);

    console.log(files);

    for (let i = 0; i < files.length; i++) {
        filePath = imgPath + "/" + files[i];
        console.log("Pinning " + filePath + "...");
        const readableStreamForFile = fs.createReadStream(imgPath + "/" + files[i]);
        let result = await pinata.pinFileToIPFS(readableStreamForFile);
        console.log(result.IpfsHash);
    }
}

main();