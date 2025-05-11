# 🍕 Pizzaria Matteo

## Sobre o Projeto

O **Pizzaria Matteo** é um e-commerce completo desenvolvido em **ReactJS** com **Vite**, com o objetivo de digitalizar as vendas da pizzaria e oferecer uma experiência moderna e responsiva aos seus clientes. A plataforma permite navegação de produtos, seleção de sabores, carrinho, entrega e pagamento online.

Este projeto foi pensado para atender exclusivamente as operações da Pizzaria Matteo, com uma arquitetura escalável para evoluções futuras.

---

## Usuários de Teste

Para facilitar, já deixamos criados alguns usuários para facilitar testes. Para acessar o painel de admin, basta estar logado na conta de admin e ir para a rota /admin.


Usuário Comum:
```bash
e-mail: cliente@gmail.com
senha: teste1234
```
Usuário Admin
```bash
e-mail: admin@gmail.com
senha: teste1234
```
---

## ✅ Pré-requisitos

Antes de iniciar, você precisa ter instalado em sua máquina:

* [Node.js (versão 18.x ou superior)](https://nodejs.org/)
* [Git](https://git-scm.com/) para clonar o repositório
* Um gerenciador de pacotes como **npm** (utilizado neste projeto)

Verifique se o Node está instalado corretamente:

```bash
node -v
npm -v
```

---

## 🚀 Como Executar o Projeto Localmente

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/alexandre-niess/Trabalho_Engenharia-II.git
   ```

2. **Instale as dependências do projeto:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. Acesse no navegador:

   ```
   http://localhost:5173
   ```

> 💡 O Vite faz hot reload automaticamente conforme você altera os arquivos do projeto.

---

## ✨ Funcionalidades

* Visualização de cardápio com imagens
* Adição ao carrinho com seleção de quantidade e tamanho (para pizzas)
* Cadastro de usuários e login
* Tela de entrega com cálculo de frete via Uber API
* Integração com Stripe para pagamentos
* Painel administrativo para gestão de produtos (pizzas e bebidas)
* Upload de imagens com Firebase
* Responsivo para dispositivos móveis

---

## 📁 Estrutura de Pastas

```
├── components
│   ├── AdminPrivateRoute.jsx
│   ├── CardProduto.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Icons.jsx
│   ├── IsOpen.jsx
│   ├── Loading.jsx
│   ├── PaymentForm.jsx
│   ├── TabelaProdutos.jsx
│   └── UserPrivateRoute.jsx
├── context
│   └── AuthContext.jsx
├── screens
│   ├── Admin.jsx
│   ├── CadAdmin.jsx
│   ├── CadProduto.jsx
│   ├── CadUser.jsx
│   ├── Carrinho.jsx
│   ├── DadosPizzaria.jsx
│   ├── DetalhesProduto.jsx
│   ├── EditProduto.jsx
│   ├── Entrega.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Pagamento.jsx
│   └── Produto.jsx
├── service
│   ├── carrinhoService.js
│   ├── entregaService.js
│   ├── pagamentoService.js
│   ├── produtoService.js
│   └── userService.js
├── src
│   ├── App.jsx
│   └── main.jsx
├── utils
│   ├── buscaCEP.js
│   ├── getAuth.js
│   └── mascaras.js
├── public
│   └── logo.png
├── vite.config.js
└── README.md
```

---

## 🔧 Descrição de Pastas

* **components/**: Componentes reutilizáveis como cabeçalho, formulários, e controles de autenticação.
* **screens/**: Telas principais do usuário e do painel administrativo.
* **service/**: Arquivos responsáveis por comunicação com o backend e Firebase.
* **utils/**: Funções auxiliares (como busca de CEP e autenticação).
* **public/**: Imagens públicas e outros assets estáticos.

---

## 🛣️ Roadmap

### Versão Atual (1.0)

* Navegação e visualização de produtos
* Carrinho com controle de quantidade
* Tela de entrega integrada com Uber API
* Pagamento com Stripe
* Painel de administração completo

### Futuras Melhorias

* Histórico de pedidos
* Notificações por e-mail
* Cupom de desconto
* Avaliações de produtos
* Dashboard com métricas de vendas
