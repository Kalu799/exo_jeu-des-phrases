fetch('jeu-des-phrases.csv')
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

    // const qui contiendra les données
    const data = {
      sujet: [],
      verbe: [],
      complement: []
    };

    lignes.forEach(ligne => {
      // pour chaque lignes, on dit que le premier "objet" est "sujet", le deuxième est "verbe" et le troisième est "complement", en séparant avec les ","
      const [sujet, verbe, complement] = ligne.split(',');
        // on met les bonnes données au bon endroit dans "data"
        data.sujet.push(sujet);
        data.verbe.push(verbe);
        data.complement.push(complement);
      });

      console.log(data);
    });