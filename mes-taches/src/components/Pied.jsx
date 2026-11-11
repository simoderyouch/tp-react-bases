


function Pied({auteur}) {

   const ANNEE = new Date().getFullYear();
   return (   <footer className="pied">  TP React – réalisé par  {auteur} - {ANNEE}  </footer>)

}



export default Pied;
