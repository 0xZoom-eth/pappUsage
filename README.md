# PAPP Usage

A script to pull token ids of the Psychedelics Anonymous PAPP NFT, and show whether they have been used for burning or not.

## How To Use

1) Install dependencies (ethers and csv-writer) with `npm install` or `yarn`.
2) Open `papp-usage.js` and fill out the options below. The Token contract number and chain are entered for you:

- STARTING_TOKEN_ID: The script will start checking owners at this ID (defaults to 0).
- HIGHEST_TOKEN_ID: The script will check owners of IDs up to this number (inclusive).
- PROVIDER_ENDPOINT: A URL from Infura or Alchemy to create a JSON RPC provider.

3) Run from the terminal with `npm run start`. It should check approximately 200 tokens per minute.

