
# Para executar a aplicação:
yarn serve



# Para executar/parar o Container do PostgreSQL:
docker start 415cc07edf8b
docker stop 415cc07edf8b

# Para utilizar o PostgreSQL:
yarn add pg pg-hstore

# Visualizar as tabelas do PostgreSQL com:
PgAdmin
Postbird

# ========================================================= #
#                    USANDO O SEQUELIZE                     #
# ========================================================= #

# Install do Sequelize e do Client
yarn add sequelize
yarn add sequelize-cli -D

### Criando uma migration com o Sequelize:
yarn sequelize migration:create --name=create-users

### Para executar a migration
yarn sequelize db:migrate

### Para desfazer a ultima migration executada
yarn sequelize db:migrate:undo

### Para desfazer todas as migration executadas
yarn sequelize db:migrate:undo:all

# ========================================================= #
#             INSTALANDO OUTRAS FERRAMENTAS                 #
# ========================================================= #

## Instalando o yup - validador de campos
yarn add yup



