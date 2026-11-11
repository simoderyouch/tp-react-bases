import { useState } from 'react'

function Tache({ titre, terminee, onBasculer, onSupprimer, onModifier, id }) {
  const [enModification, setEnModification] = useState(false)
  const [nouveauTitre, setNouveauTitre] = useState(titre)

  function enregistrerModification() {
    const titreNettoye = nouveauTitre.trim()
    if (titreNettoye && titreNettoye !== titre) onModifier(id, titreNettoye)
    setNouveauTitre(titre)
    setEnModification(false)
  }

  function annulerModification() {
    setNouveauTitre(titre)
    setEnModification(false)
  }

  return (
     <li className={terminee ? "tache terminee" : "tache"}>
   <input type="checkbox" checked={terminee} onChange={() => onBasculer(id)} />
  {enModification ? (
    <input
      className="titre"
      type="text"
      value={nouveauTitre}
      onChange={(event) => setNouveauTitre(event.target.value)}
      onBlur={enregistrerModification}
      onKeyDown={(event) => {
        if (event.key === 'Enter') enregistrerModification()
        if (event.key === 'Escape') annulerModification()
      }}
      autoFocus
    />
  ) : (
    <span className="titre" onDoubleClick={() => setEnModification(true)}>{titre}</span>
  )}
<button className="danger" onClick={() => onSupprimer(id)}>Supprimer</button>
</li>
  )
}

export default Tache;
