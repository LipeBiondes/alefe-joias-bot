# alefe-joias-bot

## Sobre o Projeto

O `alefe-joias-bot` é um sistema que utiliza a biblioteca Baileys para se conectar ao WhatsApp e responder mensagens automaticamente. Este projeto foi desenvolvido para a empresa Alefe Joias, com o objetivo de facilitar a comunicação com os clientes.

## Bibliotecas Utilizadas

- **axios**: Biblioteca para fazer requisições HTTP.
- **baileys**: Biblioteca para conectar ao WhatsApp Web.
- **hercai**: Biblioteca para manipulação de dados.
- **pino**: Biblioteca de logging.
- **readline**: Biblioteca para leitura de dados de entrada.

## Comandos do package.json

- `start`: Inicia o bot.
- `lint:prettier:check`: Verifica a formatação do código com Prettier.
- `lint:prettier:fix`: Corrige a formatação do código com Prettier.
- `lint:eslint:check`: Verifica o código com ESLint.
- `prepare`: Configura o Husky.
- `commit`: Utiliza o Commitizen para padronizar as mensagens de commit.

## Comandos Disponíveis para o Usuário

- **1. Preço da grama do ouro**: Informa o preço atual da grama do ouro.
- **2. Ver seus pedidos pendentes**: Exibe os pedidos pendentes do usuário.

## Como Contribuir

1. Faça um fork do projeto.
2. Crie uma nova branch com a sua feature: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Minha nova feature'`.
4. Faça um push para a branch: `git push origin minha-feature`.
5. Abra um Pull Request.

## Como Usar na Sua Máquina

1. Clone o repositório: `git clone https://github.com/seu-usuario/alefe-joias-bot.git`.
2. Instale as dependências: `npm install`.
3. Configure as variáveis de ambiente.
4. Inicie o bot: `npm start`.

## Mudanças no Repositório

Decidimos remover a API deste repositório e criar um repositório separado para a API, a fim de facilitar o desenvolvimento e a manutenção do projeto.
