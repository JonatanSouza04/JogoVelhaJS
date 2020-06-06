var jogador = {um : [], dois: [], ativo: 1};
var quadroMarcados = [];
var ganhou = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var msg = document.getElementById('msg');
var btn = document.getElementById('btn');
btn.onclick = function(){
  novoJogo();
}
let montarJogo = document.getElementById('jogo');
for(let i = 0; i < 9; i++)
{
  let divNova = document.createElement('div');
  divNova.setAttribute('class','item');
  divNova.setAttribute('id',i);
  let conteudoNovo = document.createTextNode(""); 
  divNova.appendChild(conteudoNovo); 
  divNova.onclick = function() { 
       onClickElement(i);
  }
  montarJogo.appendChild(divNova);
}

function onClickElement(id){
  let element = document.getElementById(id);
  if(quadroMarcados.indexOf(id) === -1)
  {
      quadroMarcados.push(id);
      if(jogador.ativo === 1)
      {
        element.innerHTML = '#';
        element.setAttribute('class','item red');
        jogador.um.push(id+1);
        check();
        jogador.ativo     = 2;
      }
      else
      {
        element.innerHTML = 'O'; 
        element.setAttribute('class','item blue');
        jogador.dois.push(id+1);
        check();
        jogador.ativo  = 1;
      }
      if(quadroMarcados.length > 0)
      msg.innerText = 'Sua vez jogador Nº ' + jogador.ativo;

      if(quadroMarcados.length >= 9)
      {
        for(let i = 0; i < 9; i++){
          let element = document.getElementById(i);
          element.innerHTML = ':(';
          element.onclick   = null;
        }
        msg.innerText     = 'O JOGO EMPATOU!!!';
        btn.style.display = 'block';
      }
  };
 
}

function check(){
   for(let i = 0; i < ganhou.length; i++){
      for(let j = 0; j < ganhou[i].length; j++){
            if(jogador.ativo === 1 && jogador.um.indexOf(ganhou[i][j]) === -1)
            break;
            if(jogador.ativo === 2 && jogador.dois.indexOf(ganhou[i][j]) === -1)
            break;
            
            if(j === ganhou[i].length-1)
            jogadorGanhou(jogador.ativo,ganhou[i]);
         }
    }   
}

function jogadorGanhou(jogador,linha){
  quadroMarcados = [];
  jogador.um     = [];
  jogador.dois   = [];
  msg.innerText = 'PARABÉNS!!!! JOGADOR Nº ' + jogador + ' VOCÊ GANHOU!!!!';
  for(let i = 0; i < 9; i++){
    let element = document.getElementById(i);
    element.onclick = null;
  }  
  setTimeout(() => {
    for(let i = 0; i < linha.length; i++){
      let element = document.getElementById(linha[i]-1);
      element.setAttribute('class',element.getAttribute('class') + ' pulse' );
    }
    btn.style.display = 'block';
  },100);
  let elementJogador = document.getElementById('placarJg' + jogador);
  elementJogador.value = ( parseInt(elementJogador.value) + 1);
}

function novoJogo(){
  quadroMarcados = [];
  jogador.um     = [];
  jogador.dois   = [];
  for(let i = 0; i < 9; i++){
    let element = document.getElementById(i);
    element.setAttribute('class','item');
    element.onclick = function() { 
      onClickElement(i);
    };
    element.innerHTML = '';
  } 
  btn.style.display = 'none';
  jogador.ativo = 1;
  msg.innerText = 'Vamos começar jogador Nº 1';
}


