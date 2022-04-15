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

// MUTABLE FILE SYSTEM API 

// Check status of a file or directory
await ipfs.files.stat('/stuff')

// Add a file
await ipfs.files.write(path, content, [options])
await ipfs.files.write('/cat.jpg', catPic, { create: true }) // no return value

// View Files in Directory
const fileResults = []

for await (const resultPart of ipfs.files.ls('/catPics')) {
  fileResults.push(resultPart)
}

// View Files in Directory - it-all package
await all(ipfs.files.ls('/catPics'))

// Add Directory to Root
await ipfs.files.mkdir('/images')

// Add Directory and Create Parents if Necessary
await ipfs.files.mkdir('/my/beautiful/images', { parents: true })

// move a single file into a directory
await ipfs.files.mv('/source-file.txt', '/destination-directory')

// move a directory into another directory
await ipfs.files.mv('/source-directory', '/destination-directory')

// overwrite the contents of a destination file with the contents of a source file
await ipfs.files.mv('/source-file.txt', '/destination-file.txt')

// move multiple files into a directory
await ipfs.files.mv('/source-file-1.txt', '/source-file-2.txt', '/source-file-3.txt', '/destination-directory')

// move multiple files into a directory using array of source paths
await ipfs.files.mv(...fromArray, '/destination-directory')

// Elaborate Move Example
await Promise.all(files.map(f => ipfs.files.write('/' + f.name, f, { create: true })))
await ipfs.files.mkdir('/some/stuff', { parents: true })
const rootDirectoryContents = await all(ipfs.files.ls('/'))
const filepathsToMove = rootDirectoryContents.filter(file => file.type === 0).map(file => '/' + file.name)
await ipfs.files.mv(...filepathsToMove, '/some/stuff')
const someStuffDirectoryContents = await all(ipfs.files.ls('/some/stuff'))

// copy a single file into a directory
await ipfs.files.cp('/source-file.txt', '/destination-directory')
await ipfs.files.cp('/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks', '/destination-directory')

// copy multiple files into a directory (note the two acceptable formats with or without [ ])
await ipfs.files.cp('/source-file-1.txt', '/source-file-2.txt', '/destination-directory')
await ipfs.files.cp(['/source-file-1.txt', '/source-file-2.txt'], '/destination-directory')
await ipfs.files.cp('/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks',
 '/ipfs/QmWGeRAEgtsHW3jk7U4qW2CyVy7eA2mFRVbk1nb24jFyre', '/destination-directory')
await ipfs.files.cp(['/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks',
 '/ipfs/QmWGeRAEgtsHW3jk7U4qW2CyVy7eA2mFRVbk1nb24jFyre'], '/destination-directory')

// copy a directory into another directory
await ipfs.files.cp('/source-directory', '/destination-directory')
await ipfs.files.cp('/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks', '/destination-directory')

// Read Contents of a File
let bufferedContents = await toBuffer(ipfs.files.read('/directory/some-file.txt'))  // a buffer
let contents = bufferedContents.toString() // a string

// remove a file
await ipfs.files.rm('/my/beautiful/file.txt')

// remove multiple files (note the two acceptable formats with or without [ ])
await ipfs.files.rm('/my/beautiful/file.txt', '/my/other/file.txt')
await ipfs.files.rm(['/my/beautiful/file.txt', '/my/other/file.txt'])

// remove a directory and its contents
await ipfs.files.rm('/my/beautiful/directory', { recursive: true })

// remove a directory only if it is empty
await ipfs.files.rm('/my/beautiful/directory')