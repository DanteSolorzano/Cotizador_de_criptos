import { useState, useEffect } from "react";
import styled from '@emotion/styled';
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

import imagenCripto from './img/imagen-criptos.png'

const Contenedor = styled.div `
max-width: 900px;
margin: 0 auto;
width: 90%;
 @media (min-width: 992px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  colum-gap: 2 rem;
 }`

const Imagen = styled.img `
 max-width: 400px;
 width: 80%;
 margin: 100px auto 0 auto;
 display: block;
`

const Heading = styled.h1`
font-family: 'Lato', sans-serif;
color: #FFF;
text-align: center;
font-weight: 700;
margin-top: 80px; 
margin-bottom: 50px;
font-size: 34px;

&::after {
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
  margin: 10px auto 0 auto;
}

`

function App() {

  const [ monedas, setMonedas ] = useState({})
  const [ resultado, setResultado ] = useState({})
  const [ cargando, setCargando ] = useState(false)

  useEffect(() => {
      if(Object.keys(monedas).length > 0) { //revisaa  que esten llenos los objetos despues de seleccionar las monedas para despues dar la informacion
        
        const cotizarCripto = async () => { //aqui hacemos la consulta con el url de la api en el que da la informacion de los precios entre la moneda y el cripto, y se remplazan con tamplate strings los valores de 'us' y 'bitcoin' que son los generados por la api y se inyectan los seleccionados que previamente extrajimos con sus nombres de 3 letras (MXM, BT, ETH .etc)
        setCargando(true)
        setResultado({})
          const { moneda, criptomoneda } = monedas
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

          const respuesta = await fetch(url)
          const resultado = await respuesta.json() //en estos dos codigos hacemos destructoring y extraccion de los resultados para que se generen los objetos

          setResultado(resultado.DISPLAY[criptomoneda][moneda]) //agregamos el objeto al state con las monedas y las criptos que seleccionamos en la app
            setCargando(false)
        }

        cotizarCripto()

      }
  }, [monedas])

  return (
    <Contenedor>



    <Imagen 
    src={imagenCripto}
    alt="imagenes criptomonedas"
    />
    <div>
    <Heading>Cotiza criptomonedas al instante</Heading>
    
    <Formulario
    setMonedas={setMonedas}
    />

    {cargando && <Spinner />}
    {resultado.PRICE && <Resultado 
    resultado={resultado}
    />}
   
    </div>

    </Contenedor>
  )
}

export default App
