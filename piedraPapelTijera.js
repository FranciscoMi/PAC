//El código se ejecuta solo una vez
(()=>{
'use strict';
  // Este array no se puede modificar,
  var posibilidades = ["piedra", "papel", "tijera"];
  //

  //Objeto que contiene las funciones del Juego
class game{
  constructor(){
    this.name='';
    this.actualGame=1;
    this.numGame=0;
    this.ready=false;
  }

  //checkDatas comprueba que los datos introducidos sean los correctos
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
      this.name=checkName.value;
      checkName.disabled=true;
      checkNumberGamers.disabled=true;
      document.querySelector('#actual').textContent=this.actualGame;
      this.numGame=checkNumberGamers.value;
      document.querySelector('#total').textContent=this.numGame;
      return true;
    }
    return false;  
  }//end checkDatas

  //Función que genera y compara los resultados del juego
  playGame(numSelected){
    const li=document.querySelector('#historial');
    const newLi=document.createElement('li');
    const imgMachine=document.querySelector('#maquina img');
    const oldLi=li.firstChild;
    if (this.actualGame<=this.numGame){
      const numMachine=Math.floor(Math.random()*3);
      const imgComputer=posibilidades[numMachine];
      imgMachine.src=`img/${imgComputer}Ordenador.png`;
      document.querySelector('#actual').textContent=this.actualGame;
    //Comparamos los resultados Jugador VS Máquina  
      const difference=numSelected-numMachine;
      if (difference===0) newLi.textContent='Empate';
      if (difference==-1 || difference==2) newLi.textContent='Gana <<The Machine>>';
      if (difference==1 || difference==-2) newLi.textContent=`Gana ${this.name}`;
    //------------------------
      li.insertBefore(newLi,oldLi);
      this.actualGame++;
    }//end if
  }//end play game

  //Función que prepara el inicio del juego
  prepareGame(){
    if(this.checkDatas()){
      this.prepareImgs();
      this.ready=true;
    }
  }
  
//Función que muestra las imagenes de las opciones al jugador
  prepareImgs(){
    const imagesGamer=document.querySelectorAll('#jugador img');
    posibilidades.forEach((element, index) => {
      imagesGamer[index].src=`img/${element}Jugador.png`;
    });
  }//function
  
  //Función que agrega el elemento de los resultados del historial al principio de la lista
  prepareNewli(){
    const addLi=document.querySelector('#historial')
    const li=document.createElement('li');
    const oldLi=addLi.firstChild;
    li.textContent="Nueva Partida";
    addLi.insertBefore(li,oldLi);
  }
  
  //Función que reinicia el juego y vuelve a empezar conservando el historial
  resetGame(){
    if(this.ready){
      const title=document.querySelector('h1');
      const oldText=title.textContent;
      title.textContent='Nueva Partida';
      this.prepareNewli();
    
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
        imagesGamer.forEach((e,index) => {
          imagesGamer[index].src='img/defecto.png';
        });//end foreach
    },2000);//end setTimeout
    }
  }//end resetGame

  //Función que muestra la imagen a la que ha hecho click el jugador
  selectImg(event){
    let numSelected;
    const compareEvent=document.querySelectorAll('#jugador img');
    compareEvent.forEach((element,index)=> {
      if(compareEvent[index].className==='seleccionado'){
        compareEvent[index].classList.toggle('seleccionado');
        compareEvent[index].classList.toggle('noSeleccionado');
      }
      if (event.className===compareEvent[index].className){
        event.classList.toggle('noSeleccionado');
        event.classList.toggle('seleccionado');
        numSelected=index;
      }//end if
    }); 
    return numSelected;
  }//end selectImg
}

// Nos aseguramos que el código se ejecutará una vez se haya cargado todo el contenido de la página y cargamos la ejecución de los eventos 
document.addEventListener('DOMContentLoaded',()=>{
  const juego = new game;
  let varSelected=juego.selectImg(document.querySelector('.seleccionado'));

  document.addEventListener('click',(event) => {
    //Ejecutamos la función correspondiente al botón pulsado
    switch (event.target.textContent){
      case '¡JUGAR!':
        juego.prepareGame();
        break;
      case '¡YA!':
        juego.playGame(varSelected);
        break;
      case 'RESET':
        juego.resetGame();
        break;
    }//end switch 
    
    //Este evento nos permite mostrar la imagen que el jugador ha seleccionado
    if(event.target.parentNode.id=='jugador' && juego.ready){
      varSelected=juego.selectImg(event.target);
    }
  });//end addEventListener click

});//end DOMContentLoader

})();