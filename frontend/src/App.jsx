import { useState, useEffect } from 'react'

function App() {
  const [listaCompras, setListaCompras] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/lista-compras/')
      .then(response => response.json())
      .then(data => setListaCompras(data))
  }, [])

  return (
    <div>
      <h1>Lista de Compras</h1>
      <ul>
        {listaCompras.map((item, index) => (
          <li key={index}>
            Comprar: {item.quantidade} {item.unidade} de {item.ingrediente}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App