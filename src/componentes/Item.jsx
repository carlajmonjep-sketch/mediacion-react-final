function Item({ bitacora, editarBitacora, eliminarBitacora }) {
    return (
      <li className="item">
        <p>
          <strong>Fecha:</strong> {bitacora.fecha}
        </p>
  
        <p>
          <strong>Nickname:</strong> {bitacora.nickname}
        </p>
  
        <p>
          <strong>Comentario:</strong> {bitacora.comentario}
        </p>
  
        <button onClick={() => editarBitacora(bitacora)}>Editar</button>
        <button onClick={() => eliminarBitacora(bitacora.id)}>Eliminar</button>
      </li>
    );
  }
  
  export default Item;