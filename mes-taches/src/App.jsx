import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import Compteur from './components/Compteur.jsx'
import { useState,useEffect } from "react";
import FormulaireAjout from './components/FormulaireAjout.jsx'
import Filtres from './components/Filtres.jsx'
import    Statistiques from './components/Statistiques.jsx'
import Horloge from './components/Horloge.jsx'


const CLE_TACHES = 'taches'

function lireTachesSauvegardees() {
  try {
    const sauvegarde = localStorage.getItem(CLE_TACHES)
    const taches = sauvegarde ? JSON.parse(sauvegarde) : null
    return Array.isArray(taches) ? taches : null
  } catch {
    localStorage.removeItem(CLE_TACHES)
    return null
  }
}

function App() {
    const [taches, setTaches] = useState(() => lireTachesSauvegardees() ?? [])
   const [afficherHorloge, setAfficherHorloge] = useState(true)
   const [filtre, setFiltre] = useState('toutes');
const [chargement, setChargement] = useState(() => lireTachesSauvegardees() === null);
const [erreur, setErreur] = useState(null);

const restantes = taches.filter(
  (tache) => !tache.terminee
).length;

useEffect(() => {
  document.title = `(${restantes}) Mes tâches`;
}, [restantes]);

useEffect(() => {
  if (!chargement && !erreur) {
    localStorage.setItem(CLE_TACHES, JSON.stringify(taches));
  }
}, [taches, chargement, erreur]);

useEffect(() => {
  let annule = false;

  const sauvegarde = lireTachesSauvegardees();

  if (sauvegarde) {
    return () => {
      annule = true;
    };
  }

  fetch('/taches.json')
    .then(response => {
      if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
      return response.json();
    })
    .then(donnees => {
      if (!annule) setTaches(donnees);
    })
    .catch(err => {
      if (!annule) setErreur(err.message);
    })
    .finally(() => {
      if (!annule) setChargement(false);
    });

  return () => {
    annule = true;
  };
}, []);

const tachesVisibles = taches.filter(tache => {
  if (filtre === 'actives') {
    return !tache.terminee;
  }

  if (filtre === 'terminees') {
    return tache.terminee;
  }

  return true;
});
    
   function ajouterTache(titre) {

   setTaches([
          ...taches, { id: Date.now(), titre, terminee: false }
         ] 
   )
}


    function basculerTache(id) {
 


 setTaches(
    taches.map((tache) =>
      tache.id === id ? { ...tache, terminee: !tache.terminee } : tache,
    ),
  )
}

function supprimerTache(id) {
  
        setTaches(taches.filter((tache) => tache.id !== id));

}

function supprimerTachesTerminees() {
  setTaches(taches.filter((tache) => !tache.terminee));
}

function modifierTache(id, nouveauTitre) {
  setTaches(taches.map((tache) => (
    tache.id === id ? { ...tache, titre: nouveauTitre } : tache
  )));
}
 

 return (
    <div className="app">
      <Entete  titre="Mes tâches" sousTitre="Mon premier projet React" />
      <Carte  titre="Statistiques"> 
        <Statistiques taches={taches} />
      </Carte>
      <Carte titre="Ma liste">
        { chargement ? <p className="vide">Chargement des tâches…</p> : <>
       <Filtres     filtre={filtre}  onChanger={setFiltre} />
        <ListeTaches
          taches={tachesVisibles}
          onBasculer={basculerTache}
          onSupprimer={supprimerTache}
          onModifier={modifierTache}
        />
        <button
          className="danger"
          onClick={supprimerTachesTerminees}
          disabled={!taches.some((tache) => tache.terminee)}
        >
          Supprimer les tâches terminées
        </button>
        </>}
        { erreur && <p className="erreur">{erreur.message}</p>  }
      </Carte>
      <Carte titre="Nouvelle tache"> 
         <FormulaireAjout onAjouter={ajouterTache} /> 
      </Carte>
      <Carte titre="Compteur"> 
          <Compteur/> 
      </Carte>
     <Carte titre="Heure actuelle">
       <button onClick={() => setAfficherHorloge(!afficherHorloge)}>
         {afficherHorloge ? 'Masquer l’horloge' : 'Afficher l’horloge'}
       </button>
       {afficherHorloge && <Horloge />}
 </Carte>
     
      <Pied auteur="Mohamed Ed Deryouch"/>
     
    </div>
  )
}

export default App
