const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const Factory = await hre.ethers.getContractFactory("DatasetRegistry");
  const contrat = await Factory.deploy();
  await contrat.waitForDeployment();
  const adresse = await contrat.getAddress();

  const artifact = require("../artifacts/contracts/DatasetRegistry.sol/DatasetRegistry.json");
  const contractJs = path.join(__dirname, "../../frontend/src/contract.js");
  let contenu = fs.readFileSync(contractJs, "utf8");
  contenu = contenu.replace(
    /export const CONTRACT_ADDRESS = "0x[a-fA-F0-9]{40}";/,
    `export const CONTRACT_ADDRESS = "${adresse}";`
  );
  const abiStart = contenu.indexOf("export const CONTRACT_ABI = ");
  if (abiStart !== -1) {
    const avant = contenu.slice(0, abiStart);
    contenu =
      avant +
      `export const CONTRACT_ABI = ${JSON.stringify(artifact.abi, null, 2)};\n`;
  }
  fs.writeFileSync(contractJs, contenu);

  console.log("Contrat déployé:", adresse);
  console.log("frontend/src/contract.js mis à jour");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
