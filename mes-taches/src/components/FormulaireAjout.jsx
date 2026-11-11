import { useState } from 'react'

function FormulaireAjout({ onAjouter }) {
  const [titre, setTitre] = useState('')

  function gererSoumission(event) {
  event.preventDefault()

  const titreNettoye = titre.trim()

  // Ignore empty titles
  if (titreNettoye === '') return

  // Add the cleaned title
  onAjouter(titreNettoye)

  // Clear the input
  setTitre('')
}

  return (
    <form className="formulaire" onSubmit={gererSoumission}>
      <input
        type="text"
        value={titre}
        onChange={(event) => setTitre(event.target.value)}
        placeholder="Ex. : Réviser les hooks"
      />
      <button
  type="submit"
  className="principal"
  disabled={titre.trim() === ''}
>
  Ajouter
</button>
    </form>
  )
}

export default FormulaireAjout
