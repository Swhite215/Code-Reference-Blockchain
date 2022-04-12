// Add File
let result = await ipfs.add(data, [options])

// Add Files
ipfs.addAll([catPic, dogPic, giraffePic])

// Iterate Through File Results
const results = []

for await (const resultPart of ipfs.addAll([catPic, dogPic, giraffePic])) {
    results.push(resultPart)
}

// Get All Results
const allResults = await all(ipfs.addAll([catPic, dogPic, giraffePic]))

// Retrieve File Contents
let contents = await ipfs.cat(ipfsPath, [options])

// Retrieving Contents and Putting them Together
const bufferedContents = await toBuffer(ipfs.cat('QmWCscor6qWPdx53zEQmZvQvuWQYxx1ARRCXwYVE4s9wzJ')) // returns a Buffer
const stringContents = bufferedContents.toString() // returns a string

// Add Files in a Directory
let addedFiles = await ipfs.addAll([
    {
        path: 'adorable-kitty.jpg',
        content: catPic1
    },
    {
        path: 'cat-drinking-milk.jpg',
        content: catPic2
    }
], { wrapWithDirectory: true })

/// Add Files in a Directory
ipfs.add(file, { wrapWithDirectory: true }) // add a single file
ipfs.addAll([file1, file2], { wrapWithDirectory: true }) // add multiple files via an array

// Add Files
const run = async (files) => {
    let fileObjectsArray = files.map((file) => {
      return {
        path: file.name,
        content: file
      }
    })
  
    const results = await all(ipfs.addAll(fileObjectsArray, { wrapWithDirectory: true }))
  
    return results
  }

// List Files
const filesResults = []

for await (const resultPart of ipfs.ls('/catPics')) {
    filesResults.push(resultPart)
}

// List Files
const allFileResults = await all(ipfs.ls('/catPics'))

