import { useEffect, useState } from "react";
import axios from "axios";
import Formulario from "./componentes/Formulario";
import Lista from "./componentes/Lista";

function App() {
  const [clima, setClima] = useState(null);
  const [indicadores, setIndicadores] = useState(null);

  const [bitacoras, setBitacoras] = useState(() => {
    const datosGuardados = localStorage.getItem("bitacoras");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  const [editando, setEditando] = useState(null);

  useEffect(() => {
    obtenerClima();
    obtenerIndicadores();
  }, []);

  useEffect(() => {
    localStorage.setItem("bitacoras", JSON.stringify(bitacoras));
  }, [bitacoras]);

  const obtenerClima = async () => {
    try {
      const respuesta = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-20.2208&longitude=-70.1431&current_weather=true"
      );

      const datos = await respuesta.json();
      setClima(datos.current_weather);
    } catch (error) {
      console.log("Error al obtener clima", error);
    }
  };

  const obtenerIndicadores = async () => {
    try {
      const respuesta = await axios.get("https://mindicador.cl/api");
      setIndicadores(respuesta.data);
    } catch (error) {
      console.log("Error al obtener indicadores", error);
    }
  };

  const guardarBitacora = (bitacora) => {
    if (editando) {
      const listaActualizada = bitacoras.map((item) =>
        item.id === editando.id ? { ...bitacora, id: editando.id } : item
      );

      setBitacoras(listaActualizada);
      setEditando(null);
    } else {
      const nuevaBitacora = {
        ...bitacora,
        id: Date.now(),
      };

      setBitacoras([...bitacoras, nuevaBitacora]);
    }
  };

  const eliminarBitacora = (id) => {
    const confirmar = confirm("¿Deseas eliminar esta bitácora?");

    if (confirmar) {
      setBitacoras(bitacoras.filter((item) => item.id !== id));
    }
  };

  const editarBitacora = (bitacora) => {
    setEditando(bitacora);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Mediación Familiar Tarapacá</h1>
          <p>Aplicación web con React, Vite, Fetch, Axios y LocalStorage</p>
        </div>
      </header>

      <main className="container">
        <section className="card">
          <h2>Clima actual en Iquique</h2>

          {clima ? (
            <div>
              <p>Temperatura: {clima.temperature} °C</p>
              <p>Viento: {clima.windspeed} km/h</p>
            </div>
          ) : (
            <p>Cargando clima...</p>
          )}
        </section>

        <section className="card">
          <h2>Indicadores económicos de Chile</h2>

          {indicadores ? (
            <div className="indicadores">
              <p>UF: ${indicadores.uf.valor}</p>
              <p>UTM: ${indicadores.utm.valor}</p>
              <p>Dólar: ${indicadores.dolar.valor}</p>
              <p>Euro: ${indicadores.euro.valor}</p>
            </div>
          ) : (
            <p>Cargando indicadores...</p>
          )}
        </section>

        <section className="card">
          <h2>Bitácora de visitas</h2>

          <Formulario guardarBitacora={guardarBitacora} editando={editando} />

          <Lista
            bitacoras={bitacoras}
            editarBitacora={editarBitacora}
            eliminarBitacora={eliminarBitacora}
          />
        </section>
      </main>

      <footer className="footer">
        <p>Proyecto React - Mediación Familiar Tarapacá</p>
      </footer>
    </>
  );
}

export default App;
