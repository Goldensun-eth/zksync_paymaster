const { Provider, types, Wallet } = require('zksync-ethers');
const { getPaymasterParams } = require('zksync-ethers/build/paymaster-utils');

const provider = Provider.getDefaultProvider(types.Network.Sepolia); // zkSync Era testnet (L2)

const paymasterAddress = '0x2D4a1DF404136DC98540a5e7244A1ac52ba22584'; // From ContractFactory in deploy.js
const destinationAddress = '0x2d4A1df404136DC98540A5E7244A1ac52Ba22585'; // Add +1 to the last digit, paste address into block explorer and copy over new checksum
const PRIVATE_KEY = process.env.GAS_SPONSOR_PRIVATE_KEY; // Slightly different address
const wallet = new Wallet(PRIVATE_KEY, provider);

(async () => {
    const paymasterParams = getPaymasterParams(paymasterAddress, {
        type: 'General',
        innerInput: new Uint8Array(),
    });

    console.log(`Destination address ${await wallet.getBalance()}`);

    const transaction = await wallet.sendTransaction({
        to: destinationAddress,
        data: '0x1337',
        customData: {
            paymasterParams,
        },
    });

    console.log({ transaction });
})();
