const ethers = require("ethers")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const TOKEN_ADDRESS = "0x11ca9693156929EE2e7E1470C5E1A55b413e9007";
const STARTING_TOKEN_ID = 0;
const HIGHEST_TOKEN_ID = 6859;
const PROVIDER_ENDPOINT = 'Enter Infura or Alchemy JSON RPC here';
const CHAIN_ID = 1;
const FORMAT = "pappUsage"; 

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_ENDPOINT, CHAIN_ID);
const abi = ["function pappUsed (uint256) view returns (bool)"];
const contract = new ethers.Contract(TOKEN_ADDRESS, abi, provider);

async function pappUsage() {
    const pappUsageWriter = createCsvWriter({
        path: 'pappUsage.csv',
        header: [
          {id: 'id', title: 'ID'},
          {id: 'bool', title: 'Used'},
        ]
    });

    for (let i = 0; i <= HIGHEST_TOKEN_ID; i++) {
        try {
            if (i % 100 == 0) console.log(`Checkpoint: ${i}`)
            const papp = await contract.pappUsed(i);            
            dbData = [{ id: i, bool: papp }];
            await pappUsageWriter.writeRecords(dbData)
        } catch (err) {
            console.log(`Token ${i} Error:`)
            console.log(err)
            dbData = [{ id: i, address: 'ERROR' }];
            await pappUsageWriter.writeRecords(dbData)
        }
    }
}

async function main(format = "pappUsage") {
    const timeBefore = new Date().getTime();
    await pappUsage()
    
    const timeAfter = new Date().getTime();
    const timeTaken = (timeAfter - timeBefore) / 1000;
    console.log(`Script Completed. Total Run Time: ${timeTaken} Seconds`)
}

main(FORMAT)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
