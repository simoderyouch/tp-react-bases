import Tache from "./Tache.jsx"

function ListeTaches({taches,onBasculer , onSupprimer}) {

    return ( <ul className="liste-taches">
      
         {taches ? taches.map((tache) => (
  
          <Tache
  key={tache.id}
  id={tache.id}
  titre={tache.titre}
  terminee={tache.terminee}
  onBasculer={onBasculer}
  onSupprimer={onSupprimer}
/>

))  : <p className="vide">Aucune tâche à afficher.</p> }
    </ul>  )

}
export default ListeTaches;
