import Item from "./Item";

function Lista({ bitacoras, editarBitacora, eliminarBitacora }) {
  return (
    <div>
      <h3>Registros guardados</h3>

      {bitacoras.length === 0 ? (
        <p>No hay bitácoras registradas.</p>
      ) : (
        <ul className="lista">
          {bitacoras.map((bitacora) => (
            <Item
              key={bitacora.id}
              bitacora={bitacora}
              editarBitacora={editarBitacora}
              eliminarBitacora={eliminarBitacora}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Lista;