import { useState, useEffect } from "react";
import "./App.css";

const UNIDADES = [
  { valor: "KG", label: "Quilo" },
  { valor: "L", label: "Litro" },
  { valor: "UN", label: "Unidade" },
];

function App() {
  const [listaCompras, setListaCompras] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    meta: "",
    estoque_atual: "",
    unidade: "KG",
    data_validade: "",
    consumo_real: 0,
    houve_ruptura: false,
  });

  const buscarLista = () => {
    fetch("http://127.0.0.1:8000/api/lista-compras/")
      .then((response) => response.json())
      .then((data) => setListaCompras(data));
  };

  useEffect(() => {
    buscarLista();
  }, []);

  const handleChange = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    fetch("http://127.0.0.1:8000/api/ingredientes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then(() => {
        buscarLista();
        setMostrarForm(false);
        setForm({
          nome: "",
          meta: "",
          estoque_atual: "",
          unidade: "KG",
          data_validade: "",
          consumo_real: 0,
          houve_ruptura: false,
        });
      })
      .finally(() => setEnviando(false));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/ingredientes/${id}/`, {
      method: "DELETE",
    }).then(() => buscarLista());
  };

  return (
    <div className="pagina">
      <div className="recibo">
        <header className="recibo-topo">
          <h1>Lista de Compras</h1>
          <p className="subtitulo">Reposição de estoque do restaurante</p>
        </header>

        <ul className="lista">
          {listaCompras.length === 0 && (
            <li className="lista-vazia">Nada a comprar no momento.</li>
          )}
          {listaCompras.map((item, index) => (
            <li key={index} className="item">
              <span className="item-qtd">
                {item.quantidade} {item.unidade}
              </span>
              <span className="item-nome">{item.ingrediente}</span>
              <button
                className="botao-remover"
                onClick={() => handleDelete(item.id)}
              >
                remover
              </button>
            </li>
          ))}
        </ul>

        {!mostrarForm && (
          <button className="botao-abrir" onClick={() => setMostrarForm(true)}>
            + Adicionar ingrediente
          </button>
        )}

        {mostrarForm && (
          <form className="formulario" onSubmit={handleSubmit}>
            <div className="campo">
              <label>Nome</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
              />
            </div>

            <div className="campo-linha">
              <div className="campo">
                <label>Meta</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.meta}
                  onChange={(e) => handleChange("meta", e.target.value)}
                  required
                />
              </div>
              <div className="campo">
                <label>Estoque atual</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.estoque_atual}
                  onChange={(e) =>
                    handleChange("estoque_atual", e.target.value)
                  }
                  required
                />
              </div>
              <div className="campo">
                <label>Unidade</label>
                <select
                  value={form.unidade}
                  onChange={(e) => handleChange("unidade", e.target.value)}
                >
                  {UNIDADES.map((u) => (
                    <option key={u.valor} value={u.valor}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="campo">
              <label>Validade</label>
              <input
                type="date"
                value={form.data_validade}
                onChange={(e) => handleChange("data_validade", e.target.value)}
                required
              />
            </div>

            <div className="campo-checkbox">
              <input
                type="checkbox"
                id="ruptura"
                checked={form.houve_ruptura}
                onChange={(e) =>
                  handleChange("houve_ruptura", e.target.checked)
                }
              />
              <label htmlFor="ruptura">
                Houve ruptura de estoque (faltou no meio do mês)
              </label>
            </div>

            {form.houve_ruptura && (
              <div className="campo">
                <label>Consumo real</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.consumo_real}
                  onChange={(e) => handleChange("consumo_real", e.target.value)}
                />
              </div>
            )}

            <div className="formulario-acoes">
              <button
                type="button"
                className="botao-cancelar"
                onClick={() => setMostrarForm(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="botao-salvar"
                disabled={enviando}
              >
                {enviando ? "Salvando..." : "Salvar ingrediente"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
