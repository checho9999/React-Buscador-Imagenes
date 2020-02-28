import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  //State para recibir la actualizacion del termino de busqueda desde el Formulario
  const [busqueda, guardarBusqueda] = useState('');
  //State para recibir la actualizacion de las imagenes de respuesta de la API
  const [ imagenes, guardarImagenes] = useState([]);
  //State para determinar la pagina actual
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  //State para determinar el numero total de paginas (en esta API debemos tener en cuenta el "totalHits")
  const [ totalpaginas, guardarTotalPaginas] = useState(5);

  useEffect(() => {

    const consultarApi = async () => {

      //evitamos la ejecución la primera vez, ya que no hay cambios si busqueda esta vacia
      if (busqueda === '') return;

      //para limitar el numero de imagenes por pagina (la API en su especificacion lo permite)
      const imagenesPorPagina = 30;
      //key personal proporcionada por pixabay para acceder a la API 
      const key = '15401620-bd0aa37e5703af82c20ea43d2';
      //armamos el string para llevar a cabo la busqueda en base a los parametros dinamicos
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
    
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      //console.log(resultado.hits);
      //pongo en el state las imagenes que recibo desde la API
      guardarImagenes(resultado.hits);

      //Calculo el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
      guardarTotalPaginas(calcularTotalPaginas);

      //Se mueve el foco de la pantalla hacia arriba automaticamente cada vez que se cambia de pagina
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView( { behavior: 'smooth' } )

    }

    consultarApi();

  }, [ busqueda, paginaactual ])

  //determinamos la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
  
    if (nuevaPaginaActual === 0) return;
  
    guardarPaginaActual(nuevaPaginaActual);
  }
  
  //determinamos la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
  
    if (nuevaPaginaActual > totalpaginas ) return;
  
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (

    <div className='container'>
      <div className="jumbotron">

          <p className="lead text-center">Buscador de Imágenes</p>

          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />

      </div>

      <div className="row justify-content-center">

          <ListadoImagenes 
            imagenes={imagenes}
          />

          { (paginaactual === 1) ? null : (
            <button 
                type="button"
                className="bbtn btn-info mr-1"
                onClick={paginaAnterior}
            >&laquo; Anterior </button>
          ) }

          { (paginaactual === totalpaginas) ? null : (
            <button 
              type="button"
              className="bbtn btn-info"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
          ) }

      </div>



    </div>
  );

}

export default App;
