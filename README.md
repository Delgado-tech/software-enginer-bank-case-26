# 🏦 Bank CLI App

Um sistema de simulação bancária interativa via **linha de comando (CLI)**, desenvolvido em **Node.js + TypeScript**.
Permite navegar por menus, consultar extratos e simular operações financeiras usando **dados mockados**.

---

## ✨ Funcionalidades

- 📑 **Consulta de Contas e Extratos**
  - Lista contas existentes (dados mockados)
  - Consulta de extratos por conta

- 💸 **Simulação de Operações Financeiras**
  - Depósitos e saques simulados em contas mockadas
  - Atualização de saldo refletida no momento da simulação

- 🖥️ **Interface via Terminal**
  - Navegação entre menus (`MenuCollectionController`)
  - Formulários de entrada com validação (`inputForm`)
  - Confirmações seguras (`confirmForm`)
  - Destaques coloridos com [chalk](https://www.npmjs.com/package/chalk)
  - Prompts interativos com [inquirer](https://www.npmjs.com/package/inquirer), [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts) e [enquirer](https://www.npmjs.com/package/enquirer)

---

## 🛠️ Tecnologias

- **Node.js**
- **TypeScript**
- **Inquirer / @inquirer/prompts / Enquirer**
- **Chalk**
- **Reflect-metadata**

---

## 📂 Estrutura do Projeto

```
src/
 ├─ controllers/     # Regras de negócio (Accounts, BankStatements, MenuCollectionController...)
 ├─ decorators/      # Decorators para validação e metaprogramação (MinMax, etc.)
 ├─ menus/           # Interfaces e estruturas do CLI (menus, prompts, seleções)
 ├─ mocks/           # Dados simulados para contas, extratos e operações
 ├─ models/          # Modelos de dados (AccountModel, OperationModel, BankStatementModel...)
 ├─ types/           # Definições de tipos TypeScript
 ├─ utils/           # Funções utilitárias e helpers (validações, helpers, etc.)
 ├─ views/           # Visualização no terminal (MenuView, BankStatementView, etc.)
 ├─ constants.ts     # Constantes globais do projeto
 └─ main.ts          # Ponto de entrada do sistema
```

---

## ▶️ Como Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/Delgado-tech/software-enginer-bank-case-26.git
cd software-enginer-bank-case-26
```

### 2. Instalar dependências

```bash
pnpm install
# ou
npm install
```

### 3. Rodar o sistema

```bash
pnpm main
# ou
npm run main
```

### 4. Dev server com hot reload

```bash
pnpm dev-server
```

---

## 📌 Observações

- Todas as contas e extratos são **mockados**.
- Ainda não é possível criar ou remover contas via CLI.
- Operações financeiras simulam alterações de saldo **apenas em memória**.

---

## 👨‍💻 Autor

**Leonardo Delgado** 🧑‍💻
Aberto a contribuições, ideias e melhorias!
