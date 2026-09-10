# Controle de Estoque - Desafio Técnico

Sistema de reposição de estoque para restaurante, desenvolvido em Django como parte do processo seletivo.

## Regras de negócio

- **Caso normal:** compra a diferença entre a meta e o estoque atual (`meta - estoque_atual`).
- **Ingrediente vencido:** o estoque restante é descartado; compra-se a meta cheia novamente.
- **Ruptura de estoque:** quando o ingrediente acaba antes do fim do mês, a meta antiga é descartada. A nova quantidade de compra é baseada no consumo real, acrescido de 20% de margem (`consumo_real * 1.2`).

Itens com quantidade calculada zero ou negativa não entram na lista de compras.

## Backend - Como instalar e rodar

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

5. (Opcional) Crie ingredientes de teste pelo shell do Django:
```bash
python manage.py shell
```
```python
from estoque_app.models import Ingrediente
from datetime import date

Ingrediente.objects.create(
    nome="Farinha", meta=20, estoque_atual=8, unidade="KG",
    data_validade=date(2027, 1, 1), consumo_real=12, houve_ruptura=False
)
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

## Frontend (React) - Como instalar e rodar

O frontend consome a API do backend, então o Django precisa estar rodando (`python manage.py runserver`) ao mesmo tempo.

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse:
```
http://localhost:5173/
```

## Tecnologias

- Python / Django / Django REST Framework
- SQLite
- React (Vite)