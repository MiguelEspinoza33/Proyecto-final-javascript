
document.getElementById('categorias').addEventListener('change', selecionarCategorias);
const resultado = document.querySelector('#resultado');
let categoria;
const modal = new bootstrap.Modal('#modal', {})

function selecionarCategorias(e){
    categoria = e.target.value;
    const urls =  `https://gateway.marvel.com:443/v1/public/${categoria}?ts=29/10/2024, 01:33:37&apikey=47e4d4138ec55916be7355cb7c2cd088&hash=049cee1075dbaf77c8420330f3091407`;
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

        fetch(urls)
            .then(response => response.json())
            .then(data => {
                    const results = data.data.results;
                    mostrarResultados(results);})
            .catch(error => {
                    console.error('Error fetching data:', error);
                    resultadoDiv.innerHTML = '<p>Error al cargar los datos.</p>';
                });
}              
    


function mostrarResultados(results) {

    resultado.innerHTML = '';
    
    results.forEach(item => {

        console.log(item)


        const { id, title, description, name , thumbnail: { path, extension } }  = item;
        const imageUrl = extension === 'jpg' ? `${path}.${extension}` : null;
        const displayName = item.title || item.name;
       


        const contenedorResultados = document.createElement('DIV');
        contenedorResultados.classList.add('col-md-4');

        const cardResultados = document.createElement('DIV');
        cardResultados.classList.add('card', 'mb-4');

        const resultadoImagen = document.createElement('IMG');
        resultadoImagen.classList.add('card-img-top');
        resultadoImagen.alt =`imagen resultado ${displayName}`;
        resultadoImagen.src  = imageUrl

        const resultadoCardBody = document.createElement('DIV');
        resultadoCardBody.classList.add('card-body');

        const resultadoHeading = document.createElement('H3');
        resultadoHeading.classList.add('card-title', 'mb-3');
        resultadoHeading.textContent = displayName

        const resultadoButton = document.createElement('BUTTON');
        resultadoButton.classList.add('btn', 'btn-danger', 'w-100');
        resultadoButton.textContent = `Mostrar ${categoria}`;
      
        resultadoButton.onclick = function() {
            seleccionarResultado(categoria, id);
        }


        resultadoCardBody.appendChild(resultadoHeading);
        resultadoCardBody.appendChild(resultadoButton);

        cardResultados.appendChild(resultadoImagen);
        cardResultados.appendChild(resultadoCardBody)

        contenedorResultados.appendChild(cardResultados);

        resultado.appendChild(contenedorResultados);
    })

}


function seleccionarResultado(categoria, id){
    
    const url =`http://gateway.marvel.com/v1/public/${categoria}/${id}?ts=29/10/2024, 01:33:37&apikey=47e4d4138ec55916be7355cb7c2cd088&hash=049cee1075dbaf77c8420330f3091407`;
    fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => abrirModal(resultado.data.results[0]))
            
}




function abrirModal(datos) {

    const { id, title, name, description, thumbnail: { path, extension } }  = datos;
    const modalTitle = document.querySelector('.modal .modal-title');
    const modalBody = document.querySelector('.modal .modal-body')
    const imageUrl = extension === 'jpg' ? `${path}.${extension}`: 'imagen proptegida por derechos de Autor';
    const displayName = datos.title || datos.name;
    const resumen = description || 'Sin descripción disponible'
    modalTitle.textContent = displayName
    modalBody.innerHTML = `
    <img class="img-fluid" src="${imageUrl}" alt="receta ${displayName}" />
            <h3 class="my-3">Resumen</h3>
            <p>${resumen}</p>
           
            
    `;
   
    const modalFooter = document.querySelector('.modal-footer');

    modalFooter.innerHTML = "";

    const btnFavorito = document.createElement('button');
    btnFavorito.classList.add('btn', 'btn-danger', 'col')
    btnFavorito.textContent = ComprobarFavorito(id)? 'Eliminar' : 'Guardar'

   

    btnFavorito.onclick = function(){

        if(ComprobarFavorito(id)){
            eliminarFavorito(id);
            btnFavorito.textContent = 'Guardar';
            mostrarNotificacion('Eliminado Correctamente');
            return
        }

        agregarMisfavoritos({
            id : id,
            Nombre :displayName,
            descripcion :  description,
            imagen : imageUrl,
        
        })

         btnFavorito.textContent = 'Eliminar';
         mostrarNotificacion('Agregado Correctamente')
    }


    const btnCerrar = document.createElement('button');
    btnCerrar.classList.add('btn', 'btn-secondary', 'col')
    btnCerrar.textContent = 'Cerrar'
    btnCerrar.onclick = function(){
        modal.hide()
    }


    modalFooter.appendChild(btnFavorito)
    modalFooter.appendChild(btnCerrar)




    modal.show();

}



function agregarMisfavoritos(datos){
       const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
       localStorage.setItem('favoritos', JSON.stringify([...favoritos,datos]))
}


function eliminarFavorito(id){

    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id );
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos))
}
function ComprobarFavorito(id){

    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    return favoritos.some( favoritos => favoritos.id === id);

}


function mostrarNotificacion(mensaje){
    const notificacionDiv = document.querySelector('#toast');
    const notificacionBody = document.querySelector('.toast-body');
    const toast = new bootstrap.Toast(notificacionDiv);
    notificacionBody.textContent = mensaje;

    toast.show()

}








 
    
   


     




                
                
        