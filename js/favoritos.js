

const favoritosDiv = document.querySelector('.favoritos')
const resultado = document.querySelector('#resultado')

obtenerFavoritos()

function obtenerFavoritos(){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    if(favoritos.length){

       mostrarResultados(favoritos)

    }else{

        const noFavoritos = document.createElement('h2')
        noFavoritos.textContent = ' No hay Favoritos aun '
        noFavoritos.classList.add( 'fs-9', 'text-center', 'font-bold', 'mt-8' ,'text-rojo' );
        resultado.appendChild(noFavoritos)

    }

    }


    function mostrarResultados(favoritos) {

        resultado.innerHTML = '';
        
        favoritos.forEach(item => {
    
            console.log(item)
    
    
            const { id, Nombre, descripcion,imagen}  = item;
          
            const contenedorResultados = document.createElement('DIV');
            contenedorResultados.classList.add('col-md-4');
    
            const cardResultados = document.createElement('DIV');
            cardResultados.classList.add('card', 'mb-4');
    
            const resultadoImagen = document.createElement('IMG');
            resultadoImagen.classList.add('card-img-top');
            resultadoImagen.alt =`imagen resultado ${Nombre}`;
            resultadoImagen.src  = imagen
    
            const resultadoCardBody = document.createElement('DIV');
            resultadoCardBody.classList.add('card-body');
    
            const resultadoHeading = document.createElement('H3');
            resultadoHeading.classList.add('card-title', 'mb-3');
            resultadoHeading.textContent = Nombre
    
            const resultadoButton = document.createElement('BUTTON');
            resultadoButton.classList.add('btn', 'btn-danger', 'w-100');
            resultadoButton.textContent = `Eliminar`;
          
            resultadoButton.onclick = function() {
                eliminarFavorito(id)
                obtenerFavoritos()

            }
    
    
            resultadoCardBody.appendChild(resultadoHeading);
            resultadoCardBody.appendChild(resultadoButton);
    
            cardResultados.appendChild(resultadoImagen);
            cardResultados.appendChild(resultadoCardBody)
    
            contenedorResultados.appendChild(cardResultados);
    
            resultado.appendChild(contenedorResultados);
        })
    
    }
    
    function eliminarFavorito(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
        favoritosDiv.innerHTML = " "
    }