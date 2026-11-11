import Tache from "./Tache.jsx"

function ListeTaches({taches}) {

    return ( <ul className="liste-taches">
      
         {taches.lenght > 0 ? taches.map((tache) => (
  <Tache key={tache.id} titre={tache.titre} terminee={tache.terminee} />
))  : <p className="vide">Aucune tâche à afficher.</p> }
    </ul>  )

}
export default ListeTaches;
