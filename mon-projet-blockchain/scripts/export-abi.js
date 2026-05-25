const fs = require("fs");
const path = require("path");
const artifact = require("../artifacts/contracts/DatasetRegistry.sol/DatasetRegistry.json");
const out = `export const CONTRACT_ADDRESS = "0x1275D096B9DBf2347bD2a131Fb6BDaB0B4882487";
export const ROLES = { AUCUN: 0, EVALUATEUR: 1, CONTRIBUTEUR: 2, ADMINISTRATEUR: 3 };
export const ROLE_LABELS = ["Aucun", "Évaluateur", "Contributeur", "Administrateur"];
export const CONTRACT_ABI = ${JSON.stringify(artifact.abi, null, 2)};
`;
fs.writeFileSync(path.join(__dirname, "../../frontend/src/contract.js"), out);
