/**
 * Component du tableau avec ses mouvements
 */
class Board extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      restart: this.props.restart,
      dimension: this.props.dimension,
      cellTab: this.props.cellTab,
      newGame:this.props.newGame,
      score: 0,
    };
  }
/**
 * fonction popUp qui initialise le tableau
 */
  popUpInit(){

      this.state.cellTab = [];
      this.state.dimension = 0;
    
      if (this.state.restart || this.state.newGame){
        window.location.reload();
        return;
      };
        do{
         
        this.state.dimension = +window.prompt("Enter dimension for the board");
        if(this.state.dimension == 0 || this.state.newGame==true){
          window.location.reload();
          return;
        }
  
      }while(isNaN(this.state.dimension)|| (this.state.dimension < 0) || (this.state.dimension == ""))

      for(let i = 0; i <this.state.dimension*this.state.dimension; i++){

        this.state.cellTab.push(+0);
        
      }

      document.getElementsByTagName("button")[1].innerHTML="Clear Board";
      // Remplir de 2
     
      setRandomInit(this.state.cellTab, this.state.dimension);

      printer(this.state.cellTab, this.state.dimension);
      this.state.newGame = true;
  }


  /**
   * function qui verifie si le jeu a échoué
   */
  
  verifyEnd(){
    let tempUp = this.state.cellTab.slice();
    this.upDirection();
    tempUp=(JSON.stringify(tempUp)===JSON.stringify(this.state.cellTab));

    let tempDown = this.state.cellTab.slice();
    this.downDirection();
    tempDown=(JSON.stringify(tempDown)===JSON.stringify(this.state.cellTab));

    let tempRight = this.state.cellTab;
    this.rightDirection();
    tempRight=(JSON.stringify(tempRight)===JSON.stringify(this.state.cellTab));

    let tempLeft = this.state.cellTab;
    this.leftDirection();
    tempLeft=(JSON.stringify(tempLeft )===JSON.stringify(this.state.cellTab));;
    console.log((tempUp && tempDown && tempRight && tempLeft));
    
    return (tempUp && tempDown && tempRight && tempLeft)
  }
/**
 * fonction qui permet a l'utilisateur de manipuler le tableau
 * @param {} event, evenement à surveiller
 */

  handleKeyPress = (event) => {

    window.addEventListener("keydown", function(e) {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }
  }, false);
    this.popUpInit();
    document.addEventListener("keydown", event => {
     console.log(event.key);
     if(this.state.restart){
      return;
    }else{
      this.setScore();
    }
    switch(event.key){
      
      case "ArrowUp":
        this.upDirection();
        this.state.restart =  verifyVictory(this.state.cellTab, this.props.winCase, this.state.score);
        this.addSquare();

        break;
      case "ArrowDown":
        this.downDirection();
        this.state.restart =  verifyVictory(this.state.cellTab, this.props.winCase, this.state.score);
        this.addSquare();
       
        break;
      case "ArrowLeft":
        this.leftDirection();
        this.state.restart = verifyVictory(this.state.cellTab, this.props.winCase, this.state.score);
        this.addSquare();
       
        break;
      case "ArrowRight":
        this.rightDirection();
        this.state.restart =  verifyVictory(this.state.cellTab, this.props.winCase, this.state.score);
        this.addSquare();

        break;  

    }}
    )
  }
/**
 * fonction qui permet j'ajouter un carreau aléatoire
 */
addSquare = () => {

  let zeros = this.state.cellTab.filter(cell => cell==0);
  if(zeros.length==0){

    if(this.verifyEnd()==true){

        ReactDOM.render(<h1>Game over, better luck next time!</h1>,document.getElementById("invisible"));

        document.getElementsByTagName("button")[1].innerHTML="Clear Board";
        this.state.restart=true;
    }
    
    return;
  }

  let randomCase; // case aléatoire
  let randomCoin = Math.random(); // probabilité de 2 ou 4

    

    do{
      randomCase = Math.floor(Math.random()*this.state.cellTab.length);
      
    }while(this.state.cellTab[randomCase]>0);

      
  
      if (randomCoin>0.5){ 
        this.state.cellTab[randomCase]=2; 
      }
      else{
        this.state.cellTab[randomCase]=4; 
      }

  printer(this.state.cellTab, this.state.dimension);
}
/**
 * fonction du mouvement à droit
 */

rightDirection() {

  let retValue = []
  let line = [];
  // loop sur le tableau
  for (let i = 0; i < this.state.cellTab.length; i++) {

      line.push(this.state.cellTab[i]);
      // si on complete une ligne
      if ((i + 1) % this.state.dimension == 0) {

          for (let j = 0; j < line.length; j++) { // chaque ligne
   
              if (line[j] > 0 && j != this.state.dimension-1) {
                  if (line[j] == line[j + 1] && j < line.length-1 )  {
                      line[j + 1] = line[j] + line[j];
                      line[j] = 0;
                      break;
                  }
                  if (line[j] > 0 && line[j + 1] == 0) {
                      
                      line[j + 1] = line[j];
                      line[j] = 0;
                      
                  }
      
              }
          }
   
          retValue = retValue.concat(line);
          line = [];
      }
  }
  this.state.cellTab = retValue;
}
/**
 * fonction du mouvement à gauche
 */

leftDirection(){
  let retValue = [];
  let line=[];
  // loop sur le tableau
  for(let i=0; i<this.state.cellTab.length; i++){

    line.push(this.state.cellTab[i]);

    // si on complete une ligne
    if((i+1)%this.state.dimension==0){
   

      for(let j = line.length-1; j>=0; j--){
          if(line[j] > 0 && j != 0){
            if(line[j]>0 && line[j-1]==0){
              line[j-1] = line[j];
              line[j]= 0;              
            }
            if(j > 0 && line[j]==line[j-1]){
              line[j-1]=line[j]+line[j];
              line[j]=0;
              
              break;
            }
          }
      } 

      retValue = retValue.concat(line); 
      line=[];   
  }
}
  this.state.cellTab = retValue;

  
}
/**
 * fonction du mouvement vers le haut
 */

upDirection(){
  
  transposeMatrix(this.state.cellTab, this.state.dimension);
  this.leftDirection();
  transposeMatrix(this.state.cellTab, this.state.dimension);


}
/**
 * fonction du mouvement vers le bas
 */
downDirection(){
    transposeMatrix(this.state.cellTab, this.state.dimension);
    this.rightDirection();
    transposeMatrix(this.state.cellTab, this.state.dimension);

  }
  /**
 * fonction permetant d'affecter le score du jeu
 * le score est le nombre de mouvement necessaire pour arriver à 2048
 * @param value valeur optionel pour changer le score
 */

 setScore = (value) =>{

  this.state.score++;
  ReactDOM.render(<div> {this.state.score}</div>,document.getElementById("score") );
}

  render() {
    
    return (
      <div className={"Board"} >
          
            <div className={"flex_display_secondaire"}>

              <section>
              <button onClick={this.handleKeyPress} className={'btn-log'}> New Game!</button>

              </section>
                <aside>
                    <h6>Join the tiles, get to 2048! 🔥</h6>
                </aside>
            </div>
            <div id={"invisible"}>

            </div>
          <div id={"tableau"}>

          </div>

      </div>
    );
  }
}

ReactDOM.render(<Board/>, document.getElementById("root"));