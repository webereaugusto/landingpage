const fs = require('fs');
const path = require('path');

// Lista de arquivos importantes para verificar
const filesToCheck = [
    'index.html',
    'dashboard.html',
    'styles.css',
    'dashboard.js',
    'data.json',
    'server.js',
    'vercel.json'
];

console.log('=== Verificação de Arquivos ===');
console.log('Diretório atual:', __dirname);
console.log('---------------------------');

// Verifica cada arquivo
filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`✅ ${file} - Tamanho: ${stats.size} bytes - Último acesso: ${stats.mtime}`);
    } else {
        console.log(`❌ ${file} - Arquivo não encontrado!`);
    }
});

// Lista todos os arquivos na pasta raiz
console.log('\n=== Todos os arquivos na pasta raiz ===');
try {
    const allFiles = fs.readdirSync(__dirname);
    allFiles.forEach(file => {
        const filePath = path.join(__dirname, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            console.log(`📄 ${file} - Tamanho: ${stats.size} bytes`);
        } else if (stats.isDirectory()) {
            console.log(`📁 ${file} - Diretório`);
        }
    });
} catch (error) {
    console.error('Erro ao listar arquivos:', error);
}

// Verificar permissões da pasta
console.log('\n=== Permissões do diretório ===');
try {
    const stats = fs.statSync(__dirname);
    console.log('Permissões:', stats.mode.toString(8));
} catch (error) {
    console.error('Erro ao verificar permissões:', error);
} 