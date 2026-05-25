// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DatasetRegistry {

    enum Role {
        AUCUN,           // 0 — aucune permission
        EVALUATEUR,      // 1 — peut noter les datasets
        CONTRIBUTEUR,    // 2 — peut ajouter et noter
        ADMINISTRATEUR   // 3 — gestion complète et attribution des rôles
    }

    struct Dataset {
        uint256 id;
        string nom;
        string description;
        address proprietaire;
        uint256 totalNotes;
        uint256 nombreNotes;
        bool actif;
    }

    uint256 public nombreDatasets;
    uint256 public recompenseToken = 10;
    address public administrateur;

    mapping(uint256 => Dataset) public datasets;
    mapping(address => uint256) public tokenSolde;
    mapping(address => Role) public roles;
    mapping(address => mapping(uint256 => uint256)) public noteUtilisateur;

    event DatasetAjoute(uint256 id, string nom, address proprietaire);
    event DatasetNote(uint256 id, address noteur, uint256 note, bool modification);
    event DatasetSupprime(uint256 id, address auteur);
    event RoleAttribue(address utilisateur, Role role, address attribuePar);

    modifier seulementRole(Role _roleMinimum) {
        require(roles[msg.sender] >= _roleMinimum, "Permission refusee");
        _;
    }

    modifier seulementAdministrateur() {
        require(roles[msg.sender] == Role.ADMINISTRATEUR, "Administrateur requis");
        _;
    }

    constructor() {
        administrateur = msg.sender;
        roles[msg.sender] = Role.ADMINISTRATEUR;
        emit RoleAttribue(msg.sender, Role.ADMINISTRATEUR, msg.sender);
    }

    function attribuerRole(address _utilisateur, Role _role) public seulementAdministrateur {
        require(_utilisateur != address(0), "Adresse invalide");
        roles[_utilisateur] = _role;
        emit RoleAttribue(_utilisateur, _role, msg.sender);
    }

    function obtenirRole(address _utilisateur) public view returns (Role) {
        return roles[_utilisateur];
    }

    function ajouterDataset(string memory _nom, string memory _description) public seulementRole(Role.CONTRIBUTEUR) {
        nombreDatasets++;
        datasets[nombreDatasets] = Dataset(
            nombreDatasets,
            _nom,
            _description,
            msg.sender,
            0,
            0,
            true
        );
        emit DatasetAjoute(nombreDatasets, _nom, msg.sender);
    }

    function noterDataset(uint256 _id, uint256 _note) public seulementRole(Role.EVALUATEUR) {
        require(_id > 0 && _id <= nombreDatasets, "Dataset inexistant");
        require(datasets[_id].actif, "Dataset desactive");
        require(_note >= 1 && _note <= 5, "Note entre 1 et 5");

        uint256 ancienneNote = noteUtilisateur[msg.sender][_id];
        bool modification = ancienneNote > 0;

        if (modification) {
            datasets[_id].totalNotes = datasets[_id].totalNotes - ancienneNote + _note;
        } else {
            datasets[_id].totalNotes += _note;
            datasets[_id].nombreNotes += 1;
            tokenSolde[msg.sender] += recompenseToken;
        }

        noteUtilisateur[msg.sender][_id] = _note;
        emit DatasetNote(_id, msg.sender, _note, modification);
    }

    function supprimerDataset(uint256 _id) public {
        require(_id > 0 && _id <= nombreDatasets, "Dataset inexistant");
        require(datasets[_id].actif, "Deja supprime");
        require(
            msg.sender == datasets[_id].proprietaire || roles[msg.sender] == Role.ADMINISTRATEUR,
            "Permission refusee"
        );
        datasets[_id].actif = false;
        emit DatasetSupprime(_id, msg.sender);
    }

    function modifierRecompense(uint256 _montant) public seulementAdministrateur {
        recompenseToken = _montant;
    }

    function obtenirDataset(uint256 _id) public view returns (
        string memory nom,
        string memory description,
        address proprietaire,
        uint256 moyenne,
        uint256 nombreNotes,
        bool actif
    ) {
        require(_id > 0 && _id <= nombreDatasets, "Dataset inexistant");
        Dataset memory d = datasets[_id];
        uint256 moy = d.nombreNotes > 0 ? d.totalNotes / d.nombreNotes : 0;
        return (d.nom, d.description, d.proprietaire, moy, d.nombreNotes, d.actif);
    }

    function obtenirNoteUtilisateur(address _utilisateur, uint256 _id) public view returns (uint256) {
        require(_id > 0 && _id <= nombreDatasets, "Dataset inexistant");
        return noteUtilisateur[_utilisateur][_id];
    }

    function obtenirTokens(address _utilisateur) public view returns (uint256) {
        return tokenSolde[_utilisateur];
    }
}
