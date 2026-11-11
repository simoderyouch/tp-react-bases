import { useState } from 'react'

function Compteur() {
  const [valeur, setValeur] = useState(0)

  return (
    <>
      <p className="valeur-compteur">{valeur}</p>
      <div className="ligne">
        {/* À compléter : boutons −1, +1 et « Remettre à zéro » */}  

        <button className="princial" onClick={() => setValeur(valeur + 1 )}>+1 </button>
        <button  onClick={() => setValeur(valeur - 1 )}  disabled={valeur === 0 ? true : false}> -1 </button>
        <button onClick={() => setValeur(0) } > Remetter a zero </button>        
    </div>
    </>
  )
}

export default Compteur
