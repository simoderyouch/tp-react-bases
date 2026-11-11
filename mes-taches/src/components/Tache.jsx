

function Tache({ titre, terminee, onBasculer,onSupprimer, id }) {
  return (
     <li className={terminee ? "tache terminee" : "tache"}>
   <input type="checkbox" checked={terminee} onChange={() => onBasculer(id)} />
  <span className="titre">{titre}</span> 
<button className="danger" onClick={() => onSupprimer(id)}>Supprimer</button>
</li>
  )
}

export default Tache;
