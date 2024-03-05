

# Para executar o projeto:
yarn start

## Instala o sucrase (permite usar o import no NodeJS)
yarn add --dev sucrase nodemon
npm install --save-dev sucrase node-mon

## Para usar com o sucrase:
node -r sucrase/register ./src/server.js