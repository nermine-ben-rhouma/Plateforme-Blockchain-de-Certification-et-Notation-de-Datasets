export const CONTRACT_ADDRESS = "0x8464135c8F25Da09e49BC8782676a84730C318bC";
export const ROLES = { AUCUN: 0, EVALUATEUR: 1, CONTRIBUTEUR: 2, ADMINISTRATEUR: 3 };
export const ROLE_LABELS = ["Aucun", "Évaluateur", "Contributeur", "Administrateur"];
export const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "nom",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "proprietaire",
        "type": "address"
      }
    ],
    "name": "DatasetAjoute",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "noteur",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "note",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "modification",
        "type": "bool"
      }
    ],
    "name": "DatasetNote",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "auteur",
        "type": "address"
      }
    ],
    "name": "DatasetSupprime",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "utilisateur",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "enum DatasetRegistry.Role",
        "name": "role",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "attribuePar",
        "type": "address"
      }
    ],
    "name": "RoleAttribue",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "administrateur",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_nom",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      }
    ],
    "name": "ajouterDataset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_utilisateur",
        "type": "address"
      },
      {
        "internalType": "enum DatasetRegistry.Role",
        "name": "_role",
        "type": "uint8"
      }
    ],
    "name": "attribuerRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "datasets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "nom",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "proprietaire",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "totalNotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nombreNotes",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "actif",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_montant",
        "type": "uint256"
      }
    ],
    "name": "modifierRecompense",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nombreDatasets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "noteUtilisateur",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_note",
        "type": "uint256"
      }
    ],
    "name": "noterDataset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "obtenirDataset",
    "outputs": [
      {
        "internalType": "string",
        "name": "nom",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "proprietaire",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "moyenne",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nombreNotes",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "actif",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_utilisateur",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "obtenirNoteUtilisateur",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_utilisateur",
        "type": "address"
      }
    ],
    "name": "obtenirRole",
    "outputs": [
      {
        "internalType": "enum DatasetRegistry.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_utilisateur",
        "type": "address"
      }
    ],
    "name": "obtenirTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recompenseToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "roles",
    "outputs": [
      {
        "internalType": "enum DatasetRegistry.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "supprimerDataset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "tokenSolde",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
