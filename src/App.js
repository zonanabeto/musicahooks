import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';

const App = () => {

  const [artist, agregarArtist] = useState('');
  const [letra, agregarLetra] =useState([]);
  const [info, agregarInfo] = useState({});

  const consultarApiLetra = async (busqueda) => {

    const {artista, cancion} = busqueda;
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
    const resultado = await axios(url);
    agregarArtist(artista);
    agregarLetra(resultado.data.lyrics);
  }

  const consultarApiInfo = async () => {
    if(artist){
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
      const resultado = await axios(url);
      agregarInfo(resultado.data.artists[0]); 
    }
  }

  useEffect(
    () => {
      consultarApiInfo();
    },[artist]
  )

  return (
   <Fragment>
     <Formulario consultarApiLetra={consultarApiLetra} />
     <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <Informacion
            info={info}
          />
        </div>
        <div className="col-md-6">
          <Cancion
            letra={letra}
          />
        </div>
      </div>
     </div>
   </Fragment>
  );
};

export default App;