const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DatasetRegistry", function () {
  let registry;
  let admin, contributeur, evaluateur, autre;

  const Role = { AUCUN: 0, EVALUATEUR: 1, CONTRIBUTEUR: 2, ADMINISTRATEUR: 3 };

  beforeEach(async function () {
    [admin, contributeur, evaluateur, autre] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("DatasetRegistry");
    registry = await Factory.deploy();
    await registry.waitForDeployment();

    await registry.connect(admin).attribuerRole(contributeur.address, Role.CONTRIBUTEUR);
    await registry.connect(admin).attribuerRole(evaluateur.address, Role.EVALUATEUR);
  });

  it("attribue le rôle administrateur au déployeur", async function () {
    expect(await registry.obtenirRole(admin.address)).to.equal(Role.ADMINISTRATEUR);
  });

  it("refuse l'ajout de dataset sans rôle contributeur", async function () {
    await expect(
      registry.connect(autre).ajouterDataset("Test", "Desc")
    ).to.be.revertedWith("Permission refusee");
  });

  it("permet à un contributeur d'ajouter un dataset", async function () {
    await registry.connect(contributeur).ajouterDataset("Images", "Collection d'images");
    const ds = await registry.obtenirDataset(1);
    expect(ds.nom).to.equal("Images");
    expect(ds.actif).to.equal(true);
  });

  it("permet à un évaluateur de noter et récompense en tokens", async function () {
    await registry.connect(contributeur).ajouterDataset("Data", "Desc");
    await registry.connect(evaluateur).noterDataset(1, 4);

    const ds = await registry.obtenirDataset(1);
    expect(ds.moyenne).to.equal(4);
    expect(ds.nombreNotes).to.equal(1);
    expect(await registry.obtenirNoteUtilisateur(evaluateur.address, 1)).to.equal(4);
    expect(await registry.obtenirTokens(evaluateur.address)).to.equal(10);
  });

  it("permet de modifier une note existante sans double récompense", async function () {
    await registry.connect(contributeur).ajouterDataset("Data", "Desc");
    await registry.connect(evaluateur).noterDataset(1, 3);
    await registry.connect(evaluateur).noterDataset(1, 5);

    const ds = await registry.obtenirDataset(1);
    expect(ds.moyenne).to.equal(5);
    expect(ds.nombreNotes).to.equal(1);
    expect(await registry.obtenirTokens(evaluateur.address)).to.equal(10);
  });

  it("permet au propriétaire de noter son propre dataset", async function () {
    await registry.connect(contributeur).ajouterDataset("Data", "Desc");
    await registry.connect(contributeur).noterDataset(1, 5);
    const ds = await registry.obtenirDataset(1);
    expect(ds.moyenne).to.equal(5);
    expect(ds.nombreNotes).to.equal(1);
  });

  it("seul l'administrateur peut attribuer des rôles", async function () {
    await expect(
      registry.connect(contributeur).attribuerRole(autre.address, Role.EVALUATEUR)
    ).to.be.revertedWith("Administrateur requis");
  });
});
