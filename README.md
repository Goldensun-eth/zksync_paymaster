# ZkSync Paymaster

[YouTube video](https://www.youtube.com/watch?v=7rC9rjPtxBs)

[zkSolc-Bin Compiler](https://github.com/matter-labs/zksolc-bin/blob/main/macosx-amd64/zksolc-macosx-amd64-v1.4.1)

[IPaymaster Interface Code](https://github.com/matter-labs/era-contracts/blob/main/system-contracts/contracts/interfaces/IPaymaster.sol)

[zkSync Ethers](https://www.npmjs.com/package/zksync-ethers)

-   Make sure `solc` is available on the system. Check with `solc --version`. If not, use `brew install solidity`

## Check to make sure binary compiler is working

1. Download binary compiler from zkSolc repo
2. Create basic contract to test compiling
3. Run the following `chmod +x ./zksolc-macosx-amd64-v1.4.1  `
4. Run the following `./zksolc-macosx-amd64-v1.4.1 --combined-json abi,bin contracts/Paymaster.sol > artifacts/Paymaster.json`

## Generate a private key locally

```bash
$ node
> require('crypto').randomBytes(32).toString('hex')
> .exit
```

## Run script to create Contract

```bash
$ node scripts/deploy.js

0x45Be9d07374cbB4195187f8FA2458b43696D9de1 # Deploy wallet address
5000000000000000n # initial balance (.005 ETH)
0x2D4a1DF404136DC98540a5e7244A1ac52ba22584 # Paymaster address
```

## Run script to sponsor gas

```bash
$ node scripts/gasSponsor.js
Destination address 0
{
  transaction: TransactionResponse {
    provider: Provider { _contractAddresses: {} },
    blockNumber: null,
    blockHash: null,
    index: undefined,
    hash: '0x786e847b261d3754a7e7213b069883b0f11ccfd07da45084d76b13a5065821b8',
    type: 113,
    to: '0x2d4A1df404136DC98540A5E7244A1ac52Ba22585',
    from: '0xA0bfc908E057CfA1Ea9eaDD8B5b3aAdBB65C8BBE',
    nonce: 0,
    gasLimit: 7517422n,
    gasPrice: undefined,
    maxPriorityFeePerGas: 54564953n,
    maxFeePerGas: 54564953n,
    maxFeePerBlobGas: null,
    data: '0x1337',
    value: 0n,
    chainId: 300n,
    signature: Signature { r: "0x0000000000000000000000000000000000000000000000000000000000000000", s: "0x0000000000000000000000000000000000000000000000000000000000000000", yParity: 0, networkV: null },
    accessList: null,
    blobVersionedHashes: null,
    l1BatchNumber: undefined,
    l1BatchTxIndex: undefined
}

```
