const { Provider, types, Wallet, ContractFactory } = require('zksync-ethers');
const paymasterJson = require('../artifacts/Paymaster.json');

const { abi, bin: bytecode } =
    paymasterJson.contracts['contracts/Paymaster.sol:Paymaster'];

const provider = Provider.getDefaultProvider(types.Network.Sepolia); // zkSync Era testnet (L2)

const PRIVATE_KEY = process.env.DEPLOY_WALLET_PRIVATE_KEY; // Create a new wallet and fund it with some testnet ETH
const wallet = new Wallet(PRIVATE_KEY, provider);

(async () => {
    console.log(wallet.address);
    console.log(await wallet.getBalance());
    const contractFactory = new ContractFactory(abi, bytecode, wallet);
    const result = await contractFactory.deploy();
    const contract = await result.waitForDeployment();
    console.log(await contract.getAddress());
})();
