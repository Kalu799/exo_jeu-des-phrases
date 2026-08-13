const $listePhrases = document.querySelector('#listePhrases')

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

const randomSeq = []

const phrase = {
  sujet: [],
  verbe: [],
  complement: []
};

// récup données csv + traitement
const getData = async () => {
  await fetch('jeu-des-phrases.csv')
    // on récup les données du csv et on en fait un texte
    .then(response => response.text())
    .then(resp => {

      //console.log(resp)

      const lignes = resp
        // on nettoie les espaces
        .trim()
        // on sépare à chaque retour à la ligne qui est \r\n
        .split(/\r\n/)
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
const getRandomSeq = async () => {

  // génère un nbre aléatoire en fonction du nbre max de sujet, verbe et complément
  let nbre1 = await getRandomInt(nbreSujet)
  let nbre2 = await getRandomInt(nbreVerbe)
  let nbre3 = await getRandomInt(nbreComplement)

  // on met ses nombres dans un array
  randomSeq.push(nbre1)
  randomSeq.push(nbre2)
  randomSeq.push(nbre3)

  // on nettoie les var
  nbre1 = null
  nbre2 = null
  nbre3 = null

  console.log(randomSeq)
  
}

// fct qui génère une phrase en fonction de la séquence donnée
const genererPhrase = async () => {
  await getRandomSeq()
  phrase.sujet = data.sujet[randomSeq[0]]
  phrase.verbe = data.verbe[randomSeq[1]]
  phrase.complement = data.complement[randomSeq[2]]

  console.log(phrase)
}

// fct qui ajoute la phrase générée à l'html
const affichagePhrase = () => {
  // créer le template de la phrase
  let template = `<li>${phrase.sujet} ${phrase.verbe} ${phrase.complement}</li>`
  
  // ajoute le template dans l'html
  $listePhrases.innerHTML += template
}

// fct init qui lance les autres
const init = async () => {
  await getData()
  await genererPhrase()
  await affichagePhrase()
}

init()