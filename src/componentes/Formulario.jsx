import { useEffect, useState } from "react";

function Formulario({ guardarBitacora, editando }) {
  const [fecha, setFecha] = useState("");
  const [nickname, setNickname] = useState("");
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editando) {
      setFecha(editando.fecha);
      setNickname(editando.nickname);
      setComentario(editando.comentario);
    }
  }, [editando]);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (fecha === "" || nickname.trim() === "" || comentario.trim() === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (nickname.length < 3) {
      setError("El nickname debe tener al menos 3 caracteres.");
      return;
    }

    guardarBitacora({
      fecha,
      nickname,
      comentario,
    });

    setFecha("");
    setNickname("");
    setComentario("");
    setError("");
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      {error && <p className="error">{error}</p>}

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <textarea
        placeholder="Comentario de la visita"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      ></textarea>

      <button type="submit" className="btn">
        {editando ? "Guardar cambios" : "Agregar bitácora"}
      </button>
    </form>
  );
}

export default Formulario;