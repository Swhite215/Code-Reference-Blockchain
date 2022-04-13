const fs = require('fs')
const { packToFs } = require('ipfs-car/pack/fs')
const { CarIndexedReader } = require('@ipld/car')
const { NFTStorage, File } = require('nft.storage');
const secrets = require('./secrets/token.json')
const path = require("path");

const endpoint = 'https://api.nft.storage' // the default
const token = secrets.token // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ endpoint, token })

  // locally chunk'n'hash the file to get the CID and pack the blocks in to a CAR
  const { root } = await packToFs({
    input: `${path.join(__dirname + "/" + "video.mov")}`,
    output: `${path.join(__dirname + "/" + "video.car")}`,
  })
  const expectedCid = root.toString()
  console.log({ expectedCid })

  // Create the car reader
  const carReader = await CarIndexedReader.fromFile(
    `${path.join(__dirname + "/" + "video.car")}`
  )

  console.log('go')

  // send the CAR to nft.storage, the returned CID will match the one we created above.
  const cid = await storage.storeCar(carReader)

  // verify the service stored the CID we expected
  const cidsMatch = expectedCid === cid
  console.log({ cid, expectedCid, cidsMatch })

  // check that the CID is pinned
  const status = await storage.status(cid)
  console.log(status)

  // Delete car file created
  await fs.promises.rm(`${path.join(__dirname + "/" + "video.car")}`)
}
main()