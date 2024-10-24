class Pista {
    constructor(nombre, duracion) {
        this.nombre = nombre;
        this.duracion = duracion;
    }

    obtenerDuracionFormateada() {
        const horas = Math.floor(this.duracion / 3600);
        const minutos = Math.floor((this.duracion % 3600) / 60);
        const segundos = this.duracion % 60;
        return `${horas}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    }

    esMayorTresMinutos() {
        return this.duracion > 180;
    }
}

class Disco {
    constructor(nombre, autor, portada, codigo, pistas = []) {
        this.nombre = nombre;
        this.autor = autor;
        this.portada = portada;
        this.codigo = codigo;
        this.pistas = pistas;
    }

    agregarPista(pista) {
        this.pistas.push(pista);
    }
}

let discos = [];  
let pistas = [];  

let nombreDisco;
let autorDisco;
let portadaDisco;
let codigoUnico;

function cargar() {
    SolicitarDatosDisco();
    SolicitarDatosPista();

    let disco = new Disco(nombreDisco, autorDisco, portadaDisco, codigoUnico, pistas);

    discos.push(disco);
    alert("Disco cargado con éxito.");
}

function mostrar() {
    const contenedorDiscos = document.getElementById("discos");
    contenedorDiscos.innerHTML = ""; 

    discos.forEach(disco => {
        const divDisco = document.createElement("div");
        divDisco.classList.add("disco");

        divDisco.innerHTML = `
            <h3>${disco.nombre}</h3>
            <p>${disco.autor}</p>
            <img src="${disco.portada}" alt="Portada de ${disco.nombre}" width="100">
            <ul>
                ${disco.pistas.map(pista => `
                    <li style="${pista.esMayorTresMinutos() ? 'color: black;' : ''}">
                        ${pista.nombre} - ${pista.obtenerDuracionFormateada()}
                    </li>
                `).join('')}
            </ul>
            <span class="codigoDisco"><strong>Código:</strong> ${disco.codigo}</span>
        `;

        contenedorDiscos.appendChild(divDisco);
    });
}


function buscarPorCodigo() {
    const codigoBuscado = parseInt(prompt("Ingrese el código del disco que desea buscar:"));
    const discoEncontrado = discos.find(disco => disco.codigo === codigoBuscado);

    if (discoEncontrado) {
        const contenedorDiscos = document.getElementById("discos");
        contenedorDiscos.innerHTML = ""; 

        const divDisco = document.createElement("div");
        divDisco.classList.add("disco");

        divDisco.innerHTML = `
            <h3>${discoEncontrado.nombre}</h3>
            <p> ${discoEncontrado.autor}</p>
            <img src="${discoEncontrado.portada}" alt="Portada de ${discoEncontrado.nombre}" width="100">
            <ul>
                ${discoEncontrado.pistas.map(pista => `
                    <li style="${pista.esMayorTresMinutos() ? 'color: black;' : ''}">
                        ${pista.nombre} - ${pista.obtenerDuracionFormateada()}
                    </li>
                `).join('')}
            </ul>
            <span><strong>Código:</strong> ${discoEncontrado.codigo}</span>
        `;

        contenedorDiscos.appendChild(divDisco);
    } else {
        alert("Disco no encontrado.");
    }
}

/* Solicitar datos */

function SolicitarDatosDisco() {
    do {
        nombreDisco = prompt("Ingrese el nombre del disco:");
  
    } while (validarNombreDisco(nombreDisco));
  
    do {
        autorDisco = prompt("Ingrese el autor o banda:");
  
    } while (validarAutorDisco(autorDisco));
  
    do {
        portadaDisco = prompt("Ingrese el link de una imagen:");
  
    } while (validarPortadaDisco(portadaDisco));

    do {
        codigoUnico = parseInt(prompt("Ingrese un código numérico único (entre 1 y 999) para el disco:"));
    } while (validarcodigoUnico(codigoUnico) || validarCodigoExistente(discos, codigoUnico));
}

function SolicitarDatosPista() {
    pistas = [];  // Reiniciar las pistas al cargar un nuevo disco
    do {
        do {
            nombrePista = prompt("Ingrese el nombre de la pista:");
        } while (validarNombrePista(nombrePista));
    
        do {
            duracionPista = parseInt(prompt("Ingrese la duración de la pista (en segundos, entre 0 y 7200):"));
        } while (ValidarDuracionPista(duracionPista));

        let pista = new Pista(nombrePista, duracionPista);
        pistas.push(pista);
    } while(confirm("¿Desea agregar otra pista?"));
}

/* Validaciones */

function ValidarDuracionPista(duracionPista) {
    if (isNaN(duracionPista) || duracionPista < 0 || duracionPista > 7200) {
        alert("Error: La duración debe ser un número entre 0 y 7200 segundos.");
        return true;
    }
    return false;
}

function validarNombreDisco(nombreDisco) {
    if (!nombreDisco || nombreDisco.trim() === "") {
        alert("Error: El nombre del disco no puede estar vacío.");
        return true;
    }
    return false;
}

function validarNombrePista(nombrePista) {
    if (!nombrePista || nombrePista.trim() === "") {
        alert("Error: El nombre de la pista no puede estar vacío.");
        return true;
    }
    return false;
}

function validarAutorDisco(autorDisco) {
    if (!autorDisco || autorDisco.trim() === "") {
        alert("Error: El nombre del autor o banda no puede estar vacío.");
        return true;
    }
    return false;
}

function validarPortadaDisco(portadaDisco) {
    if (!portadaDisco || !isValidURL(portadaDisco)) {
        alert("Error: El link a la portada no es válido.");
        return true;
    }
    return false;
}

function validarCodigoExistente(discos, codigoUnico) {
    if (discos.some(disco => disco.codigo === codigoUnico)) {
        alert("Error: El código numérico ya existe.");
        return true;
    }
    return false;
}

function validarcodigoUnico(codigoUnico) {
    if (isNaN(codigoUnico) || codigoUnico < 1 || codigoUnico > 999) {
        alert("Error: El código debe ser un número entre 1 y 999.");
        return true;
    }
    return false;
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
