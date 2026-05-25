const hre = require("hardhat");

async function main() {
  const DatasetRegistry = await hre.ethers.getContractFactory("DatasetRegistry");
  const contrat = await DatasetRegistry.deploy();
  await contrat.waitForDeployment();
  
  console.log("Contrat déployé à l'adresse:", await contrat.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});