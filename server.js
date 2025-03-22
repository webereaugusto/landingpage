const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const isVercel = process.env.VERCEL === '1';

// Middleware para processar JSON e servir arquivos estáticos
app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.static(__dirname));

// Middleware para logar todas as requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Gerenciamento de arquivos compatível com Vercel
const dataFilePath = path.join(__dirname, 'data.json');

// Verifica se o arquivo data.json existe, se não, cria com valores padrão
function ensureDataFileExists() {
    try {
        if (!fs.existsSync(dataFilePath)) {
            const defaultData = {
                mainTitle: "Bem-vindo à Nossa Landing Page",
                mainDescription: "Esta é uma landing page simples criada para demonstrar HTML e CSS básicos.",
                card1Title: "Nossos Serviços",
                card1Description: "Oferecemos soluções personalizadas para seu negócio.",
                card2Title: "Sobre Nós",
                card2Description: "Experiência e qualidade em todos os projetos.",
                card3Title: "Contato",
                card3Description: "Entre em contato e faça um orçamento."
            };
            fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 4));
            console.log('Arquivo data.json criado com valores padrão');
        }
    } catch (error) {
        console.error('Erro ao verificar/criar arquivo data.json:', error);
        // No ambiente serverless, podemos não conseguir escrever no sistema de arquivos
    }
}

// Rota para obter o conteúdo atual
app.get('/api/content', (req, res) => {
    try {
        // Em ambiente de produção, se não pudermos ler o arquivo, retornamos dados padrão
        if (!fs.existsSync(dataFilePath) && isVercel) {
            const defaultData = {
                mainTitle: "Bem-vindo à Nossa Landing Page",
                mainDescription: "Esta é uma landing page simples criada para demonstrar HTML e CSS básicos.",
                card1Title: "Nossos Serviços",
                card1Description: "Oferecemos soluções personalizadas para seu negócio.",
                card2Title: "Sobre Nós",
                card2Description: "Experiência e qualidade em todos os projetos.",
                card3Title: "Contato",
                card3Description: "Entre em contato e faça um orçamento."
            };
            console.log('Usando dados padrão para ambiente serverless');
            return res.json(defaultData);
        }
        
        const content = fs.readFileSync(dataFilePath, 'utf8');
        console.log('Conteúdo enviado com sucesso');
        res.json(JSON.parse(content));
    } catch (error) {
        console.error('Erro ao ler o conteúdo:', error);
        
        // Dados padrão em caso de erro
        const defaultData = {
            mainTitle: "Bem-vindo à Nossa Landing Page",
            mainDescription: "Esta é uma landing page simples criada para demonstrar HTML e CSS básicos.",
            card1Title: "Nossos Serviços",
            card1Description: "Oferecemos soluções personalizadas para seu negócio.",
            card2Title: "Sobre Nós",
            card2Description: "Experiência e qualidade em todos os projetos.",
            card3Title: "Contato",
            card3Description: "Entre em contato e faça um orçamento."
        };
        res.json(defaultData);
    }
});

// Rota para atualizar o conteúdo
app.post('/api/content', (req, res) => {
    try {
        console.log('Dados recebidos para atualização:', req.body);
        
        // Em ambiente serverless, não podemos escrever no sistema de arquivos
        if (isVercel) {
            console.log('Simulando salvamento em ambiente serverless');
            return res.json({ success: true, message: 'Conteúdo simulado como salvo em ambiente serverless' });
        }
        
        fs.writeFileSync(dataFilePath, JSON.stringify(req.body, null, 4));
        console.log('Conteúdo atualizado com sucesso');
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao salvar o conteúdo:', error);
        res.status(500).json({ error: 'Erro ao salvar o conteúdo', details: error.message });
    }
});

// Rota para testar se o servidor está respondendo
app.get('/api/test', (req, res) => {
    res.json({ message: 'Servidor funcionando corretamente!' });
});

// Garantir que o arquivo data.json existe em ambiente de desenvolvimento
if (!isVercel) {
    ensureDataFileExists();
}

// Se estivermos na Vercel, exportamos a aplicação express
if (isVercel) {
    module.exports = app;
} else {
    // Em ambiente de desenvolvimento, iniciamos o servidor normalmente
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log(`Dashboard disponível em http://localhost:${port}/dashboard.html`);
    });
} 