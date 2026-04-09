[DEPLOYMENT.md](https://github.com/user-attachments/files/26587949/DEPLOYMENT.md)
# PromptPay Smart Contract Deployment (Base Sepolia)

This guide explains how to deploy the `PromptPay.sol` contract to the Base Sepolia Testnet.

## Prerequisites
- [Foundry](https://book.getfoundry.sh/getting-started/installation) installed.
- A wallet with Base Sepolia ETH (Get some from [Base Faucet](https://www.base.org/faucets)).
- Your Private Key.

## Deployment Command

Run the following command in your terminal:

```bash
forge create --rpc-url https://sepolia.base.org \
  --private-key YOUR_PRIVATE_KEY \
  contracts/PromptPay.sol:PromptPay
```

## Verification (Optional)

To verify the contract on BaseScan:

```bash
forge verify-contract <DEPLOYED_ADDRESS> \
  contracts/PromptPay.sol:PromptPay \
  --chain base-sepolia \
  --watch
```

## Contract Interface (ABI)

The contract address should be updated in `src/constants.ts` once deployed.
