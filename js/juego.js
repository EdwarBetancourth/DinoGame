/*Seccion de variables globales*/
var ancho = 700;
var alto = 300;
var canvas;
var contexto;
var posSuelo = 200;

/*Seccion de variables de imagenes*/

var imgDino;
var imgNube;
var imgTubo;
var imgSuelo;

/*seccion para propiedades de animaciones*/
var nivel = {
    velocidad: 10,
    puntos: 0,
    muerto: false
};

var nube = {
    x: 400,
    y: 50
};

var tubo = {
    x: ancho + 100,
    y: posSuelo
};

var suelo = {
    x: 0,
    y: posSuelo + 48
}

var dino = {
    y: posSuelo, //Ubicacion del D en Y
    vy: 0, //velocidad a la que se mueve cuando esta saltando
    gravedad: 10,
    salto: 58,
    vymax: 0,
    saltando: false
};

function inicializar() {
    canvas = document.getElementById('canvas');
    contexto = canvas.getContext('2d');
    cargarImagenes();
}

function principal() {
    borrarCanvas();
    colision();
    movimientoSuelo();
    dibujarSuelo();
    movimientoNube();
    dibujarNube();
    movimientoTubo();
    dibujarTubo();
    movimientoDino();
    dibujarDino();
    dibujarPuntos();
}

function cargarImagenes() {
    imgDino = new Image();
    imgNube = new Image();
    imgTubo = new Image();
    imgSuelo = new Image();

    imgDino.src = './img/dino.png';
    imgNube.src = './img/nube.png';
    imgTubo.src = './img/tubo.png';
    imgSuelo.src = './img/suelo.png';
}

function borrarCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}

document.addEventListener('keydown', function (evento) {
    if (evento.keyCode == 32) {
        if (!nivel.muerto) {
            if (!dino.saltando) {
                saltar();
            }
        }
    }
});

setInterval(
    function () {
        principal();
    },
    1000 / 10
);

/*metodos de dibujado de imagenes*/
function dibujarNube() {
    contexto.drawImage(imgNube, 0, 0, 80, 53, nube.x, nube.y, 80, 53);
}

function dibujarTubo() {
    contexto.drawImage(imgTubo, 0, 0, 63, 75, tubo.x, tubo.y, 50, 50);
}

function dibujarDino() {
    contexto.drawImage(imgDino, 0, 0, 78, 69, 100, dino.y, 50, 50);
}

function dibujarSuelo() {
    contexto.drawImage(imgSuelo, suelo.x, 0, 700, 58, 0, suelo.y, 700, 58);
}

function dibujarPuntos() {
    contexto.font = "30px impact";
    contexto.fillStyle = "#555555";
    contexto.fillText(nivel.puntos, 640, 40);
}


/*seccion de movimiento de imagenes*/
function movimientoNube() {
    if (nube.x < -100) {
        nube.x = ancho + 100;
    } else {
        nube.x = nube.x - 2;
    }
}

function movimientoTubo() {
    if (tubo.x < -100) {
        tubo.x = ancho + 100;
    } else {
        tubo.x = tubo.x - nivel.velocidad;
    }
}

function movimientoSuelo() {
    if (suelo.x > ancho) {
        suelo.x = 0;
    } else {
        suelo.x += nivel.velocidad;
    }
}

function movimientoDino() {
    if (dino.saltando) {
        dino.vy -= dino.gravedad;
        dino.y -= dino.vy;

        if (dino.y > posSuelo) {
            dino.saltando = false;
            dino.vy = 0;
            dino.y = posSuelo;
        }

    }
}

//seccion de logica del juego
function saltar() {
    dino.saltando = true;
    dino.vy = dino.salto;
}

function colision() {
    if (tubo.x >= 100 & tubo.x <= 150) {
        if (dino.y >= (posSuelo - 25)) {
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
    if (!nivel.muerto) {
        nivel.puntos++;
        if (nivel.puntos == (nivel.velocidad * 10)) {
            nivel.velocidad++;
        }

    }
}
