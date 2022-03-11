/**
 * Component principal du jeu
 */

 class Info extends React.Component {
    constructor(props) {
      super(props);

    }

render() {

  return (
    <div className={"flex_principal"}>
        
        <section><h1>2048</h1></section>

        <aside>
          <h4>Score board</h4>
          <div className={"flex_display"}>

            <section>
              <span >Current score</span>
              <div id="score">-</div>
            </section>
              <section>
                  <div><span> Your best </span></div>
              <div id={"your_best"}>-</div>
              </section>
            <aside>
              <div><span> Global Best</span></div>
              <div id={"global_best"}>-</div>
              
            </aside>
            
          </div>
        </aside>
        </div>
  );
}
}
  