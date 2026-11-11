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


const TACHES_INITIALES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: "Gérer l'état avec useState", terminee: false },
]
function App() {
    const [taches, setTaches] = useState([])
   const [filtre, setFiltre] = useState('toutes');
   const [chargement, setChargement] = useState(true);
const [erreur, setErreur] = useState(null);

const restantes = taches.filter(
  (tache) => !tache.terminee
).length;

useEffect(() => {
  document.title = `(${restantes}) Mes tâches`;
}, [restantes]);

useEffect(() => {
  let annule = false

  fetch('/taches.json')
    .then((reponse) => {
      if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`)
      return reponse.json()
    })
    .then((donnees) => {
      if (!annule) setTaches(donnees)
    })
    .catch((err) => {
      if (!annule) setErreur(err.message)
    })
    .finally(() => {
      if (!annule) setChargement(false)
    })

  return () => {
    annule = true
  }
}, [])
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
 

 return (
    <div className="app">
      <Entete  titre="Mes tâches" sousTitre="Mon premier projet React" />
      <Carte  titre="Statistiques"> 
        <Statistiques taches={taches} />
      </Carte>
      <Carte titre="Ma liste">
        { chargement ? <p className="vide">Chargement des tâches…</p> : <>
       <Filtres     filtre={filtre}  onChanger={setFiltre} />
        <ListeTaches taches={tachesVisibles} onBasculer={basculerTache} onSupprimer={supprimerTache} />
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
       <Horloge />    
 </Carte>
     
      <Pied auteur="Mohamed Ed Deryouch"/>
     
    </div>
  )
}

export default App
