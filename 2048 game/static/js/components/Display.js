/***
 * Fonction vérifiant si le joueur a atteint le le pointage ciblée
 * @param tab: tableau en entré
 */

function verifyVictory (tab,winCase, score){

    let retVal = tab.filter(cell => cell==winCase);
    if(retVal.length == 0){
      return false;
    }
    else{
      console.log('this is what'+score);
      //faire un script ici avec jquery
      updateBest(score);
      ReactDOM.render(<h1>Victory</h1>,document.getElementById("invisible"));
  
      document.getElementsByTagName("button")[0].innerHTML="Clear Board";
      return true;
    }
    
  }

/**
 * Enumeration de couleurs (arrière plan)
 *
 * */

const caseBgColors = {
    deux: "#EEE4DA",
    quatre: "#EEE1C9",
    huit: "#F3B27A",
    seize: "#F69664" ,
    treinteDeux: "#F77C5F",
    soixanteQuatre: "#F75F3B",
    cVingHuit:"#EDD073",
  }
/**
 * Enumeration de couleurs (text)
 *
 * */
const caseTxtColors = {
    deux:"#776E65",
    quatre: "#776E65",
    huit: "#F9F6F2",
    seize: "#F9F6F2",
    treinteDeux: "#F9F6F2",
    soixanteQuatre: "#F9F6F2",
    cVingHuit:"#F9F6F2",
}

/**
 * fonction permettant l'affichage du tableau dans le DOM
 * @param tabu : grille a faire l'affichage 
 * @param dimension : dimension respective du tableau
 */

function printer(tabu, dimension){
    
    let displayTab = [];  
    let line = [];

    for(let i=0; i<=tabu.length; i++){

      switch(tabu[i]){

        case 0:
          line.push(<td className={"zero"}>&nbsp;</td>);
          break;
        case 2:
          line.push(<td style={{color:caseTxtColors.deux, backgroundColor: caseBgColors.deux} } >{tabu[i]}</td>);
          break;
        case 4:
          line.push(<td style={{color:caseTxtColors.quatre, backgroundColor:caseBgColors.quatre}}>{tabu[i]}</td>);
          break;
        case 8:
          line.push(<td style={{color:caseTxtColors.huit, backgroundColor:caseBgColors.huit} }>{tabu[i]}</td>);
          break;
        case 16:
          line.push(<td style={{color:caseTxtColors.seize, backgroundColor:caseBgColors.seize}}>{tabu[i]}</td>);
          break;
     
        case 32:
          line.push(<td style={{color:caseTxtColors.treinteDeux, backgroundColor:caseBgColors.treinteDeux} }>{tabu[i]}</td>);
          break;
        case 64:
          line.push(<td style={{color:caseTxtColors.soixanteQuatre, backgroundColor:caseBgColors.soixanteQuatre}}>{tabu[i]}</td>);
          break;
        case 128:
          line.push(<td style={{color:caseTxtColors.cVingHuit, backgroundColor:caseBgColors.cVingHuit}}>{tabu[i]}</td>);
          break;
        default:
          line.push(<td>{tabu[i]}</td>);
          break;

      }
    
      
      if(((i+1)%dimension==0) && i !=0){
        displayTab.push(<tr className="row">{line}</tr>);
        line = [];
      }
    }
 
     ReactDOM.render(<table><thead></thead>
       <tbody>{displayTab}</tbody></table>,document.getElementById("tableau") );
 
  }
  /**
   * fonction permettant d'affecter le score du jeu
   * @param score, score du jeu 
   * @param {*} value, valuer optionnel pour fixer le pointage du jeu
   */
/*
  function setScore(score, value){
    if(value != null){
      score = value;
      return;
    }
    score++;
    ReactDOM.render(<div> {score}</div>,document.getElementById("score") );
  }*/
