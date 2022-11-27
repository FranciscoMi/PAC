//El código se ejecuta solo una vez
(()=>{
'use strict';
  // Este array no se puede modificar,
  var posibilidades = ["piedra", "papel", "tijera"];
  //

  //objeto que controla el juego
class game{
  constructor(){
    this.name='';
    this.actualGame=1;
    this.numGame=0;
    this.ready=false;
  }

  //función que actua según el botón pulsado
  prepareGame(){
    if(this.checkDatas()){
      this.prepareImgs();
      this.ready=true;
    }
  }
  
//mostramos las imagenes de las opciones del jugador
  prepareImgs(){
    const imagesGamer=document.querySelectorAll('#jugador img');
    posibilidades.forEach((element, index) => {
      imagesGamer[index].src=`img/${element}Jugador.png`;
    });
  }//function
  
//Comprobamos que los datos introducidos sean los correctos
  checkDatas(){
    let dataError=false;
    const checkName=document.querySelector('input[name="nombre"]');
    const checkNumberGamers=document.querySelector('input[name="partidas"]');

    if (!/\D{1}\w{2,}/.test(checkName.value)){
      checkName.classList.add("fondoRojo");
      dataError=true;
    } else{
      checkName.classList.remove("fondoRojo");
    }

    if(!/^[1-9]\d*$/.test(checkNumberGamers.value)){
      checkNumberGamers.classList.add("fondoRojo");
      dataError=true;
    }else{
      checkNumberGamers.classList.remove("fondoRojo");
    }

    if (!dataError){
      checkName.disabled=true;
      checkNumberGamers.disabled=true;
      document.querySelector('#actual').textContent=this.actualGame;
      this.numGame=checkNumberGamers.value;
      document.querySelector('#total').textContent=this.numGame;
      return true;
    }
    return false;  
  };//end checkDatas

  playGame(){
    if (this.actualGame<this.numGame){
      console.log('ready');
    }
    
  }//end play game
  
  resetGame(){
    if(this.ready){
    const title=document.querySelector('h1');
    const oldText=title.textContent;
    title.textContent='Nueva Partida';
    setTimeout(()=>{
      const checkName=document.querySelector('input[name="nombre"]');
      const checkNumberGamers=document.querySelector('input[name="partidas"]');
      checkName.disabled=false;
      checkNumberGamers.disabled=false;
      document.querySelector('#actual').textContent=0;
      this.numGame=0;
      this.actualGame=1;
      checkName.value='';
      checkNumberGamers.value=0;
      document.querySelector('#total').textContent=this.numGame;
      this.ready=false;
      title.textContent=oldText;

      const imagesGamer=document.querySelectorAll('img');
      imagesGamer.forEach((element, index) => {
      imagesGamer[index].src='img/defecto.png';
    });
    },2000);
    }
  }//end resetGame
}

// Nos aseguramos que el código se ejecutará una vez se haya cargado todo el contenido de la página y cargamos la ejecución de los eventos 
document.addEventListener('DOMContentLoaded',()=>{
  const juego = new game;
  document.addEventListener('click',(event) => {
    switch (event.target.textContent){
      case '¡JUGAR!':
        juego.prepareGame();
        break;
      case '¡YA!':
        juego.playGame();
        break;
      case 'RESET':
        juego.resetGame();
        break;
      }//end switch 
  });//end addEventListener click
  
});//end DOMContentLoader

})();