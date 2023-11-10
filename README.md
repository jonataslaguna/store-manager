# Store Maneger

API RESTful utilizando a arquitetura em camadas. Essa API é um sistema de gerenciamento de vendas em que é possível criar visualizar, deletar e atualizar produtos e vendas.

## Instalação

> Aviso: Não é necessário entrar no container para rodar os testes e nem para iniciar a aplicação.
>
> - O container `backend` inicia a aplicação automaticamente.
>
>
> - É necessário ter a versão Node 16.14 ou superior instalada localmente.

#

🐳 Iniciando a aplicação no Docker Compose

```bash
# Instale as dependências
npm install

# Inicie os containers do compose `backend` e `db`
# A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento
docker-compose up -d

# É possível ver os logs da aplicação com `docker logs -n 10 -f <nome-do-container>`
docker logs -n 10 -f store_manager
```
#

🖥️ Iniciando a aplicação localmente

> Atenção: Ao rodar localmente, a aplicação deverá receber variáveis de ambiente como exemplificado em [`env.example`](./env.example) para poder se comunicar com o serviço de banco de dados.

```bash
# Instale as dependências
npm install

# Inicie apenas o serviço `db` no compose
docker-compose up -d db

# Inicie a aplicação em modo de desenvolvimento
npm run dev:local
```
##

## Principais Funcionalidades

### Produtos

- **Listar Produtos:**
  - Endpoint: `GET /products`
  - Retorna a lista de todos os produtos cadastrados.

- **Encontrar Produto por ID:**
  - Endpoint: `GET /products/:id`
  - Retorna as informações detalhadas de um produto específico com base no ID fornecido.

- **Cadastrar Novo Produto:**
  - Endpoint: `POST /products`
  - Permite a criação de um novo produto. O corpo da requisição deve conter os dados do produto a ser adicionado, conforme o exemplo abaixo:
    ```json
    {
      "name": "Playstation 5"
    }
    ```

- **Atualizar Produto:**
  - Endpoint: `PUT /products/:id`
  - Permite a atualização das informações de um produto específico com base no ID fornecido. O corpo da requisição deve conter os dados atualizados do produto.

- **Deletar Produto:**
  - Endpoint: `DELETE /products/:id`
  - Remove um produto específico com base no ID fornecido.

### Vendas

- **Listar Vendas:**
  - Endpoint: `GET /sales`
  - Retorna a lista de todas as vendas registradas.

- **Encontrar Venda por ID:**
  - Endpoint: `GET /sales/:id`
  - Retorna as informações detalhadas de uma venda específica com base no ID fornecido.

- **Cadastrar Nova Venda:**
  - Endpoint: `POST /sales`
  - Permite a criação de uma nova venda. O corpo da requisição deve conter um array de objetos, cada um representando um item da venda, conforme o exemplo abaixo:
    ```json
    [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
    ```

- **Deletar Venda:**
  - Endpoint: `DELETE /sales/:id`
  - Remove uma venda específica com base no ID fornecido.

> <strong>Observação:</strong> Na raiz do projeto, você encontrará um arquivo Thunder Client (thunder-collection-store-maneger.json) que pode ser importado no Thunder Client para facilitar as requisições.

## Contribuição

Este projeto está aberto para contribuições. Se você deseja contribuir, siga estas etapas:

1. Faça um fork do projeto
2. Crie uma nova branch (`git checkout -b feature/sua-feature`)
3. Faça commit das alterações (`git commit -m 'Adicione sua feature'`)
4. Faça push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

## Contato

Se você deseja entrar em contato comigo, sinta-se à vontade para enviar um e-mail para [jonataslaguna.js@email.com](mailto:jonataslaguna.js@email.com).

