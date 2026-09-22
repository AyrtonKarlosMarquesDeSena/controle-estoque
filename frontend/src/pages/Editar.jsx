import { useState, useEffect } from 'react'
import { API_URL } from '../api'

const UNIDADES = [
  { valor: 'KG', label: 'Quilo' },
  { valor: 'L', label: 'Litro' },
  { valor: 'UN', label: 'Unidade' },
]

function Editar() {
  const [ingredientes, setIngredientes] = useState([])
  const [selecionadoId, setSelecionadoId] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [salvo, setSalvo] = useState(false)
  const [form, setForm] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/api/ingredientes/todos/`)
      .then(response => response.json())
      .then(data => setIngredientes(data))
  }, [])

  const handleSelecionar = (id) => {
    setSelecionadoId(id)
    setSalvo(false)
    const encontrado = ingredientes.find(i => String(i.id) === String(id))
    setForm(encontrado ? { ...encontrado } : null)
  }

  const handleChange = (campo, valor) => {
    setForm(prev => ({ ...prev, [campo]: valor }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviando(true)

    fetch(`${API_URL}/api/ingredientes/${selecionadoId}/atualizar/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(response => response.json())
      .then(() => setSalvo(true))
      .finally(() => setEnviando(false))
  }

  return (
    <div className="recibo">
      <header className="recibo-topo">
        <h1>Atualizar Ingrediente</h1>
      </header>

      <div className="campo">
        <label>Escolha o ingrediente</label>
        <select value={selecionadoId} onChange={e => handleSelecionar(e.target.value)}>
          <option value="">Selecione...</option>
          {ingredientes.map(i => (
            <option key={i.id} value={i.id}>{i.nome}</option>
          ))}
        </select>
      </div>

      {form && (
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="campo">
            <label>Nome</label>
            <input
              type="text"
              value={form.nome}
              onChange={e => handleChange('nome', e.target.value)}
              required
            />
          </div>

          <div className="campo-linha">
            <div className="campo">
              <label>Meta</label>
              <input
                type="number" step="0.01"
                value={form.meta}
                onChange={e => handleChange('meta', e.target.value)}
                required
              />
            </div>
            <div className="campo">
              <label>Estoque atual</label>
              <input
                type="number" step="0.01"
                value={form.estoque_atual}
                onChange={e => handleChange('estoque_atual', e.target.value)}
                required
              />
            </div>
            <div className="campo">
              <label>Unidade</label>
              <select
                value={form.unidade}
                onChange={e => handleChange('unidade', e.target.value)}
              >
                {UNIDADES.map(u => (
                  <option key={u.valor} value={u.valor}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="campo">
            <label>Validade</label>
            <input
              type="date"
              value={form.data_validade}
              onChange={e => handleChange('data_validade', e.target.value)}
              required
            />
          </div>

          <div className="campo-checkbox">
            <input
              type="checkbox"
              id="ruptura"
              checked={form.houve_ruptura}
              onChange={e => handleChange('houve_ruptura', e.target.checked)}
            />
            <label htmlFor="ruptura">Houve ruptura de estoque</label>
          </div>

          {form.houve_ruptura && (
            <div className="campo">
              <label>Consumo real</label>
              <input
                type="number" step="0.01"
                value={form.consumo_real}
                onChange={e => handleChange('consumo_real', e.target.value)}
              />
            </div>
          )}

          <div className="formulario-acoes">
            <button type="submit" className="botao-salvar" disabled={enviando}>
              {enviando ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </div>

          {salvo && <p className="mensagem-sucesso">Atualizado com sucesso!</p>}
        </form>
      )}
    </div>
  )
}

export default Editar