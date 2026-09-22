import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Adicionar from './pages/Adicionar'
import Editar from './pages/Editar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="pagina">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adicionar" element={<Adicionar />} />
          <Route path="/editar" element={<Editar />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App