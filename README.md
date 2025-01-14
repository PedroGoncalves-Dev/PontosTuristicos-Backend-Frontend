# TurismoSmart

Uma aplicação full-stack desenvolvida com ASP.NET Core API e React + Vite.

## 💻 Pré-requisitos

* Node.js
* .NET SDK
* Git
* SQL Server
* Visual Studio Code

## 🚀 Instalando o projeto

1. Clone o repositório

git clone https://github.com/PedroGoncalves-Dev/PontosTuristicos-Backend-Frontend


2. Abra duas janelas do VS Code:

code PontosTuristicos-Backend-Frontend/ApiPontosTuristicos
code PontosTuristicos-Backend-Frontend/Frontend-PontoTuristico


## ⚙️ Configurando o Backend (VS Code - Janela 1)

1. *No terminal do VS Code, restaure as dependências:*
- Abra o terminal de comando no VS Code. Você pode fazer isso indo em Terminal > New Terminal ou usando o atalho ` Ctrl + shift + ' ` (aspas simples).
- No terminal, execute o comando abaixo para instalar todas as dependências necessárias:



  *dotnet restore*

  
2. Configure o banco de dados:

* dentro de ApiPontosTuristicos/bancoDeDados/ esta o arquivo banco_teste.bak é so ir no sql servermagement studio e restaurar novo bando de dados...
* Se preferir, também em ApiPontosTuristicos/bancoDeDados/ esta outro arquivo scriptBanco.sql que contem todo o script pra criar um novo banco e as tabelas em sua máquina. basta abrir o sql server management studio ir em nova consulta e colar o script copiado
* Abra o arquivo `appsettings.json`
* Ajuste a ConnectionString para seu SQL Server

3. Inicie a API:

   *dotnet run*

   
A API estará rodando em `http://localhost:5193`

## 🎨 Configurando o Frontend (VS Code - Janela 2)

1. Instale as dependências:
- Abra o terminal de comando no VS Code. Você pode fazer isso indo em Terminal > New Terminal ou usando o atalho ` Ctrl + shift + ' ` (aspas simples).
- No terminal, execute o comando abaixo para instalar todas as dependências necessárias:

   
*npm install*

2. Inicie o projeto:



*npm run dev*


O frontend estará disponível em `http://localhost:5173`

## 📝 Notas importantes

* Mantenha as duas janelas do VS Code abertas durante o desenvolvimento
* A API precisa estar rodando para o frontend funcionar
* Certifique-se que as portas 5192 (API) e 5173 (frontend) estão livres

## 🆘 Solução de problemas comuns

* **Erro de conexão com banco:** Verifique se o SQL Server está rodando e se a string de conexao esta correta
* **Erro de CORS:** Confirme se a API está configurada para aceitar requisições do frontend
* **Erro de dependências:** Delete node_modules e execute npm install novamente

## 🔧 Tecnologias utilizadas

* ASP.NET Core
* React
* Vite
* SQL Server



