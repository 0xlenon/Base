const hre = require("hardhat");

async function main() {
  console.log("Deploying BaseGambit...");

  const BaseGambit = await hre.ethers.getContractFactory("BaseGambit");
  const baseGambit = await BaseGambit.deploy();

  await baseGambit.waitForDeployment();

  const address = await baseGambit.getAddress();
  console.log("BaseGambit deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
