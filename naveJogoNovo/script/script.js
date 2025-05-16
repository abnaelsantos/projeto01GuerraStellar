const botaoInstrucao = document.getElementById('btn-instrucao');
const txtInstrucao = document.getElementById('txt-instrucao');
const botaoVoltar = document.getElementById('btnVoltar');
const botoesControle = document.querySelector('.botoes-controle');
const menu = document.getElementById('menu');

const botaoPausar = document.getElementById('pausar');
const botaoAtualizar = document.getElementById('atualizar');
const botaoIniciar = document.getElementById('iniciar');
const botaoRetornar = document.getElementById('retornar');


const cenario = document.getElementById('cenario');
const nave = document.getElementById('nave');
const vida = document.getElementById('vida');
const pontos = document.getElementById('pontos');
const audioJogo = new Audio('/audios/musicaDeFundo.wav');
const usuarioExtra = document.querySelector('.usuarioExtra');


const larguraCenario = cenario.offsetWidth || 100;
const alturaCenario = cenario.offsetHeight || 100;

const larguraNave = nave.offsetWidth || 100;
const alturaNave = nave.offsetHeight || 100;

const volumeAudioTiroNaves = 0.2;
const volumeAudioJogo = 0.4;


const velocidade = 25;
const velocidadeTiro = 30;
const vidasNaveInimigas = 5;
const velocidadeNaveinimigas = 4;
const vidaAtual = 100;

const vidasNaveInimigaExtra = 100;
const vidaInicialNaveInimigaExtra = 100;

const velocidadePoder = 4;

let pontosAtual = 0;
let tiroAtual = 0
let tiroAtual2 = 0;
let tiroAtual3 = 0;
let estarAtirando = false;

let checaMoveNave = null;
let checaMoveTiro = null;
let checaTiros = null;
let checaMoveNaveInimigas = null;
let checaNaveInimigas = null;
let checaColisao = null;
let checaColisaoNave = null;

let checarNaveInimigaExtra = null;
let checaMoveNaveExtra = null;
let checaColisaoNaveInimigaExtra = null;
let checaTirosNaveExtra = null;
let checaColisaoTirosNaveExtra = null;
let checaMoveTirosNaveExtra = null;

let checaMovePoderUsuario = null;
let checaPegarPoder = null;

let checaMoveTrios2 = null;
let checaTiros2 = null;
let checaMoveTrios3 = null;
let checaTiros3 = null;

let posicaoHorizontal = larguraCenario / 2 - 90;
let posicaoVertical = alturaCenario - alturaNave;
let direcaoHorizontal = 0;
let direcaoVertical = 0;

const instrucao = () => {
  txtInstrucao.classList.remove('hidden');
  botaoIniciar.classList.add('hidden');
  botaoInstrucao.classList.add('hidden');
  
};

const btnVoltar = () => {
    txtInstrucao.classList.add('hidden');
    botaoIniciar.classList.remove('hidden');
    botaoInstrucao.classList.remove('hidden');
    
};

const teclaPrecionada = (tecla) =>{
    if(tecla.key === 'ArrowRight')direcaoHorizontal = 1;
        
    else if(tecla.key === 'ArrowLeft')direcaoHorizontal = -1;
        
    else if(tecla.key === 'ArrowDown')direcaoVertical = 1;
        
    else if(tecla.key === 'ArrowUp')direcaoVertical = -1;
        
    else if(tecla.key === ' '){estarAtirando = true;}
        
    
   
}

const teclaSolta = (tecla) =>{
    if(tecla.key === 'ArrowRight' || tecla.key === 'ArrowLeft'){
        direcaoHorizontal = 0;
    }
    else if(tecla.key === 'ArrowDown' || tecla.key === 'ArrowUp'){
        direcaoVertical = 0;
    }
    else if(tecla.key === ' '){
        estarAtirando = false;
    }
    
}
// move a nave de usuario
const moveNave = () => {
    posicaoHorizontal += direcaoHorizontal * velocidade;
    posicaoVertical += direcaoVertical * velocidade;

    if(posicaoHorizontal < 0 )posicaoHorizontal = 0;

    else if (posicaoHorizontal + larguraNave > larguraCenario){
        posicaoHorizontal = larguraCenario - larguraNave;
    }

    if(posicaoVertical < 0 )posicaoVertical = 0;

    else if (posicaoVertical + alturaNave > alturaCenario){
        posicaoVertical = alturaCenario - alturaNave;
    }

    nave.style.left = posicaoHorizontal + 'px';
    // nave.style.right = posicaoHorizontal - 'px';
    nave.style.top = posicaoVertical + 'px';
    // nave.style.bottom = posicaoVertical - 'px';
}


// tiros da nave de usuario
const atirar = () =>{
    const derlayTiro = Date.now();
    const atrasoTiro = derlayTiro - tiroAtual;

    if(estarAtirando && atrasoTiro >= 150){
        tiroAtual = Date.now();
        criaTiros(posicaoHorizontal + 88, posicaoVertical - 5);
    }
}


const criaTiros = (posicaoLeftTiro, posicaoTopTiro) =>{
    const tiro = document.createElement('div');
    tiro.className = 'tiro';
    tiro.style.position = 'absolute';
    tiro.style.width = '5px';
    tiro.style.height = '25px'
    tiro.style.borderRadius = '30%'
    tiro.style.left = posicaoLeftTiro + 'px';
    tiro.style.top = posicaoTopTiro + 'px';
    cenario.appendChild(tiro);
    
    audioTiros();
    audioTiros.volume = volumeAudioTiroNaves;;
    
}

// tiros de poder

const atirar2 = () =>{
    const derlayTiro = Date.now();
    const atrasoTiro2 = derlayTiro - tiroAtual2;

    if(poderAtivo && estarAtirando && atrasoTiro2 >= 150){
        tiroAtual2 = Date.now();
        criaTirosPoder(posicaoHorizontal + 47, posicaoVertical + 20);
    }
}


const criaTirosPoder = (posicaoLeftTiro, posicaoTopTiro) =>{
    const tiro2 = document.createElement('div');
    tiro2.className = 'tiro2';
    tiro2.style.position = 'absolute';
    tiro2.style.width = '5px';
    tiro2.style.height = '25px'
    tiro2.style.borderRadius = '30%'
    // tiro2.style.backgroundColor = 'blue';
    tiro2.style.left = posicaoLeftTiro + 'px';
    tiro2.style.top = posicaoTopTiro + 'px';
    cenario.appendChild(tiro2);
    
    audioTiros();
    audioTiros.volume = volumeAudioTiroNaves;;
    
}

const moveTirosPoder = () =>{
    const tiros2 = document.querySelectorAll('.tiro2');
    for(let i = 0; i < tiros2.length; i++){
        if(tiros2[i]){
            let posicaoTopTiro = tiros2[i].offsetTop;
            posicaoTopTiro -= velocidadeTiro;
            tiros2[i].style.top = posicaoTopTiro + 'px';
            if(posicaoTopTiro < -10){
                tiros2[i].remove();
            }
        }
    }
    
}

// fim tiros de poder

// tiros de poder3

const atirar3 = () =>{
    const derlayTiro = Date.now();
    const atrasoTiro3 = derlayTiro - tiroAtual3;

    if(poderAtivo && estarAtirando && atrasoTiro3 >= 150){
        tiroAtual3 = Date.now();
        criaTirosPoder3(posicaoHorizontal + 130, posicaoVertical + 25);
    }
}


const criaTirosPoder3 = (posicaoLeftTiro, posicaoTopTiro) =>{
    const tiro3 = document.createElement('div');
    tiro3.className = 'tiro3';
    tiro3.style.position = 'absolute';
    tiro3.style.width = '5px';
    tiro3.style.height = '25px'
    tiro3.style.borderRadius = '30%'
    // tiro3.style.backgroundColor = 'green';
    tiro3.style.left = posicaoLeftTiro + 'px';
    tiro3.style.top = posicaoTopTiro + 'px';
    cenario.appendChild(tiro3);
    
    audioTiros();
    audioTiros.volume = 0.1;
    
}

const moveTirosPoder3 = () =>{
    const tiros3 = document.querySelectorAll('.tiro3');
    for(let i = 0; i < tiros3.length; i++){
        if(tiros3[i]){
            let posicaoTopTiro = tiros3[i].offsetTop;
            posicaoTopTiro -= velocidadeTiro;
            tiros3[i].style.top = posicaoTopTiro + 'px';
            if(posicaoTopTiro < -10){
                tiros3[i].remove();
            }
        }
    }
    
}

// fim tiros de poder

// Audio poder

const audioPoder = () =>{
    const audioPoder = document.createElement('audio');
    audioPoder.className = 'audioPoder';
    audioPoder.setAttribute('src', '/audios/somPoder.mp3');
    audioPoder.play();
    cenario.appendChild(audioPoder);
    audioPoder.addEventListener('ended', () =>{
        audioPoder.remove();
    });
}

// fim do audio poder


const audioTiros = () =>{
    const audioDoTiro = document.createElement('audio');
    audioDoTiro.className = 'audiotiro';
    audioDoTiro.setAttribute('src', '/audios/segundoAudioTiro.mp3');
    audioDoTiro.volume = volumeAudioTiroNaves;
    audioDoTiro.play();
    cenario.appendChild(audioDoTiro);
    audioDoTiro.addEventListener('ended', () =>{
        audioDoTiro.remove();
    });
}


const moveTiros = () =>{
    const tiros = document.querySelectorAll('.tiro');
    for(let i = 0; i < tiros.length; i++){
        if(tiros[i]){
            let posicaoTopTiro = tiros[i].offsetTop;
            posicaoTopTiro -= velocidadeTiro;
            tiros[i].style.top = posicaoTopTiro + 'px';
            if(posicaoTopTiro < -10){
                tiros[i].remove();
            }
        }
    }
    
}

// naves inimigas
const naveInimigas = () =>{
    const inimigo = document.createElement('div');
    inimigo.className = 'inimigo';
    inimigo.style.position = 'absolute';
    inimigo.setAttribute('data-vida', vidasNaveInimigas);
    inimigo.style.width = '100px';
    inimigo.style.height = '100px';
    inimigo.style.backgroundImage = 'url(/imagens/inimigo.gif';
    inimigo.style.backgroundPosition = 'center';
    inimigo.style.backgroundRepeat = 'no-repeat';
    inimigo.style.backgroundSize = 'contain';
    inimigo.style.left = Math.floor(Math.random() * (larguraCenario - larguraNave)) + 'px';
    inimigo.style.top = '-100px';
    cenario.appendChild(inimigo);
    
    
}

const moveNaveInimigas = ()=>{
    const naveInimigas = document.querySelectorAll('.inimigo');
    for(let i = 0; i < naveInimigas.length; i++){
        if(naveInimigas[i]){
            let posicaoTopNaveInimiga = naveInimigas[i].offsetTop;
            posicaoTopNaveInimiga += velocidadeNaveinimigas;
            naveInimigas[i].style.top = posicaoTopNaveInimiga + 'px';
            if(posicaoTopNaveInimiga >= alturaCenario){
               naveInimigas[i].remove();
            }
        }
    }
}

const colisaoTiros = ()=>{
    const todasNavesInimigas = document.querySelectorAll('.inimigo');
    const todosTiros = document.querySelectorAll('.tiro');
    const todosTirosPoder2 = document.querySelectorAll('.tiro2');
    const todosTirosPoder3 = document.querySelectorAll('.tiro3');
    todasNavesInimigas.forEach((naveInimiga) =>{
        todosTiros.forEach((tiro) =>{
            const colisaoNaveInimiga = naveInimiga.getBoundingClientRect();
            const colisaotiro = tiro.getBoundingClientRect();
            const posicaoNaveInimigaLeft = naveInimiga.offsetLeft;
            const posicaoNaveInimigaTop = naveInimiga.offsetTop;
            let vidaAtualNaveInimiga = parseInt(naveInimiga.getAttribute('data-vida'), 10);
            if(
                colisaoNaveInimiga.left < colisaotiro.right &&
                colisaoNaveInimiga.right > colisaotiro.left &&
                colisaoNaveInimiga.top < colisaotiro.bottom &&
                colisaoNaveInimiga.bottom > colisaotiro.top
            ){
                vidaAtualNaveInimiga--;
                tiro.remove();
                if(vidaAtualNaveInimiga === 0){
                    pontosAtual += 10;
                    pontos.textContent = `Pontos: ${pontosAtual}`;
                    naveInimiga.remove();
                    naveInimigaDestruida(posicaoNaveInimigaLeft, posicaoNaveInimigaTop);
                    // Verifica se pontos são múltiplos de 200
                    if (pontosAtual % 200 === 0 && pontosAtual > 0) {
                        naveInimigaExtra();
                        
                    }
                }
                else{
                    naveInimiga.setAttribute('data-vida', vidaAtualNaveInimiga);
                }
            }

        });

        todosTirosPoder2.forEach((tiro2) =>{
                const colisaoNaveInimiga = naveInimiga.getBoundingClientRect();
                const colisaoTiro2 = tiro2.getBoundingClientRect();
                
                const posicaoNaveInimigaLeft = naveInimiga.offsetLeft;
                const posicaoNaveInimigaTop = naveInimiga.offsetTop;
                let vidaAtualNaveInimiga = parseInt(naveInimiga.getAttribute('data-vida'), 10);
            
                if (
                    colisaoNaveInimiga.left < colisaoTiro2.right  &&
                    colisaoNaveInimiga.right > colisaoTiro2.left  &&
                    colisaoNaveInimiga.top < colisaoTiro2.bottom  &&
                    colisaoNaveInimiga.bottom > colisaoTiro2.top 

                ){
                    vidaAtualNaveInimiga--;
                    tiro2.remove();
                    

                    if(vidaAtualNaveInimiga === 0) {
                        pontosAtual += 10;
                        pontos.textContent = `POntos: ${pontosAtual}`;
                        naveInimiga.remove();
                        naveInimigaDestruida(posicaoNaveInimigaLeft, posicaoNaveInimigaTop);
                        
                        if(pontosAtual % 200 === 0 && pontosAtual > 0){
                            naveInimigaExtra();
                        }
                }else{
                    naveInimiga.setAttribute('data-vida', vidaAtualNaveInimiga);
                }
            }
        });

        todosTirosPoder3.forEach((tiro3) =>{
            const colisaoNaveInimiga = naveInimiga.getBoundingClientRect();
                const colisaoTiro3 = tiro3.getBoundingClientRect();
                
                const posicaoNaveInimigaLeft = naveInimiga.offsetLeft;
                const posicaoNaveInimigaTop = naveInimiga.offsetTop;
                let vidaAtualNaveInimiga = parseInt(naveInimiga.getAttribute('data-vida'), 10);
            
                if (
                    colisaoNaveInimiga.left < colisaoTiro3.right  &&
                    colisaoNaveInimiga.right > colisaoTiro3.left  &&
                    colisaoNaveInimiga.top < colisaoTiro3.bottom  &&
                    colisaoNaveInimiga.bottom > colisaoTiro3.top 

                ){
                    vidaAtualNaveInimiga--;
                    tiro3.remove();
                    

                    if(vidaAtualNaveInimiga === 0) {
                        pontosAtual += 10;
                        pontos.textContent = `Pontos: ${pontosAtual}`;
                        naveInimiga.remove();
                        naveInimigaDestruida(posicaoNaveInimigaLeft, posicaoNaveInimigaTop);
                        
                        if(pontosAtual % 200 === 0 && pontosAtual > 0){
                            naveInimigaExtra();
                        }
                }else{
                    naveInimiga.setAttribute('data-vida', vidaAtualNaveInimiga);
                }
             }
        })
    });
}


let vidaAtualNave = 100;
const colisaoNaveInimiga = () => {
    const todasNavesInimigas = document.querySelectorAll('.inimigo');
    const colisaoNave = nave.getBoundingClientRect();
    for (let i = 0; i < todasNavesInimigas.length; i++) {
        const colisaoInimiga = todasNavesInimigas[i].getBoundingClientRect();
        
            
        if (
            colisaoNave.left < colisaoInimiga.right &&
            colisaoNave.right > colisaoInimiga.left &&
            colisaoNave.top < colisaoInimiga.bottom &&
            colisaoNave.bottom > colisaoInimiga.top
        ) {
           let posicaoLeftNaveInimiga = todasNavesInimigas[i].offsetLeft;
           let posicaoTopNaveInimiga = todasNavesInimigas[i].offsetTop;
           
            todasNavesInimigas[i].remove();
            colisaoNaveInimigaDestruida(posicaoLeftNaveInimiga, posicaoTopNaveInimiga);

            vidaAtualNave -= 10;
            vida.textContent = `Vida: ${vidaAtualNave}`;

            pontosAtual += 10;
            pontos.textContent = `Pontos: ${pontosAtual}`;
            
            nave.classList.add('sacudir');
            setTimeout(() =>{
                nave.classList.remove('sacudir');
            }, 500);


            if (pontosAtual % 200 === 0 && pontosAtual > 0) {
                naveInimigaExtra();
                
            }
            
            if (vidaAtualNave <= 0) {
                let posicaoLeftNaveUsuario = nave.offsetLeft;
                let posicaoTopNaveUsuario = nave.offsetTop;
                
                colisaoNaveUsuario(posicaoLeftNaveUsuario, posicaoTopNaveUsuario);
                
                nave.remove();
                gameOver();
            }
            break;
        }
        
    }
};

const audioExplosoes = () =>{
    const audioexplosaoNaveInimiga = document.createElement('audio');
    audioexplosaoNaveInimiga.className = 'audiotiro';
    audioexplosaoNaveInimiga.setAttribute('src', '/audios/destruido.mp3');
    audioexplosaoNaveInimiga.play();
    cenario.appendChild(audioexplosaoNaveInimiga);
    audioexplosaoNaveInimiga.addEventListener('ended', () =>{
        audioexplosaoNaveInimiga.remove();
    });
}

// Explosão das naves
const naveInimigaDestruida = (posicaoLeftNaveInimiga, posicaoTopNaveInimiga) =>{
    const explosaoInimiga = document.createElement('div');
    explosaoInimiga.className = 'explosaoInimiga';
    explosaoInimiga.style.position = 'absolute';
    explosaoInimiga.style.width = '100px';
    explosaoInimiga.style.height = '100px';
    explosaoInimiga.style.backgroundImage = 'url(/imagens/eliminado.gif)';
    explosaoInimiga.style.backgroundPosition = 'center';
    explosaoInimiga.style.backgroundRepeat = 'no-repeat';
    explosaoInimiga.style.backgroundSize = 'contain';
    explosaoInimiga.style.left = posicaoLeftNaveInimiga + 'px';
    explosaoInimiga.style.top = posicaoTopNaveInimiga + 'px';
    cenario.appendChild(explosaoInimiga);
    audioExplosoes();
    setTimeout(() =>{cenario.removeChild(explosaoInimiga);}, 1000)
}

const colisaoNaveInimigaDestruida = (posicaoLeftNaveInimiga, posicaoTopNaveInimiga) =>{
   const colisaoNaveInimiga = document.createElement('div');
    colisaoNaveInimiga.className = 'colisaoNaveInimiga';
    colisaoNaveInimiga.style.position = 'absolute';
    colisaoNaveInimiga.style.width = '100px';
    colisaoNaveInimiga.style.height = '100px';
    colisaoNaveInimiga.style.backgroundImage = 'url(/imagens/eliminado.gif)';
    colisaoNaveInimiga.style.backgroundPosition = 'center';
    colisaoNaveInimiga.style.backgroundRepeat = 'no-repeat';
    colisaoNaveInimiga.style.backgroundSize = 'contain';
    colisaoNaveInimiga.style.left = posicaoLeftNaveInimiga + 'px';
    colisaoNaveInimiga.style.top = posicaoTopNaveInimiga + 'px';
    cenario.appendChild(colisaoNaveInimiga);
    audioExplosoes();
    setTimeout(() =>{cenario.removeChild(colisaoNaveInimiga);}, 1000);
}

const colisaoNaveUsuario = (posicaoLeftNaveUsuario, posicaoTopNaveUsuario) =>{
    const colisaoNave = document.createElement('div');
     colisaoNave.className = 'colisaoNave';
     colisaoNave.style.position = 'absolute';
     colisaoNave.style.width = '100px';
     colisaoNave.style.height = '100px';
     colisaoNave.style.backgroundImage = 'url(/imagens/eliminado.gif)';
     colisaoNave.style.backgroundPosition = 'center';
     colisaoNave.style.backgroundRepeat = 'no-repeat';
     colisaoNave.style.backgroundSize = 'contain';
     colisaoNave.style.left = posicaoLeftNaveUsuario + 'px';
     colisaoNave.style.top = posicaoTopNaveUsuario + 'px';
     cenario.appendChild(colisaoNave);
     setTimeout(() =>{cenario.removeChild(colisaoNave);}, 1000);
 }

 // fim

 const pausarJogo = () => {
    cenario.style.animation = 'none';
    cenario.style.backgroundPosition = '0 0';

    clearInterval(checaMoveNave); // Para o movimento da nave
    clearInterval(checaNaveInimigas);
    clearInterval(checaMoveNaveInimigas);
    clearInterval(checaTiros);
    clearInterval(checaMoveTiro);
    clearInterval(checaColisaoNaveInimigaExtra);
    clearInterval(checarNaveInimigaExtra);
    clearInterval(checaTirosNaveExtra);
    clearInterval(checaColisaoTirosNaveExtra);
    clearInterval(checaMoveTirosNaveExtra);
    clearInterval(checaMovePoderUsuario);
    clearInterval(checaPegarPoder);
    clearInterval(checaMoveTrios2);
    clearInterval(checaTiros2);
    clearInterval(checaMoveTrios3)
    clearInterval(checaTiros3);

    audioJogo.pause();
    audioJogo.loop = false;

    botaoPausar.setAttribute('hidden', 'hidden');
    botaoRetornar.removeAttribute('hidden');
    document.removeEventListener('keydown', teclaPrecionada);
    document.removeEventListener('keyup', teclaSolta);
     
};

const retornarJogo = () => {
    checaMoveNave = setInterval(moveNave, 50); // Reinicia o movimento
    checaNaveInimigas = setInterval(naveInimigas, 2500);
    checaMoveNaveInimigas = setInterval(moveNaveInimigas, 50);
    checaTiros = setInterval(atirar, 10);
    checaMoveTiro = setInterval(moveTiros, 50);
    checaColisaoNave = setInterval(colisaoNaveInimiga, 10);
    checaColisao = setInterval(colisaoTiros, 10);
    
    checarNaveInimigaExtra = setInterval(moveNaveInimigaExtra, 50);
    checaColisaoNaveInimigaExtra = setInterval(colisaoTirosNaveInimigaExtra, 10)
    checaTirosNaveExtra = setInterval(atirarNaveInimigaExtra, 2500);
    checaColisaoTirosNaveExtra = setInterval(colisaoTirosNaveExtra, 10);
    checaMoveTirosNaveExtra = setInterval(moveTirosNaveExtra, 100);

    checaMovePoderUsuario = setInterval(movePoderUsuario, 50);
    checaPegarPoder = setInterval(naveUsuarioPegaPoder, 10);

    checaTiros2 = setInterval(atirar2, 10);
    checaMoveTrios2 = setInterval(moveTirosPoder, 50);

    checaTiros3 = setInterval(atirar3, 10);
    checaMoveTrios3 = setInterval(moveTirosPoder3, 50);

    audioJogo.loop = true;
    audioJogo.play();

    botaoRetornar.setAttribute('hidden', 'hidden');
    botaoPausar.removeAttribute('hidden');
    document.addEventListener('keydown', teclaPrecionada);
    document.addEventListener('keyup', teclaSolta);
    cenario.style.animation = 'animarCenario 10s infinite linear';
};

// Nave extra

const atirarNaveInimigaExtra = () => {
    const naveInimigaExtra = document.querySelector('.inimigoExtra');
    if (naveInimigaExtra) {
        const posicaoLeftNaveExtra = naveInimigaExtra.offsetLeft + 125 - 5; // Centro da nave (250px / 2)
        const posicaoTopNaveExtra = naveInimigaExtra.offsetTop + 250 - 100; // Base da nave (altura 250px)
        criaTirosNaveExtra(posicaoLeftNaveExtra, posicaoTopNaveExtra);
    }
};

const criaTirosNaveExtra = (posicaoLeftTiro, posicaoTopTiro) => {
    const tiroExtra = document.createElement('div');
    tiroExtra.className = 'tiroExtra';
    tiroExtra.style.position = 'absolute';
    
    tiroExtra.style.left = posicaoLeftTiro + 'px';
    tiroExtra.style.top = posicaoTopTiro + 'px';
    cenario.appendChild(tiroExtra);
    audioTirosNaveExtra();
};

const audioTirosNaveExtra = () => {
    const audioDoTiroExtra = document.createElement('audio');
    audioDoTiroExtra.className = 'audiotiroextra';
    audioDoTiroExtra.setAttribute('src', '/audios/audioTiroExtra.mp3'); 
    audioDoTiroExtra.volume = volumeAudioTiroNaves;
    audioDoTiroExtra.play();
    cenario.appendChild(audioDoTiroExtra);
    audioDoTiroExtra.addEventListener('ended', () => {
        audioDoTiroExtra.remove();
    });
};

const moveTirosNaveExtra = () => {
    const tirosExtra = document.querySelectorAll('.tiroExtra');
    for (let i = 0; i < tirosExtra.length; i++) {
        if (tirosExtra[i]) {
            let posicaoTopTiro = tirosExtra[i].offsetTop;
            posicaoTopTiro += velocidadeTiro; // Move para baixo
            tirosExtra[i].style.top = posicaoTopTiro + 'px';
            if (posicaoTopTiro > alturaCenario) {
                tirosExtra[i].remove();
            }
        }
    }
};

const colisaoTirosNaveExtra = () => {
    const todosTirosExtra = document.querySelectorAll('.tiroExtra');
    const colisaoNave = nave.getBoundingClientRect();
    todosTirosExtra.forEach((tiroExtra) => {
        const colisaoTiroExtra = tiroExtra.getBoundingClientRect();
        if (
            colisaoNave.left < colisaoTiroExtra.right &&
            colisaoNave.right > colisaoTiroExtra.left &&
            colisaoNave.top < colisaoTiroExtra.bottom &&
            colisaoNave.bottom > colisaoTiroExtra.top
        ) {
            tiroExtra.remove();
            vidaAtualNave -= 5; 
            vida.textContent = `Vida: ${vidaAtualNave}`;

            nave.classList.add('sacudir');
            setTimeout(() =>{
                nave.classList.remove('sacudir');
            }, 500);

            if (vidaAtualNave <= 0) {
                let posicaoLeftNaveUsuario = nave.offsetLeft;
                let posicaoTopNaveUsuario = nave.offsetTop;
                colisaoNaveUsuario(posicaoLeftNaveUsuario, posicaoTopNaveUsuario);
                nave.remove();
                gameOver();
            }
        }
    });
};

const naveInimigaExtra = () =>{
    
    // Verifica se já existe uma nave inimiga extra
        const naveExistente = document.querySelector('.inimigoExtra');
        if (naveExistente) {
            return; // Não cria nova nave se já existe uma
        }
    
    const inimigoExtra = document.createElement('div');
    inimigoExtra.className = 'inimigoExtra'
    inimigoExtra.style.position = 'absolute';
    inimigoExtra.setAttribute('data-vida', vidasNaveInimigaExtra);
    inimigoExtra.setAttribute('data-vida-inicial', vidasNaveInimigaExtra);
    inimigoExtra.style.width = '250px';
    inimigoExtra.style.height = '250px';
    inimigoExtra.style.backgroundImage = 'url(/imagens/naveExtra.gif)';
    inimigoExtra.style.backgroundPosition = 'center';
    inimigoExtra.style.backgroundRepeat = 'no-repeat';
    inimigoExtra.style.backgroundSize = 'contain';
    inimigoExtra.style.left = (larguraCenario / 2 - 125) + 'px';
    inimigoExtra.style.top = '-100px';
    inimigoExtra.setAttribute('data-moving-down', 'true');
    cenario.appendChild(inimigoExtra);
    createHealthBar(inimigoExtra);
    setTimeout(() => {poderUsuario();}, 5000);
   

}
const moveNaveInimigaExtra = () => {
    const naveInimigasExtra = document.querySelectorAll('.inimigoExtra');
    const centroCenario = larguraCenario / 2 - 125; 
    const velocidadeLateral = 5; // Velocidade do movimento lateral
    const amplitude = 600 - 125; // Distância máxima do movimento lateral
    const posicaoFinalTopo = alturaCenario / 2 - 200; // 

    for (let i = 0; i < naveInimigasExtra.length; i++) {
        const nave = naveInimigasExtra[i];
        if (nave) {
            let posicaoTop = parseFloat(nave.style.top);
            let posicaoLeft = parseFloat(nave.style.left);
            let movingDown = nave.getAttribute('data-moving-down') === 'true';
            let movingToCenter = nave.getAttribute('data-moving-to-center') === 'true';

            if (movingDown) {
                // Move para baixo até a posição final no topo
                posicaoTop += velocidadeNaveinimigas;
                nave.style.top = posicaoTop + 'px';

                // Verifica se chegou à posição final no topo
                if (posicaoTop >= posicaoFinalTopo) {
                    nave.style.top = posicaoFinalTopo + 'px';
                    nave.setAttribute('data-moving-down', 'false');
                    nave.setAttribute('data-moving-to-center', 'true');
                }
            } else if (movingToCenter) {
                // Move para o centro
                posicaoLeft += velocidadeNaveinimigas;
                nave.style.left = posicaoLeft + 'px';

                // Verifica se chegou ao centro
                if (posicaoLeft >= centroCenario) {
                    nave.setAttribute('data-moving-to-center', 'false');
                    nave.setAttribute('data-direction', 'right');
                    nave.style.left = centroCenario + 'px';
                }
            } else {
                // Movimento lateral (esquerda-direita)
                let direction = nave.getAttribute('data-direction');
                let offset = parseFloat(nave.getAttribute('data-offset') || '0');

                if (direction === 'right') {
                    offset += velocidadeLateral;
                    if (offset >= amplitude) {
                        direction = 'left';
                        nave.setAttribute('data-direction', 'left');
                    }
                } else {
                    offset -= velocidadeLateral;
                    if (offset <= -amplitude) {
                        direction = 'right';
                        nave.setAttribute('data-direction', 'right');
                    }
                }

                nave.setAttribute('data-offset', offset);
                nave.style.left = (centroCenario + offset) + 'px';
            }
            if (nave.healthBarContainer){
                nave.healthBarContainer.style.left = nave.offsetLeft + 'px';
                nave.healthBarContainer.style.top = (nave.offsetTop - 15) + 'px';
            }
        }
    }
}

const colisaoTirosNaveInimigaExtra = ()=>{
    const todasNavesInimigasExtra = document.querySelectorAll('.inimigoExtra');
    const todosTirosExtra = document.querySelectorAll('.tiro');
    const todosTirosPoder2 = document.querySelectorAll('.tiro2');
    const todosTirosPoder3 = document.querySelectorAll('.tiro3');

    todasNavesInimigasExtra.forEach((naveInimigaExtra) =>{
        if (naveInimigaExtra.getAttribute('data-destroying') === true) return;

        todosTirosExtra.forEach((tiro) =>{
            const colisaoNaveInimigaExtra = naveInimigaExtra.getBoundingClientRect();
            const colisaotiroExtra = tiro.getBoundingClientRect();
            const posicaoNaveInimigaExtraLeft = naveInimigaExtra.offsetLeft;
            const posicaoNaveInimigaExtraTop = naveInimigaExtra.offsetTop;
            let vidaAtualNaveInimigaExtra = parseInt(naveInimigaExtra.getAttribute('data-vida'), 10);
            if(
                colisaoNaveInimigaExtra.left < colisaotiroExtra.right &&
                colisaoNaveInimigaExtra.right > colisaotiroExtra.left &&
                colisaoNaveInimigaExtra.top < colisaotiroExtra.bottom &&
                colisaoNaveInimigaExtra.bottom > colisaotiroExtra.top
            ){
                vidaAtualNaveInimigaExtra --;
                tiro.remove();
                updateHealthBar(naveInimigaExtra, vidaAtualNaveInimigaExtra, vidaInicialNaveInimigaExtra);
                if(vidaAtualNaveInimigaExtra <= 0){
                    naveInimigaExtra.setAttribute('data-destroying', 'true');

                    pontosAtual += 100;
                    naveInimigaExtra.remove();
                    naveInimigaExtraDestruida(posicaoNaveInimigaExtraLeft, posicaoNaveInimigaExtraTop);

                    pontos.textContent = `Pontos: ${pontosAtual}`;
                    if (naveInimigaExtra.healthBarContainer){
                        cenario.removeChild(naveInimigaExtra.healthBarContainer);
                    }
                    
                    
                    if (pontosAtual % 200 === 0 && pontosAtual > 0) {
                        naveInimigaExtra();
                    }
                }
                else{
                    naveInimigaExtra.setAttribute('data-vida', vidaAtualNaveInimigaExtra);
                }
            }

        });

        todosTirosPoder2.forEach((tiro2) =>{
            const colisaoNaveInimigaExtra = naveInimigaExtra.getBoundingClientRect();
            const colisaotiro2 = tiro2.getBoundingClientRect();
            const posicaoNaveInimigaExtraLeft = naveInimigaExtra.offsetLeft;
            const posicaoNaveInimigaExtraTop = naveInimigaExtra.offsetTop;
            let vidaAtualNaveInimigaExtra = parseInt(naveInimigaExtra.getAttribute('data-vida'), 10);
            if(
                colisaoNaveInimigaExtra.left < colisaotiro2.right &&
                colisaoNaveInimigaExtra.right > colisaotiro2.left &&
                colisaoNaveInimigaExtra.top < colisaotiro2.bottom &&
                colisaoNaveInimigaExtra.bottom > colisaotiro2.top
            ){
                vidaAtualNaveInimigaExtra --;
                tiro2.remove();
                updateHealthBar(naveInimigaExtra, vidaAtualNaveInimigaExtra, vidaInicialNaveInimigaExtra);
                if(vidaAtualNaveInimigaExtra <= 0){
                    naveInimigaExtra.setAttribute('data-destroying', 'true');
                    pontosAtual += 100;

                    naveInimigaExtra.remove();
                    naveInimigaExtraDestruida(posicaoNaveInimigaExtraLeft, posicaoNaveInimigaExtraTop);

                    pontos.textContent = `Pontos: ${pontosAtual}`;

                    if (naveInimigaExtra.healthBarContainer){
                        cenario.removeChild(naveInimigaExtra.healthBarContainer);
                    }
                    
                    
                    if (pontosAtual % 200 === 0 && pontosAtual > 0) {
                        naveInimigaExtra();
                    }
                }
                else{
                    naveInimigaExtra.setAttribute('data-vida', vidaAtualNaveInimigaExtra);
                }
            }
        });

        todosTirosPoder3.forEach((tiro3) =>{
            const colisaoNaveInimigaExtra = naveInimigaExtra.getBoundingClientRect();
            const colisaoTiro3 = tiro3.getBoundingClientRect();
            const posicaoNaveInimigaExtraLeft = naveInimigaExtra.offsetLeft;
            const posicaoNaveInimigaExtraTop = naveInimigaExtra.offsetTop;
            let vidaAtualNaveInimigaExtra = parseInt(naveInimigaExtra.getAttribute('data-vida'), 10);
            if(
                colisaoNaveInimigaExtra.left < colisaoTiro3.right &&
                colisaoNaveInimigaExtra.right > colisaoTiro3.left &&
                colisaoNaveInimigaExtra.top < colisaoTiro3.bottom &&
                colisaoNaveInimigaExtra.bottom > colisaoTiro3.top
            ){
                vidaAtualNaveInimigaExtra --;
                tiro3.remove();
                updateHealthBar(naveInimigaExtra, vidaAtualNaveInimigaExtra, vidaInicialNaveInimigaExtra);
                if(vidaAtualNaveInimigaExtra <= 0){
                    naveInimigaExtra.setAttribute('data-destroying', 'true');
                    pontosAtual += 100;

                    naveInimigaExtra.remove();
                    naveInimigaExtraDestruida(posicaoNaveInimigaExtraLeft, posicaoNaveInimigaExtraTop);

                    pontos.textContent = `Pontos: ${pontosAtual}`;
                    if (naveInimigaExtra.healthBarContainer){
                        cenario.removeChild(naveInimigaExtra.healthBarContainer);
                    }
                    
                    
                    if (pontosAtual % 200 === 0 && pontosAtual > 0) {
                        naveInimigaExtra();
                    }
                }
                else{
                    naveInimigaExtra.setAttribute('data-vida', vidaAtualNaveInimigaExtra);
                }
            }
        });
        
    });
}

const naveInimigaExtraDestruida = (posicaoLeftNaveInimigaExtra, posicaoTopNaveInimigaExtra) =>{
    // remove a barra de vida se não existe
    const naveInimigaExtra = document.elementFromPoint(posicaoLeftNaveInimigaExtra, posicaoTopNaveInimigaExtra)?.closest('.inimigoExtra');
    if (naveInimigaExtra?.healthBarContainer && cenario.contains(naveInimigaExtra.healthBarContainer)){
        cenario.removeChild(naveInimigaExtra.healthBarContainer);
    }
    const explosaoInimigaExtra = document.createElement('div');
    explosaoInimigaExtra.className = 'explosaoInimigaExtra';
    explosaoInimigaExtra.style.position = 'absolute';
    explosaoInimigaExtra.style.width = '250px';
    explosaoInimigaExtra.style.height = '250px';
    explosaoInimigaExtra.style.backgroundImage = 'url(/imagens/eliminado.gif)';
    explosaoInimigaExtra.style.backgroundPosition = 'center';
    explosaoInimigaExtra.style.backgroundRepeat = 'no-repeat';
    explosaoInimigaExtra.style.backgroundSize = 'contain';
    explosaoInimigaExtra.style.left = posicaoLeftNaveInimigaExtra + 'px';
    explosaoInimigaExtra.style.top = posicaoTopNaveInimigaExtra + 'px';
    cenario.appendChild(explosaoInimigaExtra);
    audioExplosoes();
    setTimeout(() =>{cenario.removeChild(explosaoInimigaExtra);}, 1000)
    
}



const createHealthBar = (naveInimigaExtra) => {
    const vidaInicialNaveInimigaExtra = parseInt(naveInimigaExtra.getAttribute('data-vida'), 10);
    const healthBarContainer = document.createElement('div');
    healthBarContainer.className = 'health-bar-container';
    healthBarContainer.style.position = 'absolute';
    healthBarContainer.style.width = '100px';
    healthBarContainer.style.height = '10px';
    healthBarContainer.style.backgroundColor = '#444';
    healthBarContainer.style.border = '1px solid #fff';
    healthBarContainer.style.left = naveInimigaExtra.offsetLeft + 'px';
    healthBarContainer.style.top = (naveInimigaExtra.offsetTop - 15) + 'px'; 

    const healthBar = document.createElement('div');
    healthBar.className = 'health-bar';
    healthBar.style.width = '100%';
    healthBar.style.height = '100%';
    healthBar.style.backgroundColor = 'green';
    healthBar.style.transition = 'width 0.2s ease'; 

    healthBarContainer.appendChild(healthBar);
    cenario.appendChild(healthBarContainer);
    naveInimigaExtra.healthBarContainer = healthBarContainer; 
};


const updateHealthBar = (naveInimigaExtra, vidasNaveInimigaExtra, vidaInicialNaveInimigaExtra) => {
    if (!naveInimigaExtra.healthBarContainer) return;
    const healthPercentage = (vidasNaveInimigaExtra / vidaInicialNaveInimigaExtra) * 100;
    const healthBar = naveInimigaExtra.healthBarContainer.querySelector('.health-bar');
    healthBar.style.width = `${healthPercentage}%`;
    // Change color based on health
    if (healthPercentage > 50) {
        healthBar.style.backgroundColor = 'green';
    } else if (healthPercentage > 20) {
        healthBar.style.backgroundColor = 'yellow';
    } else {
        healthBar.style.backgroundColor = 'red';
    }
   
};


// Fim nave EXTRA


// Poder para o usuario
const poderUsuario = () => {

    // Verifica se já existe um poder
        const poderExistente = document.querySelector('.poder');
        if (poderExistente) {
            return; // Não cria um novo poder
        }
    const poder = document.createElement('div');
    poder.className = 'poder';
    poder.style.position = 'absolute';
    poder.style.width = '50px';
    poder.style.height = '50px';
    poder.style.backgroundImage = 'url(/imagens/poder.png)';
    poder.style.backgroundPosition = 'center';
    poder.style.backgroundSize = 'contain';
    poder.style.top = '-100px';
    poder.style.left = (larguraCenario / 2 - 125) + 'px';
    poder.style.backgroundRepeat = 'no-repeat';
    cenario.appendChild(poder);

}

const movePoderUsuario = ()=>{
    const poderUsuarioMove = document.querySelectorAll('.poder');
    for(let i = 0; i < poderUsuarioMove.length; i++){
        if(poderUsuarioMove[i]){
            let posicaoTopPoderUsuario = poderUsuarioMove[i].offsetTop;
            posicaoTopPoderUsuario += velocidadePoder;
            poderUsuarioMove[i].style.top = posicaoTopPoderUsuario + 'px';
            if(posicaoTopPoderUsuario >= alturaCenario){
               poderUsuarioMove[i].remove();
               
            }
        }
    }
}
let poderAtivo = false;
const naveUsuarioPegaPoder = () => {
    const todosPoderes = document.querySelectorAll('.poder');
    const navePegaPoder = nave.getBoundingClientRect();
    for (let i = 0; i < todosPoderes.length; i++) {
        const navePoder = todosPoderes[i].getBoundingClientRect();
        
            
        if (
            navePegaPoder.left < navePoder.right &&
            navePegaPoder.right >navePoder.left &&
            navePegaPoder.top < navePoder.bottom &&
            navePegaPoder.bottom > navePoder.top
        ) {
           
            todosPoderes[i].remove();
            audioPoder();
            poderAtivo = true;
            setTimeout(() =>{
                poderAtivo = false;
            },10000);
            
        }
    }   
}


const atualizarJogo = () => {
   window.location.reload();
    
}

const gameOver = ()=>{
    
    document.removeEventListener('keydown', teclaPrecionada);
    document.removeEventListener('keyup', teclaSolta);

    botaoPausar.removeEventListener('click', pausarJogo);
    botaoRetornar.removeEventListener('click', retornarJogo);

    clearInterval(checaMoveNave);
    clearInterval(checaMoveTiro);
    clearInterval(checaMoveNaveInimigas);
    clearInterval(checaNaveInimigas);
    clearInterval(checaColisao);
    clearInterval(checaColisaoNave);
    clearInterval(checaTiros);
    clearInterval(checaColisaoNaveInimigaExtra);
    clearInterval(checarNaveInimigaExtra);
    clearInterval(checaTirosNaveExtra);
    clearInterval(checaColisaoTirosNaveExtra);
    clearInterval(checaMoveTirosNaveExtra);

    clearInterval(checaMovePoderUsuario);
    clearInterval(checaPegarPoder);

    cenario.style.animation = 'none';
    cenario.style.backgroundPosition = '0 0'

    const perdeu = document.createElement('div');
    perdeu.className = 'perdeu';
    perdeu.innerHTML = 'Game Over';
    cenario.appendChild(perdeu);

    audioJogo.pause();
    audioJogo.loop = false;

    cenario.removeChild(nave);

    // Remove as naves inimigas normais
    const navesInimigas = document.querySelectorAll('.inimigo');
    navesInimigas.forEach((inimigo) => {
        if (cenario.contains(inimigo)) {
            cenario.removeChild(inimigo);
        }
    });

    // Remove os tiros
    const todosTiros = document.querySelectorAll('.tiro');
    todosTiros.forEach((tiro) => {
        if (cenario.contains(tiro)) {
            cenario.removeChild(tiro);
        }
    });

    const todosTirosExtra = document.querySelectorAll('.tiroExtra');
    todosTirosExtra.forEach((tiroExtra) => {
    if (cenario.contains(tiroExtra)) {
        cenario.removeChild(tiroExtra);
    }
});

    // Remove as naves inimigas extras e suas barras de vida
    const navesInimigasExtra = document.querySelectorAll('.inimigoExtra');
    navesInimigasExtra.forEach((inimigoExtra) => {
        // Remove a barra de vida, se existir
        if (inimigoExtra.healthBarContainer && cenario.contains(inimigoExtra.healthBarContainer)) {
            cenario.removeChild(inimigoExtra.healthBarContainer);
        }
        // Remove a nave inimiga extra
        if (cenario.contains(inimigoExtra)) {
            cenario.removeChild(inimigoExtra);
        }
    });
    
}


const iniciarJogo = () => {
    
    document.addEventListener('keydown', teclaPrecionada);
    document.addEventListener('keyup', teclaSolta);

    botaoIniciar.style.display = 'none';
    audioJogo.loop = true;
    audioJogo.play();
    audioJogo.volume = volumeAudioJogo;

    cenario.style.animation = 'animarCenario 10s infinite linear';

    checaMoveNave = setInterval (moveNave, 50);
    checaTiros = setInterval(atirar, 10);
    checaMoveTiro = setInterval(moveTiros, 50);
    checaMoveNaveInimigas = setInterval(moveNaveInimigas, 50);
    checaColisao = setInterval(colisaoTiros, 10);
    checaNaveInimigas = setInterval(naveInimigas, 2500);
    checaColisaoNave = setInterval(colisaoNaveInimiga, 10);

    checaTiros2 = setInterval(atirar2, 10);
    checaMoveTrios2 = setInterval(moveTirosPoder, 50);

    checaTiros3 = setInterval(atirar3, 10);
    checaMoveTrios3 = setInterval(moveTirosPoder3, 50);
    
  
    checarNaveInimigaExtra = setInterval(moveNaveInimigaExtra, 50);
    checaColisaoNaveInimigaExtra = setInterval(colisaoTirosNaveInimigaExtra, 10)
    checaTirosNaveExtra = setInterval(atirarNaveInimigaExtra, 2500); // Atira a cada 2,5s
    checaColisaoTirosNaveExtra = setInterval(colisaoTirosNaveExtra, 10);
    checaMoveTirosNaveExtra = setInterval(moveTirosNaveExtra, 100);
    
    checaPegarPoder = setInterval(naveUsuarioPegaPoder, 10);
    checaMovePoderUsuario = setInterval(movePoderUsuario, 50);

    botaoIniciar.classList.add('hidden');
    botaoInstrucao.classList.add('hidden'); // Oculta #btn-instrucao
    menu.classList.remove('hidden');
    
    botaoIniciar.addEventListener('click', iniciarJogo);
    botaoPausar.addEventListener('click', pausarJogo);
    botaoRetornar.addEventListener('click', retornarJogo);
    botaoAtualizar.addEventListener('click', atualizarJogo); 
    botaoInstrucao.addEventListener('click', instrucao);
    botaoVoltar.addEventListener('click', btnVoltar);
    txtInstrucao.addEventListener('click', instrucao);
    
    
}