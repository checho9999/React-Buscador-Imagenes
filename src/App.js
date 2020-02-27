import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'

function App() {

  //State para recibir la actualizacion del termino de busqueda desde el Formulario
  const [busqueda, guardarBusqueda] = useState('');

  useEffect(() => {

    const consultarApi = async () => {

      //evitamos la ejecución la primera vez, ya que no hay cambios si busqueda esta vacia
      if (busqueda === '' ) return;

      //para limitar el numero de imagenes por pagina (la API en su especificacion lo permite)
      const imagenesPorPagina = 30;
      //key personal proporcionada por pixabay para acceder a la API 
      const key = '15401620-bd0aa37e5703af82c20ea43d2';
      //armamos el string para llevar a cabo la busqueda en base a los parametros dinamicos
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
    
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      console.log(resultado.hits);

    }

    consultarApi();

  }, [ busqueda ])

  return (

    <div className='container'>
      <div className="jumbotron">

          <p className="lead text-center">Buscador de Imágenes</p>

          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />

      </div>
    </div>
  );

}

export default App;
