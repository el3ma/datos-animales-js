import Tipo from "./clases/Tipo.js"
import data from "./data.js"

let animales = [];
let imagenSrc;
let sonido;

document.getElementById("animal").addEventListener("change", async (evento) => {
    try {
        const listaAnimal = evento.target.value;
        const animales = await data.getData();
        const nombreAnimal = await animales.find((animal) => {
            return animal.name === listaAnimal;
        });
        imagenSrc = `${nombreAnimal.imagen}`;
        sonido = `${nombreAnimal.sonido}`;
        const preview = document.getElementById("preview");
        preview.style.backgroundImage = `url(./assets/imgs/${imagenSrc})`;
    } catch (error) {
        console.log(error)
    }
})

document.getElementById("btnRegistrar").addEventListener("click", () => {
    try {
        const nombre = document.getElementById("animal").value;
        const edad = document.getElementById("edad").value;
        const comentario = document.getElementById("comentarios").value;
        if (nombre && edad && comentario) {
            let animal = new Tipo(nombre, edad, comentario, imagenSrc, sonido);
            animales.push(animal);
            console.log(animal);
            cardCreate()
            const form = document.getElementById("formAnimal");
            form.reset();
            const preview = document.getElementById("preview");
            preview.style.backgroundImage = ""
        } else {
            alert("Faltan Datos");
        }
    } catch (error) {
        console.log(error)
    }
})

const cardCreate = () => {
    try {
        const template = document.getElementById("Animales");
        template.innerHTML = "";
        animales.forEach((animal, i) => {
            template.innerHTML += `
            <div class="px-3 pb-2">
            <div class="bg-dark text-white">
              <img
                height="200"
                src="./assets/imgs/${animal.img}" 
                data-bs-toggle="modal"  
                data-bs-target="#exampleModal" 
                onclick="crearModal('${i}')" 
              />
              <div>
                <button onclick="playSound('${animal.sonido}')" class="btn btn-secondary w-100"> <img height="30" src="assets/imgs/audio.svg" /> </button>
              </div>
            </div>
          </div>
            `
        })
    } catch (error) {
        console.log(error);
    }
}

window.playSound = (sonido) => {
    try {
        let musica = new Audio(`./assets/sounds/${sonido}`);
        musica.play();
    } catch (error) {
        console.log(error)
    }
}

window.crearModal = (i) => {
    try {
        const modalBody = document.getElementsByClassName('modal-body')[0];
        const animal = animales[i];
        modalBody.innerHTML = `
        <div class="px-3 pb-2">
        <div class="card w-50 m-auto bg-dark text-white border-0">
          <img
            src="./assets/imgs/${animal.img}"
            class="d-block m-auto w-100"
          />
          <div class="card-body text-center">
            <h6 class="card-text ">${animal.edad}</h6>
            <h6 class="card-text m-0">Comentarios</h6>
            <hr/>
            <p>${animal.comentarios}</p>
          </div>
        </div>
        </div>
        `
    } catch (error) {
        console.log(error)
    }

};

