# Plate POS System

## Sobre o Projeto

O **Plate** é um sistema de Ponto de Venda (_Point of Sale_ - POS), desenvolvido com **ReactJS** e utilizando **Vite** como ferramenta de build. Seu objetivo é fornecer uma plataforma completa e moderna para a gestão de restaurantes e estabelecimentos similares, facilitando o gerenciamento de produtos, pedidos, perfis de funcionários e muito mais.

A plataforma será lançada inicialmente com um conjunto básico de funcionalidades, com um **roadmap contínuo de evolução e novos recursos**.

---

## ✅ Pré-requisitos

Antes de iniciar, você precisa ter instalado em sua máquina:

- [Node.js (versão 18.x ou superior)](https://nodejs.org/)
- [Git](https://git-scm.com/) para clonar o repositório
- Um gerenciador de pacotes como **npm** ou **yarn** (o projeto usa `npm`)

Verifique se o Node está instalado corretamente:

```bash
node -v
npm -v
```

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/alexandre-niess/Plate_POS_System.git
   ```

2. **Instale as dependências do projeto:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. Acesse em seu navegador:
   ```
   http://localhost:3000
   ```

> 💡 O Vite irá fazer _hot reload_ automaticamente conforme você altera os arquivos do projeto.

---

## ✨ Funcionalidades

- Cadastro e edição de restaurantes
- Cadastro e edição de produtos
- Gerenciamento de perfis de funcionários
- Login e autenticação
- Interface responsiva para dispositivos móveis

---

## 📁 Estrutura de Pastas

```
├── .gitignore
├── README.md
├── components/
│   ├── CardAdmin.jsx
│   ├── CardProduto.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Icons.jsx
│   ├── IsOpen.jsx
│   ├── Loading.jsx
│   └── TabelaProdutos.jsx
├── public/
│   ├── hamburguer.png
│   ├── mockup_plate.png
│   ├── suco.png
│   └── xburguer.png
├── screens/
│   ├── CadAdmin.jsx
│   ├── CadPrato.jsx
│   ├── CadRestaurante/
│   │   ├── CadRestaurante.jsx
│   │   ├── Step1.jsx
│   │   ├── Step2.jsx
│   │   ├── Step3.jsx
│   │   └── Step4.jsx
│   ├── Carrinho.jsx
│   ├── EditPrato.jsx
│   ├── Login.jsx
│   ├── PerfilEmp.jsx
│   ├── Produto.jsx
│   ├── Restaurant.jsx
│   └── admin/
│       ├── MainController.jsx
│       ├── SidebarMenu.jsx
│       └── screens/
│           ├── Cardapio.jsx
│           ├── Construction.jsx
│           ├── Restaurante.jsx
│           └── dadosmockados.js
├── src/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🔧 Descrição de Arquivos

- **components/**: Componentes reutilizáveis da interface (cards, headers, ícones, etc.).
- **screens/**: Telas completas e principais fluxos da aplicação.
- **admin/screens/**: Seção de telas administrativas, como `Cardapio` e `Restaurante`.
- **public/**: Arquivos estáticos e imagens.
- **src/**: Ponto de entrada da aplicação (`main.jsx`).

---

## 🗺️ Roadmap

### Versão 1.0 (Atual)

- Cadastro de restaurantes e pratos
- Gerenciamento básico via painel administrativo

### Futuras Versões

- Integração com gateways de pagamento
- Dashboard de relatórios e métricas financeiras
- Suporte a múltiplos estabelecimentos
- Módulo de fidelidade e cupons
- Chat de atendimento ao cliente

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto
2. Crie uma branch com sua feature ou correção:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "feat: nova funcionalidade"
   ```
4. Suba a branch:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um **Pull Request**

---

## 📬 Contato

Em caso de dúvidas, sugestões ou bugs, entre em contato:

**Autor:** [Alexandre Niess](https://portfolio-alexandre-niess.web.app/)

---

> 💡 Este projeto está em desenvolvimento ativo. Fique à vontade para contribuir ou acompanhar as atualizações!

```

```
