# 🚗 Ford Advantage — Plataforma de Inteligência Competitiva Automotiva

> Projeto desenvolvido para a disciplina de Mobile Application Development  
> FIAP

---

## 👥 Integrantes do Grupo

| Nome | RM |
|---|---|
| Renato Luiz Cordão | RM 556403 |
| Vitor Victorino Couto | RM 554965 |
| Victoria Moura | RM 555474 |
| Fabricio Bettarello | RM 554638 |
| Enzo Miletta | RM 98677 |

---

## 📱 Sobre o Projeto

O **Ford Advantage** é um aplicativo mobile desenvolvido em **React Native com Expo**, criado com o objetivo de apoiar vendedores Ford e clientes interessados na **Ford Ranger Raptor**.

A ideia surgiu da necessidade de ter uma ferramenta prática e rápida na palma da mão, que ajudasse tanto o vendedor na hora de argumentar no showroom, quanto o cliente a entender melhor as diferenças entre os veículos do mercado.

---

## 🎯 Objetivo

Desenvolver uma plataforma de inteligência competitiva que:

- Compare a Ranger Raptor com seus principais concorrentes de forma visual e objetiva
- Forneça argumentos de venda personalizados por perfil de cliente
- Treine vendedores para contornar objeções comuns
- Ajude clientes a identificar qual veículo combina com seu perfil de uso

---

## 🔧 Tecnologias Utilizadas

- **React Native** — framework principal
- **Expo** — ambiente de desenvolvimento e build
- **TypeScript** — tipagem estática
- **Expo Linear Gradient** — efeitos visuais de gradiente
- **React Navigation** — navegação entre telas
- **Context API** — gerenciamento de estado global

---

## 📂 Estrutura do Projeto

```
ford-advantage/
├── src/
│   ├── screens/          # Telas do app
│   ├── components/       # Componentes reutilizáveis
│   ├── context/          # Contexto global (AppContext)
│   ├── data/             # Dados estáticos (constants, vehicles.json)
│   ├── services/         # Lógica de busca e serviços
│   ├── styles/           # StyleSheets separados por tela
│   └── navigation/       # Configuração de rotas
├── app.json
├── package.json
└── README.md
```

---

## 🚀 Funcionalidades

### Para Clientes (`home-customer`)
- **Comparador Inteligente** — compara a Ranger Raptor com Toyota Hilux, Chevrolet S10, Ram Rampage e Mitsubishi L200
- **Quiz de Perfil** — identifica o perfil do usuário (aventureiro, familiar, racional, etc.) e exibe a compatibilidade com a Raptor
- **Histórico** — registro das comparações e quizzes realizados

### Exclusivo para Vendedores Ford (`home-ford`)
- **BattleCard** — análise estratégica da Raptor frente à concorrência
- **Argumentos por Perfil** — argumentos de venda adaptados ao tipo de cliente
- **Objeções do Cliente** — respostas prontas para as dúvidas e resistências mais comuns
- **Simulador de Venda** — simula cenários reais de atendimento com feedback de chance de conversão
- **Busca Livre** — pesquisa de especificações técnicas dos modelos Ford disponíveis na base

---

## 🗂️ Dados Utilizados

Os dados técnicos dos veículos foram estruturados manualmente com base em especificações oficiais dos fabricantes. Os arquivos principais são:

- `constants.ts` — specs da Raptor, concorrentes, perfis de cliente, objeções e cenários de venda
- `vehicles.json` — dados detalhados das versões Ford (Raptor, XLT, Limited, Limited+)

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado (`npm install -g expo-cli`)
- App **Expo Go** no celular (ou emulador configurado)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/VicxMouraM/ford-advantage

# 2. Entre na pasta do projeto
cd ford-advantage

# 3. Instale as dependências
npm install

# 4. Rode o projeto
npx expo start
```

Escaneie o QR Code com o **Expo Go** no seu celular e pronto! 🎉

---

## 🔐 Acesso ao App

O app possui dois tipos de login (modo demo, sem autenticação real):

- **Entrar como Ford** → acesso completo, incluindo ferramentas exclusivas para vendedores
- **Entrar como Cliente** → acesso ao comparador e quiz de perfil

---

## 📸 Telas do App

| Tela | Descrição |
|---|---|
| Splash | Animação de abertura com logo Ford |
| Login | Seleção de perfil (Ford ou Cliente) |
| Home Ford | Menu completo para vendedores |
| Home Cliente | Atalhos para comparador e quiz |
| Comparador | Seleção de concorrente e atributos para comparar |
| Resultado | Exibição visual das vantagens Ford |
| BattleCard | Resumo estratégico da Raptor |
| Argumentos | Argumentos de venda por perfil |
| Objeções | Como responder cada objeção do cliente |
| Simulador | Simulação de cenário de venda |
| Quiz | Questionário de perfil para clientes |
| Busca Livre | Pesquisa de versões Ford na base de dados |
| Histórico | Log das ações realizadas no app |

---

## 💡 Decisões de Projeto

- Optamos por usar **Context API** em vez de Redux pela simplicidade do projeto, já que o estado é relativamente simples e centralizado
- Os dados foram **hardcoded** (sem backend) para garantir funcionamento offline — futuramente poderíamos integrar com uma API da Ford
- A separação de **StyleSheets por arquivo** foi escolhida para manter o código organizado, já que o projeto cresceu bastante em número de telas
- O sistema de **navegação customizado** (screen map no AppContext) foi usado para evitar complexidade extra com navigation props passando entre muitas telas

---

## 🧠 Aprendizados

Durante o desenvolvimento desse projeto aprendemos na prática:

- Estruturar um app React Native com TypeScript do zero
- Gerenciar estado global com Context API
- Criar componentes reutilizáveis e organizados
- Trabalhar com LinearGradient para UI mais elaborada
- Separar responsabilidades entre dados, serviços e apresentação
- Simular fluxos reais de aplicativo (login, navegação, histórico)

---

## 📎 Repositório

🔗 [https://github.com/VicxMouraM/ford-advantage](https://github.com/VicxMouraM/ford-advantage)

---
