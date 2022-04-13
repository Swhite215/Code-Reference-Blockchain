
# Project Objective

Demonstrates the use of nft storage API to add and pin a file to IPFS, and later retrieve and write that file to disk

## Dependencies

NFT Storage API Key: 
[Documentation](https://nft.storage/docs/#get-an-api-token)
## Deployment

Run the below commands inside root directory

#### 1. Install Node Dependencies
```bash
  npm i
```

#### 2. Create secrets folder

```bash
  mkdir secrets
```

#### 3. Store access token in secrets folder

```bash
  touch secrets/token.json

  { token: tokenString }
```

#### 4. Run upload.js to store a simple image

```bash
  node upload.js <image-path> <name> <description>
```

#### 5. Run upload_car.js to store and pin a large video file using CAR

```bash
  node upload_car.js
```