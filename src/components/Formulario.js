import React, { useState } from 'react';
import Error from './Error'
import PropTypes from 'prop-types';

const Formulario = ( { guardarBusqueda } ) => {

    //State para obtener el termino de busqueda ingresado por el usuario
    const [termino, guardarTermino] = useState('');
    //State para determinar si el termino de busqueda pasa la validacion
    const [error, guardarError] = useState(false);

    const buscarImagenes = e => {
        //para que no se envie el query string en la parte superior, ni se recarge la pagina
        e.preventDefault();

        //validamos el termino ingresado por el usuario
        if (termino.trim() === '') {    
            //ponemos el error en el state de la app principal
            guardarError(true);

            return;
        }

        //ponemos el error en el state de la app principal
        guardarError(false);

        //ponemos el termino en el state de la app principal
        guardarBusqueda(termino);

    }

    return ( 

        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange={ e => guardarTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

            { error ? <Error mensaje="Agrega un término de búsqueda" /> : null }

        </form>
     );
}

Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired
}

export default Formulario;