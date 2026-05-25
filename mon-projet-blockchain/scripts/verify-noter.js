const hre = require("hardhat");

async function main() {
  const adresse = "0x05Aa229Aec102f78CE0E852A812a388F076Aa555";
  const registry = await hre.ethers.getContractAt("DatasetRegistry", adresse);
  const [admin] = await hre.ethers.getSigners();
  await registry.connect(admin).ajouterDataset("WARDA", "test");
  await registry.connect(admin).noterDataset(1, 3);
  const ds = await registry.obtenirDataset(1);
  console.log("Proprietaire peut noter — moyenne:", ds.moyenne.toString());
}

main();
