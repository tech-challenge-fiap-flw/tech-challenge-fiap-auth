# tech-challenge-fiap-auth

Função Lambda de autenticação para o FIAP Tech Challenge.

## Configuração

1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Compile: `npm run build`

## Implantação

Este projeto usa GitHub Actions para implantação automática na AWS.

### Segredos Obrigatórios do GitHub

Defina os seguintes segredos nas configurações do seu repositório:

- `AWS_ACCESS_KEY_ID`: Seu Access Key ID da AWS
- `AWS_SECRET_ACCESS_KEY`: Sua Secret Access Key da AWS
- `DB_HOST`: Host do banco de dados
- `DB_USER`: Usuário do banco de dados
- `DB_PASSWORD`: Senha do banco de dados

### Processo de Implantação

Ao fazer push para a branch `main`, o workflow irá:
- Compilar o código TypeScript
- Implantar a função Lambda e o API Gateway usando Terraform

## Desenvolvimento Local

Para testar localmente, certifique-se de que as variáveis de ambiente estejam configuradas.