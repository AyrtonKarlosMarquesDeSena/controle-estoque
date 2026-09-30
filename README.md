# 📦 Controle de Estoque

Sistema de controle e reposição de estoque desenvolvido para um restaurante como parte de um **desafio técnico de processo seletivo**.

A aplicação possui um backend desenvolvido com **Django e Django REST Framework** e um frontend desenvolvido com **React + Vite**. O sistema calcula automaticamente os itens que precisam ser comprados considerando o estoque atual, a meta de estoque, validade dos ingredientes e situações de ruptura.

## 🚀 Demonstração

* 🌐 **Frontend:** https://controle-estoque-ayrton.netlify.app/
* 🔗 **API:** https://controle-estoque-ei07.onrender.com/api/lista-compras/
* 💻 **Código-fonte:** https://github.com/AyrtonKarlosMarquesDeSena/controle-estoque

> O backend está hospedado no plano gratuito do Render. Por isso, após um período sem utilização, o serviço pode entrar em modo de espera e a primeira requisição pode levar alguns segundos para responder.

---

## 🎯 Objetivo do projeto

O objetivo foi desenvolver uma solução capaz de auxiliar no controle de estoque de um restaurante, automatizando a geração da **lista de compras** a partir de regras de negócio previamente definidas.

A aplicação busca reduzir a necessidade de cálculos manuais e tornar o processo de reposição mais previsível.

---

## ⚙️ Regras de negócio

O cálculo da quantidade a ser comprada considera diferentes situações:

### 1. Caso normal

Quando o ingrediente está dentro da validade e não houve ruptura:

```text
quantidade a comprar = meta - estoque atual
```

### 2. Ingrediente vencido

Quando um ingrediente está vencido, o estoque restante é considerado indisponível e uma nova quantidade equivalente à meta deve ser comprada:

```text
quantidade a comprar = meta
```

### 3. Ruptura de estoque

Quando o ingrediente acaba antes do final do período previsto, a nova compra é baseada no consumo real acrescido de uma margem de 20%:

```text
quantidade a comprar = consumo real × 1,2
```

### 4. Quantidade igual ou menor que zero

Itens que não precisam de reposição não são incluídos na lista de compras.

---

## 🏗️ Arquitetura

O projeto foi dividido em duas partes principais:

```text
                    ┌─────────────────┐
                    │     React       │
                    │    + Vite       │
                    └────────┬────────┘
                             │
                             │ HTTP / API
                             ▼
                    ┌─────────────────┐
                    │     Django      │
                    │ Django REST API │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     SQLite      │
                    └─────────────────┘
```

### Backend

Responsável por:

* Modelagem dos dados;
* Regras de negócio;
* Cálculo da lista de compras;
* Disponibilização da API;
* Comandos personalizados para gerenciamento dos dados.

### Frontend

Responsável por:

* Interface do usuário;
* Consumo da API;
* Exibição dos ingredientes;
* Apresentação da lista de compras.

---

## 🛠️ Tecnologias utilizadas

### Backend

* Python
* Django
* Django REST Framework
* SQLite

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Deploy

* Render — Backend/API
* Netlify — Frontend

---

## 📂 Estrutura do projeto

```text
controle-estoque/
│
├── estoque/
│   └── Configurações principais do Django
│
├── estoque_app/
│   └── Aplicação responsável pela lógica do estoque
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── manage.py
├── requirements.txt
├── build.sh
├── .gitignore
└── README.md
```

---

# 💻 Como executar o projeto

## Backend

### 1. Clone o repositório

```bash
git clone https://github.com/AyrtonKarlosMarquesDeSena/controle-estoque.git
cd controle-estoque
```

### 2. Crie o ambiente virtual

No Windows:

```bash
python -m venv venv
```

Ative o ambiente:

```bash
venv\Scripts\activate
```

No Linux/macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Execute as migrations

```bash
python manage.py migrate
```

### 5. Popule os dados de exemplo

```bash
python manage.py popular_dados
```

### 6. Gere a lista de compras

```bash
python manage.py gerar_lista_compras
```

### 7. Inicie o servidor

```bash
python manage.py runserver
```

A API estará disponível em:

```text
http://127.0.0.1:8000/api/lista-compras/
```

---

# 🎨 Frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O frontend estará disponível em:

```text
http://localhost:5173/
```

---

## 📌 Principais aprendizados

Durante o desenvolvimento deste projeto, foram trabalhados conceitos como:

* Desenvolvimento de APIs REST;
* Integração entre frontend e backend;
* Desenvolvimento com Django;
* Desenvolvimento de interfaces com React;
* Modelagem e manipulação de dados;
* Implementação de regras de negócio;
* Criação de comandos personalizados no Django;
* Consumo de APIs;
* Deploy de aplicações web;
* Organização de um projeto full stack.

---

## 🔮 Possíveis melhorias

Algumas funcionalidades que podem ser adicionadas futuramente:

* Autenticação de usuários;
* Diferentes níveis de acesso;
* Histórico de movimentações do estoque;
* Dashboard com indicadores;
* Cadastro e edição de ingredientes pela interface;
* Testes automatizados;
* Utilização de PostgreSQL em produção;
* Melhorias de monitoramento e tratamento de erros.

---

## 👨‍💻 Autor

**Ayrton Karlos Marques de Sena**

Desenvolvedor em formação, com experiência acadêmica em Análise e Desenvolvimento de Sistemas e atualmente cursando Ciência da Computação.

🔗 GitHub: https://github.com/AyrtonKarlosMarquesDeSena
🔗 Portfólio: https://ayrtondev.netlify.app/
