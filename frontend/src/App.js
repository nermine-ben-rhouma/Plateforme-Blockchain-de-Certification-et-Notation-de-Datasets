import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, ROLE_LABELS, ROLES } from "./contract";

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Cabinet+Grotesk:wght@400;500;700;800&display=swap');

:root {
  --bg:       #f4f4f8;
  --surface:  #ffffff;
  --card:     #ffffff;
  --border:   #e4e4ec;
  --border2:  #c8c8d8;
  --text:     #18181f;
  --muted:    #7a7a95;
  --subtle:   #f0f0f6;
  --accent:   #6366f1;
  --accent2:  #8b5cf6;
  --green:    #059669;
  --yellow:   #d97706;
  --blue:     #2563eb;
  --red:      #dc2626;
  --mono:     'DM Mono', monospace;
  --sans:     'Cabinet Grotesk', sans-serif;
  --r:        13px;
  --r-sm:     8px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 248px 1fr;
}

/* ── SIDEBAR ── */
.sidebar {
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 6px;
  margin-bottom: 36px;
}

.logo-icon {
  width: 34px; height: 34px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.logo-name { font-size: 15px; font-weight: 800; color: var(--text); letter-spacing: -0.4px; }
.logo-tag  { font-size: 10px; color: var(--muted); font-family: var(--mono); letter-spacing: 0.5px; margin-top: 1px; }

.nav-section {
  font-size: 10px;
  font-family: var(--mono);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 0 8px;
  margin: 20px 0 6px;
}

.nav-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: var(--r-sm);
  border: none;
  background: none;
  cursor: pointer;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
  transition: all 0.15s;
  text-align: left;
}

.nav-btn:hover { background: var(--subtle); color: var(--text); }
.nav-btn.on    { background: #eef2ff; color: #4f46e5; }

.nav-btn .ni {
  width: 28px; height: 28px;
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}

.ni-g { background: #d1fae5; }
.ni-y { background: #fef3c7; }
.ni-p { background: #ede9fe; }

.sidebar-foot {
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.net-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: var(--r-sm);
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
}

.dot-live {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--green);
  animation: blink 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

.net-text { font-family: var(--mono); font-size: 11px; color: #065f46; }

.addr-pill {
  padding: 9px 12px;
  border-radius: var(--r-sm);
  background: var(--subtle);
  border: 1px solid var(--border);
}

.addr-label { font-size: 9px; font-family: var(--mono); color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; }
.addr-val   { font-size: 12px; font-family: var(--mono); color: var(--text); }

/* ── MAIN ── */
.main { padding: 36px 40px; overflow-y: auto; max-height: 100vh; }

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 32px;
}

.stat {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.stat-lbl {
  font-size: 10px;
  font-family: var(--mono);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.stat-val {
  font-size: 28px;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -1.5px;
  line-height: 1;
}

.stat-val.y { color: var(--yellow); }
.stat-val.g { color: var(--green); }
.stat-val.p { color: var(--accent); }

.stat-sub {
  font-size: 11px;
  font-family: var(--mono);
  color: var(--muted);
  margin-top: 5px;
}

/* Toast */
.toast {
  padding: 12px 16px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: var(--r);
  font-size: 13px;
  font-family: var(--mono);
  color: #78350f;
  margin-bottom: 24px;
  animation: fadeIn 0.2s ease;
}

.toast.ok  { background: #f0fdf4; border-color: #bbf7d0; color: #14532d; }
.toast.err { background: #fef2f2; border-color: #fecaca; color: #7f1d1d; }

@keyframes fadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }

/* Section */
.sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.sec-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.3px;
}

.chip {
  font-family: var(--mono);
  font-size: 10px;
  padding: 3px 10px;
  border-radius: 100px;
}

.chip-p { background: #ede9fe; color: #5b21b6; border: 1px solid #ddd6fe; }
.chip-g { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }

/* Form */
.fcard {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.flabel {
  display: block;
  font-size: 10px;
  font-family: var(--mono);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 7px;
}

.frow { display: grid; grid-template-columns: 1fr 110px; gap: 12px; }

input {
  width: 100%;
  padding: 10px 13px;
  background: var(--subtle);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text);
  font-size: 14px;
  font-family: var(--sans);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  margin-bottom: 14px;
}

input:focus {
  border-color: #a5b4fc;
  box-shadow: 0 0 0 3px #eef2ff;
  background: #fff;
}

input::placeholder { color: #c4c4d4; }

.ffoot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.fhint { font-size: 11px; font-family: var(--mono); color: var(--muted); }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: none;
  border-radius: var(--r-sm);
  font-family: var(--sans);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  padding: 9px 18px;
  transition: all 0.15s;
}

.btn:disabled { opacity: 0.45; cursor: not-allowed; }

.btn-p {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  box-shadow: 0 2px 8px rgba(99,102,241,0.25);
}
.btn-p:hover:not(:disabled) { filter: brightness(1.07); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(99,102,241,0.35); }

.btn-b {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}
.btn-b:hover:not(:disabled) { background: #dbeafe; }

.btn-g-out {
  background: var(--subtle);
  color: var(--muted);
  border: 1px solid var(--border);
}
.btn-g-out:hover { color: var(--text); background: var(--border); }

/* Dataset list */
.ds-list { display: flex; flex-direction: column; gap: 10px; }

.ds-item {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 16px 20px;
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 14px;
  align-items: start;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.12s;
}

.ds-item:hover {
  border-color: #a5b4fc;
  box-shadow: 0 4px 12px rgba(99,102,241,0.08);
  transform: translateX(2px);
}

.ds-id {
  width: 40px; height: 40px;
  border-radius: 9px;
  background: #eef2ff;
  border: 1px solid #e0e7ff;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 500;
  color: #4f46e5;
  flex-shrink: 0;
}

.ds-name { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
.ds-desc { font-size: 12px; color: var(--muted); margin-bottom: 10px; line-height: 1.5; }

.ds-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.meta    { font-family: var(--mono); font-size: 10px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
.stars   { color: #d97706; font-size: 11px; letter-spacing: 1px; }

/* Empty */
.empty {
  background: var(--card);
  border: 1px dashed var(--border2);
  border-radius: var(--r);
  padding: 48px;
  text-align: center;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 12px;
  line-height: 2;
}

/* Connect */
.cpage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 65vh;
  gap: 18px;
  text-align: center;
}

.cicon {
  width: 72px; height: 72px;
  border-radius: 20px;
  background: #eef2ff;
  border: 1px solid #e0e7ff;
  display: flex; align-items: center; justify-content: center;
  font-size: 34px;
  box-shadow: 0 4px 20px rgba(99,102,241,0.12);
}

.ctitle { font-size: 22px; font-weight: 800; color: var(--text); letter-spacing: -0.6px; }
.csub   { font-size: 13px; color: var(--muted); font-family: var(--mono); max-width: 260px; line-height: 1.7; }

.btn-connect {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  padding: 13px 36px;
  font-size: 15px;
  border-radius: var(--r);
  font-family: var(--sans);
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: 0 4px 16px rgba(99,102,241,0.3);
}
.btn-connect:hover { filter: brightness(1.07); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.4); }
`;

const Stars = ({ moyenne, nombreNotes }) => {
  if (nombreNotes === "0") return <span style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 10 }}>pas encore noté</span>;
  const n = Number(moyenne);
  return <>
    <span className="stars">{"★".repeat(n)}{"☆".repeat(5 - n)}</span>
    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", marginLeft: 5 }}>{moyenne}/5 · {nombreNotes} vote{nombreNotes !== "1" ? "s" : ""}</span>
  </>;
};

const toastClass = (msg) => {
  if (!msg) return "toast";
  if (msg.startsWith("✅")) return "toast ok";
  if (msg.startsWith("❌")) return "toast err";
  return "toast";
};

const extraireMessageErreur = (e) => {
  const raw = e?.error?.data?.message || e?.data?.message || e?.reason || e?.message || "";
  if (raw.includes("Permission refusee")) return "Permission refusée : rôle insuffisant pour cette action.";
  if (raw.includes("Administrateur requis")) return "Seul un administrateur peut effectuer cette action.";
  if (raw.includes("Dataset inexistant")) return "Ce dataset n'existe pas.";
  if (raw.includes("Dataset desactive")) return "Ce dataset a été supprimé.";
  if (raw.includes("Note entre 1 et 5")) return "La note doit être comprise entre 1 et 5.";
  return raw.length > 120 ? raw.slice(0, 120) + "…" : raw || "Transaction refusée";
};

const memeAdresse = (a, b) => a && b && a.toLowerCase() === b.toLowerCase();

function App() {
  const [tab, setTab]                 = useState("add");
  const [compte, setCompte]           = useState(null);
  const [contrat, setContrat]         = useState(null);
  const [provider, setProvider]       = useState(null);
  const [datasets, setDatasets]       = useState([]);
  const [tokens, setTokens]           = useState(0);
  const [nom, setNom]                 = useState("");
  const [description, setDescription] = useState("");
  const [noteId, setNoteId]           = useState("");
  const [noteValeur, setNoteValeur]   = useState("");
  const [message, setMessage]         = useState("");
  const [loading, setLoading]         = useState(false);
  const [roleUtilisateur, setRoleUtilisateur] = useState(0);
  const [roleAdresse, setRoleAdresse] = useState("");
  const [roleValeur, setRoleValeur]   = useState("2");

  const connecterMetaMask = async () => {
    if (!window.ethereum) { alert("MetaMask non détecté !"); return; }
    try {
      try {
        await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x7A69" }] });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{ chainId: "0x7A69", chainName: "Hardhat Local", rpcUrls: ["http://127.0.0.1:8545"], nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 } }]
          });
        }
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const p = new ethers.providers.Web3Provider(window.ethereum);
      const signer = p.getSigner();
      const adresse = await signer.getAddress();
      const c = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setCompte(adresse); setProvider(p); setContrat(c);
      const r = await c.obtenirRole(adresse);
      setRoleUtilisateur(Number(r));
      setMessage("✅ Connecté avec succès");
    } catch (e) { setMessage("❌ " + e.message); }
  };

  const chargerDatasets = async () => {
    if (!provider) return;
    try {
      const ro = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const total = await ro.nombreDatasets();
      const totalNum = Number(total);
      const liste = [];
      for (let i = 1; i <= totalNum; i++) {
        const d = await ro.obtenirDataset(i);
        liste.push({ id: i, nom: d.nom, description: d.description, proprietaire: d.proprietaire, moyenne: d.moyenne.toString(), nombreNotes: d.nombreNotes.toString(), actif: d.actif });
      }
      setDatasets(liste);
      if (compte) {
        const t = await ro.obtenirTokens(compte);
        setTokens(t.toString());
        const r = await ro.obtenirRole(compte);
        setRoleUtilisateur(Number(r));
      }
    } catch (e) { setMessage("❌ Erreur chargement : " + e.message); }
  };

  const ajouterDataset = async () => {
    if (!nom || !description) { setMessage("⚠️ Remplis le nom et la description !"); return; }
    if (roleUtilisateur < ROLES.CONTRIBUTEUR) { setMessage("⚠️ Rôle Contributeur ou supérieur requis pour ajouter"); return; }
    try {
      setLoading(true); setMessage("⏳ Transaction en cours...");
      const tx = await contrat.ajouterDataset(nom, description);
      await tx.wait();
      setMessage("✅ Dataset enregistré sur la blockchain !");
      setNom(""); setDescription(""); chargerDatasets();
    } catch (e) { setMessage("❌ " + extraireMessageErreur(e)); }
    finally { setLoading(false); }
  };

  const noterDataset = async () => {
    if (!noteId || !noteValeur) { setMessage("⚠️ Remplis l'ID et la note !"); return; }
    if (roleUtilisateur < ROLES.EVALUATEUR) { setMessage("⚠️ Rôle Évaluateur ou supérieur requis pour noter"); return; }
    const id = Number(noteId);
    const ds = datasets.find(d => d.id === id);
    if (ds && !ds.actif) { setMessage("⚠️ Ce dataset est désactivé."); return; }
    try {
      setLoading(true); setMessage("⏳ Transaction en cours...");
      const ancienne = Number(await contrat.obtenirNoteUtilisateur(compte, id));
      const tx = await contrat.noterDataset(id, Number(noteValeur));
      await tx.wait();
      setMessage(ancienne > 0 ? "✅ Note mise à jour" : "✅ Note envoyée · +10 DST tokens gagnés 🎉");
      setNoteId(""); setNoteValeur(""); chargerDatasets();
    } catch (e) { setMessage("❌ " + extraireMessageErreur(e)); }
    finally { setLoading(false); }
  };

  const attribuerRole = async () => {
    if (!roleAdresse) { setMessage("⚠️ Indique l'adresse du wallet"); return; }
    try {
      setLoading(true); setMessage("⏳ Attribution du rôle...");
      const tx = await contrat.attribuerRole(roleAdresse, Number(roleValeur));
      await tx.wait();
      setMessage(`✅ Rôle « ${ROLE_LABELS[Number(roleValeur)]} » attribué`);
      setRoleAdresse("");
    } catch (e) { setMessage("❌ " + extraireMessageErreur(e)); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (provider && compte) chargerDatasets(); }, [provider, compte]);

  const datasetsActifs = datasets.filter(d => d.actif);

  const nav = [
    { key: "add",  icon: "➕", cls: "ni-g", label: "Ajouter un dataset" },
    { key: "rate", icon: "★",  cls: "ni-y", label: "Noter un dataset" },
    { key: "list", icon: "≡",  cls: "ni-p", label: "Voir les datasets" },
    ...(roleUtilisateur === ROLES.ADMINISTRATEUR ? [{ key: "admin", icon: "⚙", cls: "ni-p", label: "Gestion des rôles" }] : []),
  ];

  return (
    <>
      <style>{css}</style>
      <div className="shell">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">⛓</div>
            <div>
              <div className="logo-name">DataRegistry</div>
              <div className="logo-tag">Blockchain · Hardhat</div>
            </div>
          </div>

          <div className="nav-section">Menu</div>
          {nav.map(n => (
            <button key={n.key} className={`nav-btn${tab === n.key ? " on" : ""}`} onClick={() => setTab(n.key)}>
              <div className={`ni ${n.cls}`}>{n.icon}</div>
              {n.label}
            </button>
          ))}

          <div className="sidebar-foot">
            {compte ? (
              <>
                <div className="net-pill">
                  <div className="dot-live" />
                  <div className="net-text">Hardhat · Chain 31337</div>
                </div>
                <div className="addr-pill">
                  <div className="addr-label">Compte connecté</div>
                  <div className="addr-val">{compte.slice(0, 8)}…{compte.slice(-5)}</div>
                </div>
                <div className="addr-pill">
                  <div className="addr-label">Contrat</div>
                  <div className="addr-val" title={CONTRACT_ADDRESS}>{CONTRACT_ADDRESS.slice(0, 8)}…{CONTRACT_ADDRESS.slice(-5)}</div>
                </div>
              </>
            ) : (
              <div className="net-pill" style={{ background: "#fef2f2", borderColor: "#fecaca" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", flexShrink: 0 }} />
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#991b1b" }}>Non connecté</div>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          {!compte ? (
            <div className="cpage">
              <div className="cicon">🦊</div>
              <div className="ctitle">Connecte ton wallet</div>
              <div className="csub">Connecte MetaMask sur Hardhat Local pour accéder à la plateforme décentralisée.</div>
              <button className="btn-connect" onClick={connecterMetaMask}>Connecter MetaMask</button>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="stats">
                <div className="stat">
                  <div className="stat-lbl">Mes Tokens</div>
                  <div className="stat-val y">{tokens}</div>
                  <div className="stat-sub">DST balance</div>
                </div>
                <div className="stat">
                  <div className="stat-lbl">Datasets</div>
                  <div className="stat-val g">{datasets.length}</div>
                  <div className="stat-sub">enregistrés</div>
                </div>
                <div className="stat">
                  <div className="stat-lbl">Mon rôle</div>
                  <div className="stat-val p" style={{ fontSize: 16, paddingTop: 5 }}>{ROLE_LABELS[roleUtilisateur]}</div>
                  <div className="stat-sub">permissions on-chain</div>
                </div>
              </div>

              {message && <div className={toastClass(message)}>{message}</div>}

              {/* Tab: Ajouter */}
              {tab === "add" && (
                <>
                  <div className="sec-head">
                    <div className="sec-title">Ajouter un Dataset</div>
                    <span className="chip chip-g">on-chain</span>
                  </div>
                  <div className="fcard">
                    <label className="flabel">Nom du dataset</label>
                    <input placeholder="ex : ImageNet 2024" value={nom} onChange={e => setNom(e.target.value)} />
                    <label className="flabel">Description</label>
                    <input placeholder="Décris ce dataset…" value={description} onChange={e => setDescription(e.target.value)} />
                    <div className="ffoot">
                      <span className="fhint">Rôle Contributeur requis · Gas ≈ 0 ETH</span>
                      <button className="btn btn-p" onClick={ajouterDataset} disabled={loading}>
                        {loading ? "⏳ En cours…" : "✦ Enregistrer sur la blockchain"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Tab: Noter */}
              {tab === "rate" && (
                <>
                  <div className="sec-head">
                    <div className="sec-title">Noter un Dataset</div>
                    <span className="chip chip-p">+10 DST tokens</span>
                  </div>
                  <div className="fcard">
                    {datasetsActifs.length > 0 ? (
                      <>
                        <label className="flabel">Choisir un dataset à noter</label>
                        <select
                          value={noteId}
                          onChange={e => setNoteId(e.target.value)}
                          style={{ width: "100%", padding: "10px 13px", marginBottom: 14, borderRadius: "var(--r-sm)", border: "1px solid var(--border)", fontFamily: "var(--sans)" }}
                        >
                          <option value="">— Sélectionner —</option>
                          {datasetsActifs.map(d => (
                            <option key={d.id} value={d.id}>
                              #{d.id} · {d.nom}{memeAdresse(d.proprietaire, compte) ? " (le vôtre)" : ""}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        <label className="flabel">ID du dataset</label>
                        <input placeholder="1" value={noteId} onChange={e => setNoteId(e.target.value)} />
                      </>
                    )}
                    <div className="frow">
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label className="flabel">Note (1–5)</label>
                        <input placeholder="5" type="number" min="1" max="5" value={noteValeur} onChange={e => setNoteValeur(e.target.value)} />
                      </div>
                    </div>
                    <div className="ffoot">
                      <span className="fhint">Évaluateur+ · note modifiable · 1 note par compte</span>
                      <button className="btn btn-b" onClick={noterDataset} disabled={loading || datasetsActifs.length === 0}>
                        {loading ? "⏳ En cours…" : "★ Envoyer la note"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Tab: Admin rôles */}
              {tab === "admin" && roleUtilisateur === ROLES.ADMINISTRATEUR && (
                <>
                  <div className="sec-head">
                    <div className="sec-title">Gestion des rôles</div>
                    <span className="chip chip-p">administrateur</span>
                  </div>
                  <div className="fcard">
                    <label className="flabel">Adresse wallet</label>
                    <input placeholder="0x..." value={roleAdresse} onChange={e => setRoleAdresse(e.target.value)} />
                    <label className="flabel">Rôle à attribuer</label>
                    <select
                      value={roleValeur}
                      onChange={e => setRoleValeur(e.target.value)}
                      style={{ width: "100%", padding: "10px 13px", marginBottom: 14, borderRadius: "var(--r-sm)", border: "1px solid var(--border)", fontFamily: "var(--sans)" }}
                    >
                      <option value="0">Aucun</option>
                      <option value="1">Évaluateur — peut noter</option>
                      <option value="2">Contributeur — ajouter et noter</option>
                      <option value="3">Administrateur — tout + attribution</option>
                    </select>
                    <div className="ffoot">
                      <span className="fhint">Seul l'administrateur peut attribuer des rôles</span>
                      <button className="btn btn-p" onClick={attribuerRole} disabled={loading}>
                        {loading ? "⏳ En cours…" : "Attribuer le rôle"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Tab: Liste */}
              {tab === "list" && (
                <>
                  <div className="sec-head">
                    <div className="sec-title">Datasets enregistrés</div>
                    <button className="btn btn-g-out" onClick={chargerDatasets} style={{ padding: "6px 14px", fontSize: 12 }}>↻ Rafraîchir</button>
                  </div>
                  {datasets.length === 0 ? (
                    <div className="empty">
                      📭<br />Aucun dataset enregistré pour l'instant.<br />
                      <span style={{ opacity: 0.6 }}>Ajoute le premier depuis "Ajouter un dataset".</span>
                    </div>
                  ) : (
                    <div className="ds-list">
                      {datasets.map(d => (
                        <div className="ds-item" key={d.id}>
                          <div className="ds-id">#{d.id}</div>
                          <div>
                            <div className="ds-name">{d.nom}{!d.actif && <span style={{ marginLeft: 8, fontSize: 10, color: "var(--red)", fontFamily: "var(--mono)" }}>· supprimé</span>}</div>
                            <div className="ds-desc">{d.description}</div>
                            <div className="ds-meta">
                              <span className="meta">👤 {d.proprietaire.slice(0, 6)}…{d.proprietaire.slice(-4)}</span>
                              <span className="meta"><Stars moyenne={d.moyenne} nombreNotes={d.nombreNotes} /></span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default App;