# Gerenciador de Landing Page Simples

Um sistema simples para gerenciar o conteúdo de uma landing page sem usar banco de dados.

## Requisitos

- Node.js (versão 14 ou superior)
- NPM (normalmente instalado com o Node.js)

## Instalação

1. Clone ou baixe este repositório
2. Abra um terminal na pasta do projeto
3. Execute o comando para instalar as dependências:

```bash
npm install
```

## Como Usar

1. Inicie o servidor com o comando:

```bash
npm start
```

Para desenvolvimento com reload automático:

```bash
npm run dev
```

2. O servidor será iniciado na porta 3000 (ou na porta definida pela variável de ambiente PORT).
3. Acesse no navegador:
   - Landing Page: http://localhost:3000
   - Dashboard para editar conteúdo: http://localhost:3000/dashboard.html

## Deploy no GitHub e Vercel

### GitHub

1. Crie um repositório no GitHub
2. Inicialize um repositório git local e adicione o remote:

```bash
git init
git add .
git commit -m "Versão inicial"
git branch -M main
git remote add origin https://github.com/seu-usuario/landing-page-manager.git
git push -u origin main
```

### Vercel

1. Crie uma conta na [Vercel](https://vercel.com) se ainda não tiver uma
2. Conecte sua conta do GitHub na Vercel
3. Importe o repositório na Vercel
4. Configure as variáveis de ambiente (se necessário):
   - `VERCEL=1` (Para identificar que está rodando na Vercel)
5. Clique em "Deploy"

Após o deploy, você terá URLs para:
- Landing Page: https://seu-projeto.vercel.app
- Dashboard: https://seu-projeto.vercel.app/dashboard.html

## Limitações na Vercel

Por estar rodando em um ambiente serverless, a versão deployada na Vercel tem algumas limitações:

- Não é possível salvar permanentemente as alterações feitas no dashboard
- Os textos voltam ao padrão quando o servidor reinicia
- Para uma versão com persistência completa, considere usar um banco de dados como MongoDB Atlas ou Firebase

## Funcionalidades

- **Landing Page**: exibe o conteúdo gerenciado
- **Dashboard**: permite editar todos os textos da landing page
- **Persistência**: os dados são salvos em um arquivo JSON no servidor (em ambiente local)

## Solução de Problemas

Se encontrar problemas ao usar o sistema:

1. Verifique se o servidor está rodando
2. Tente recarregar a página no navegador
3. Verifique o console do navegador (F12) para ver possíveis erros
4. Verifique o terminal onde o servidor está rodando para ver mensagens de erro

## Estrutura de Arquivos

- `index.html`: Página principal (landing page)
- `dashboard.html`: Interface de administração
- `styles.css`: Estilos da landing page
- `dashboard.js`: Lógica do dashboard de administração
- `server.js`: Servidor Node.js
- `data.json`: Arquivo onde os dados são armazenados (ambiente local)
- `package.json`: Configuração do projeto e dependências
- `vercel.json`: Configuração para deploy na Vercel

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes. 