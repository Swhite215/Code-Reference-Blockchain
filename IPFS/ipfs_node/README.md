
# Project Objective

Demonstrates the use of ipfs npm package to add and pin a file to IPFS, and later retrieve and write that file to disk.

## Dependencies

Interplanetary File System Package: 
[ipfs](https://www.npmjs.com/package/ipfs)
## Deployment

Run the below commands inside root directory

#### 1. Install Node Dependencies
```bash
  npm i
```

#### 2. Start Server

```bash
  node app.js
```

#### 3. Make a POST request to server to trigger file upload from disk

```bash
  curl -X POST http://localhost:3333/upload-file/test
```

#### 4. Verify curl response matches below

```json
  {"path":"QmU1VMMxdKEK5HhoTbc4qAvWEmzSLZgDjHBNbQfsJQWQWd","cid":{"code":112,"version":0,"hash":{"0":18,"1":32,"2":84,"3":61,"4":129,"5":100,"6":170,"7":50,"8":179,"9":248,"10":132,"11":96,"12":89,"13":214,"14":29,"15":33,"16":25,"17":118,"18":115,"19":190,"20":236,"21":123,"22":212,"23":4,"24":127,"25":118,"26":21,"27":203,"28":103,"29":137,"30":103,"31":66,"32":222,"33":10}},"size":32,"mode":420}
```

## Issues

This solution involves running an IPFS node on the server side. This means any files uploaded to this node, are not guaranteed to persist after the node is taken down, even if the file is pinned.