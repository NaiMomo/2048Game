/**
 * fonction permetant de fixer deux carreaux aléatoires dans la grille
 * @param tabu: tableau en entrée
 * @param dimension: dimension du tableau supérieure égale à deux
 * 
 */

setRandomInit = (tabu,dimension)=>{
    let randomC = Math.floor(Math.random()*tabu.length);
     
    for(let i = 0; i<2; i++){
      let coin = (Math.random());

      if(coin>0.5){
        // numero 2
        if(tabu[randomC]==0)
          tabu[randomC] = 2;
        else{
          randomC = Math.floor(Math.random()*dimension);
          i--;
        }
      }
      else{
        // numero 4
        if(tabu[randomC]==0){
          tabu[randomC] = 4;
        }
        else{
          randomC = Math.floor(Math.random()*dimension);
          i--;
        }
      }              
    }
  }

/**
 * fonction permetant de transposer le tableau 
 * @param matrix: tableau a transposer
 * @param dimension: dimension du tableau
 * 
 ***/

transposeMatrix = (matrix, dimension) =>{
 
    let line = [];
    let retValue = [];
    let transp = []
    // obtenir les lignes
    for(let i = 0 ; i<matrix.length ; i++){
      line.push(matrix[i]);
      if((i+1)%dimension==0 ){
        
        transp.push(line);
        line = [];
      }
    }


    transp = transp[0].map((_, colIndex) => transp.map(row => row[colIndex]));

    for(let i = 0; i<dimension ; i++){
      for(let j = 0; j <dimension; j++)
        matrix[i]=retValue.push(transp[i][j]);
      
    }
    
    
   for(var t = 0; t<matrix.length-1;t++)
      matrix[t]=retValue[t];

  }

