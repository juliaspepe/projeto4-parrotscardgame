let quantidadeCartas;
let cont = 0;
let contador = 0;
let primeiraCartaSelecionada;
let segundaCartaSelecionada;
let idTimeout;
let cartasDistribuidas;
let cartas;
let frenteCartaUm, versoCartaUm, frenteCartaDois, versoCartaDois;
let imagens = [
"bobrossparrot.gif",
"explodyparrot.gif",
"fiestaparrot.gif",
"metalparrot.gif",
"revertitparrot.gif",
"tripletsparrot.gif",
"unicornparrot.gif"
];

function QdCartas(){
    quantidadeCartas =  prompt("Com quantas cartas quer jogar? (número par entre 4 e 14)");

     if (quantidadeCartas < 4 || quantidadeCartas > 14 || quantidadeCartas % 2 !== 0) {
        QdCartas();
     } else {
        cartasDistribuidas = Number(quantidadeCartas);
        DistribuirCartas();
     }
 
    }
QdCartas();

function comparador() { 
	return Math.random() - 0.5; 
}

function DistribuirCartas(){

    cartas = document.querySelector(".caixa-cartas");

    imagens.sort(comparador);
    for (s=imagens.length; s>cartasDistribuidas/2; s--){
    imagens.pop();
    }
    // a) primeiro loop do primeiro for: 0 é menor que 2? TRUE
    // e) segundo loop do primeiro for: 1 é menor que 2? TRUE
    // i) terceiro loop do primeiro for: 2 é menor que 2? FALSE (**loop encerrado!**)
    for (j=0; j < 2; j++){
    // b) primeiro loop do segundo for: 0 é menor que 2? TRUE. 
    // C) segundo loop do segundo for: 1 é menor que 2? TRUE.
    // d) terceiro loop do segundo for: 2 é menor que 2? FALSE (acaba loop é volta para primeiro for)
    // f) primeiro loop do segundo for: 0 é menor que 2? TRUE. 
    // g) segundo loop do segundo for: 1 é menor que 2? TRUE.
    // h) terceiro loop do segundo for: 2 é menor que 2? FALSE (acaba loop é volta para primeiro for)
    imagens.sort(comparador);
    for (i=0; i < cartasDistribuidas/2; i++){
    let adicionaCarta = `
    <div class="carta" onclick="Virar(this)">
    <div class="front">
    <img src="imagens/front.png"/>
    </div>
    <div class="back escondido">
    <img src="imagens/${imagens[i]}"/>
    </div>
    </div>`;

    cartas.innerHTML += adicionaCarta;
      }
    }
  }


function Virar(item){

    contador;

    item.classList.add("selecionado");

    if (document.querySelectorAll(".selecionado").length%2==1){
    primeiraCartaSelecionada = item;
    frenteCartaUm = item.querySelector(".front");
    frenteCartaUm.classList.add("escondido");
    versoCartaUm = item.querySelector(".back");
    versoCartaUm.classList.remove("escondido");
    
    contador++;

    } else {
    segundaCartaSelecionada = item;
    frenteCartaDois = item.querySelector(".front");
    frenteCartaDois.classList.add("escondido");
    versoCartaDois = item.querySelector(".back");
    versoCartaDois.classList.remove("escondido");

    contador++;

    if (primeiraCartaSelecionada.innerHTML === segundaCartaSelecionada.innerHTML){
    primeiraCartaSelecionada.classList.remove("selecionado");
    primeiraCartaSelecionada.classList.add("par");
    segundaCartaSelecionada.classList.remove("selecionado");
    segundaCartaSelecionada.classList.add("par");

    document.querySelector(".par").disabled = true;

    } else {
    idTimeout = setTimeout(ParErrado, 1000);
      
    }
  }
  setTimeout(JogoFinalizado, 1000);
}


 function ParErrado(){
    frenteCartaUm.classList.remove("escondido");
    versoCartaUm.classList.add("escondido");
    frenteCartaDois.classList.remove("escondido");
    versoCartaDois.classList.add("escondido");
    primeiraCartaSelecionada.classList.remove("selecionado");
    segundaCartaSelecionada.classList.remove("selecionado");
  
    clearTimeout(idTimeout);
 }

  function JogoFinalizado(){
    paresCertos = document.querySelectorAll(".par");
    if (paresCertos.length === cartasDistribuidas){
    alert (`Você ganhou em ${contador} jogadas!`);
  }
}