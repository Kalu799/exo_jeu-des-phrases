const $listePhrases = document.querySelector('#listePhrases')
const $newPhraseBtn = document.querySelector('#newPhraseBtn')


// const qui contiendra les données
const data = {
  sujet: [],
  verbe: [],
  complement: []
};
// var pour les length au cas ou elles seraient différentes
let nbreSujet = null
let nbreVerbe = null
let nbreComplement = null

let nbrePhrase = null

const randomSeq = []

const allSeq = []

const phrase = {
  sujet: [],
  verbe: [],
  complement: []
};


// récup données csv + traitement
const getData = async () => {
  await fetch('./jeu-des-phrases.csv')
    // on récup les données du csv et on en fait un texte
    .then(response => response.text())
    .then(resp => {

      //console.log(resp)

      const lignes = resp
        // on nettoie les espaces
        .trim()
        // on sépare à chaque retour à la ligne qui est \r\n
        .split(/\r?\n/)
        // on retire la première ligne qui contient les titres des colonnes
        .slice(1);

      //console.log(lignes)

      lignes.forEach(ligne => {
        // pour chaque lignes, on dit que le premier "objet" est "sujet", le deuxième est "verbe" et le troisième est "complement", en séparant avec les ","
        const [sujet, verbe, complement] = ligne.split(',');
          // on met les bonnes données au bon endroit dans "data"
          data.sujet.push(sujet);
          data.verbe.push(verbe);
          data.complement.push(complement);
        });

        //console.log(data);

        // on récup les length de chaque array pour les max plus tards
        nbreSujet = data.sujet.length
        //console.log(nbreSujet)
        nbreVerbe = data.verbe.length
        //console.log(nbreVerbe)
        nbreComplement = data.complement.length
        //console.log(nbreComplement)

      });
}


// génère un nbre aléatoire compris entre 0 et max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// génère un séquence aléatoire de 3 nombres
const getRandomSeq = () => {

  // génère un nbre aléatoire en fonction du nbre max de sujet, verbe et complément
  let nbre1 = getRandomInt(nbreSujet)
  let nbre2 = getRandomInt(nbreVerbe)
  let nbre3 = getRandomInt(nbreComplement)

  // on met ses nombres dans un array
  randomSeq.push(nbre1)
  randomSeq.push(nbre2)
  randomSeq.push(nbre3)
  //console.log(randomSeq)

  // check si on a un doublon
  const existe = allSeq.some(seq =>
    JSON.stringify(seq) === JSON.stringify(randomSeq)
  )

  // si doublon -> return false pour continuer la boucle
  if (existe) {
    console.log("Séquence existante → on recommence")
    // reset pour prochaine génération
    randomSeq.length = 0
    return false
  }

  // si pas doublon -> on l'ajoute à la liste et return true pour sortir de la boucle
  allSeq.push([...randomSeq])

  //console.log("Nouvelle séquence valide :", randomSeq)

  // on nettoie les var
  nbre1 = null
  nbre2 = null
  nbre3 = null

  return true


 
}


// fct qui génère une phrase en fonction de la séquence donnée
const genererPhrase = () => {

  let generationReussie = false

  // boucle jusqu'à avoir une suite de nombre qui n'est pas un doublon
  while (!generationReussie) {
    generationReussie = getRandomSeq()
  }
  
  //console.log(randomSeq)
  // récup dans data pour créer la phrase
  phrase.sujet = data.sujet[randomSeq[0]]
  phrase.verbe = data.verbe[randomSeq[1]]
  phrase.complement = data.complement[randomSeq[2]]

  //console.log(phrase)
  //console.log(allSeq)

  // reset pour prochaine génération
  randomSeq.length = 0
  //console.log(randomSeq)

  // on lance l'ajout à l'affichage
  affichagePhrase()
}


// fct qui ajoute la phrase générée à l'html
const affichagePhrase = () => {
  // créer le template de la phrase
  let template = `<li>${phrase.sujet} ${phrase.verbe} ${phrase.complement}.</li>`
  
  // ajoute le template dans l'html
  $listePhrases.innerHTML += template

  nbrePhrase + 1
}


// fct init qui lance les autres
const init = async () => {
  await getData()
  // génère automatiquement la première phrase
  await genererPhrase()

  // gère le click pour ajouter de nouvelles phrases
  $newPhraseBtn.addEventListener('click', genererPhrase)
}

init()