/**
 * Component principal du jeu
 */

class Game extends React.Component {
    constructor(props) {
      super(props);

      this.state = {

          link: "rapport/rapport.xhtml",
          winCase: 2048, // change this case to change the win tile
          restart: false,
          dimension: 0,
          cellTab: [],
          newGame:false,
      };
    }

render() {

  return (
    <div  >
      <Info link={this.state.link}/>
      <Board game={this} winCase={this.state.winCase} restart={this.state.restart} dimension={this.state.dimension}
      cellTab={this.state.cellTab} newGame={this.state.newGame}/>

    </div>

  );
}
}
  