import { useState, useEffect } from 'react'
import { API_URL } from '../api'

function Home() {
  const [listaCompras, setListaCompras] = useState([])

  const buscarLista = () => {
    fetch(`${API_URL}/api/lista-compras/`)
      .then(response => response.json())
      .then(data => setListaCompras(data))
  }

  useEffect(() => {
    buscarLista()
  }, [])

  const handleDelete = (id) => {
    fetch(`${API_URL}/api/ingredientes/${id}/`, {
      method: 'DELETE',
    }).then(() => buscarLista())
  }

  return (
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
            <span className="item-qtd">{item.quantidade} {item.unidade}</span>
            <span className="item-nome">{item.ingrediente}</span>
            <button className="botao-remover" onClick={() => handleDelete(item.id)}>
              remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home