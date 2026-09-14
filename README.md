# Controle de Estoque - Desafio Técnico

Sistema de reposição de estoque para restaurante, desenvolvido em Django como parte do processo seletivo.

## 🔗 Links do projeto em produção

- **Frontend (React):** https://controle-estoque-ayrton.netlify.app
- **Backend / API (Django):** https://controle-estoque-ei07.onrender.com/api/lista-compras/

> O backend está no plano gratuito do Render e pode "dormir" após um tempo sem uso — a primeira requisição pode demorar até 50 segundos para responder.

## Regras de negócio

- **Caso normal:** compra a diferença entre a meta e o estoque atual (`meta - estoque_atual`).
- **Ingrediente vencido:** o estoque restante é descartado; compra-se a meta cheia novamente.
- **Ruptura de estoque:** quando o ingrediente acaba antes do fim do mês, a meta antiga é descartada. A nova quantidade de compra é baseada no consumo real, acrescido de 20% de margem (`consumo_real * 1.2`).

Itens com quantidade calculada zero ou negativa não entram na lista de compras.

## Backend - Como instalar e rodar localmente

1. Clone o repositório:
```bash
git clone https://github.com/AyrtonKarlosMarquesDeSena/controle-estoque.git
cd controle-estoque
```

2. Crie e ative o ambiente virtual:

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Aplique as migrations:
```bash
python manage.py migrate
```

5. (Opcional) Popule com ingredientes de exemplo:
```bash
python manage.py popular_dados
```

6. Gere a lista de compras pelo terminal:
```bash
python manage.py gerar_lista_compras
```

Ou acesse via API (com o servidor rodando):
```bash
python manage.py runserver
```
```
http://127.0.0.1:8000/api/lista-compras/
```

## Frontend (React) - Como instalar e rodar localmente

O frontend consome a API do backend, então o Django precisa estar rodando ao mesmo tempo (ou edite `frontend/src/App.jsx` para apontar para o backend em produção).

```bash
cd frontend
npm install
npm run dev
```

Acesse:
```
http://localhost:5173/
```

## Tecnologias

- Python / Django / Django REST Framework
- SQLite
- React (Vite)
- Hospedagem: Render (backend) e Netlify (frontend)