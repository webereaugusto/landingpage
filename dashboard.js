// Carregar conteúdo salvo ao iniciar a página
document.addEventListener('DOMContentLoaded', loadContent);

// Adicionar eventos de teclado para salvar com Ctrl+S
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveContent();
    }
});

async function loadContent() {
    // Mostrar feedback visual de carregamento
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.placeholder = 'Carregando...';
        input.disabled = true;
    });
    
    try {
        // Testar conexão com o servidor
        try {
            const testResponse = await fetch('/api/test');
            if (!testResponse.ok) {
                throw new Error('Servidor não está respondendo corretamente');
            }
        } catch (error) {
            throw new Error('Não foi possível conectar ao servidor. Verifique se o servidor está em execução.');
        }
        
        // Fazer a requisição principal
        const response = await fetch('/api/content');
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const content = await response.json();
        console.log('Dados carregados:', content);
        
        // Carregar conteúdo nos campos
        document.getElementById('mainTitle').value = content.mainTitle;
        document.getElementById('mainDescription').value = content.mainDescription;
        
        document.getElementById('card1Title').value = content.card1Title;
        document.getElementById('card1Description').value = content.card1Description;
        
        document.getElementById('card2Title').value = content.card2Title;
        document.getElementById('card2Description').value = content.card2Description;
        
        document.getElementById('card3Title').value = content.card3Title;
        document.getElementById('card3Description').value = content.card3Description;
    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        alert(`Erro ao carregar o conteúdo: ${error.message}`);
    } finally {
        // Remover estado de carregamento
        inputs.forEach(input => {
            input.placeholder = '';
            input.disabled = false;
        });
    }
}

async function saveContent() {
    // Desabilitar o botão durante o salvamento
    const saveButton = document.querySelector('button');
    saveButton.disabled = true;
    saveButton.textContent = 'Salvando...';
    
    // Coletar dados do formulário
    const content = {
        mainTitle: document.getElementById('mainTitle').value.trim(),
        mainDescription: document.getElementById('mainDescription').value.trim(),
        card1Title: document.getElementById('card1Title').value.trim(),
        card1Description: document.getElementById('card1Description').value.trim(),
        card2Title: document.getElementById('card2Title').value.trim(),
        card2Description: document.getElementById('card2Description').value.trim(),
        card3Title: document.getElementById('card3Title').value.trim(),
        card3Description: document.getElementById('card3Description').value.trim()
    };
    
    // Validar se todos os campos estão preenchidos
    const camposVazios = Object.entries(content)
        .filter(([_, value]) => !value)
        .map(([key, _]) => key);
    
    if (camposVazios.length > 0) {
        alert(`Por favor, preencha todos os campos antes de salvar. Campos vazios: ${camposVazios.join(', ')}`);
        saveButton.disabled = false;
        saveButton.textContent = 'Salvar Alterações';
        return;
    }
    
    try {
        console.log('Enviando dados para o servidor:', content);
        
        // Salvar via API
        const response = await fetch('/api/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content)
        });

        // Verificar resposta
        const responseData = await response.json();
        
        if (response.ok && responseData.success) {
            console.log('Conteúdo salvo com sucesso!');
            
            // Mostrar mensagem de sucesso
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            
            // Ocultar mensagem após 3 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
            
            // Atualizar conteúdo na página principal
            updateMainPage();
        } else {
            throw new Error(responseData.error || 'Erro ao salvar os dados');
        }
    } catch (error) {
        console.error('Erro ao salvar conteúdo:', error);
        alert(`Erro ao salvar as alterações: ${error.message}`);
    } finally {
        // Reabilitar o botão
        saveButton.disabled = false;
        saveButton.textContent = 'Salvar Alterações';
    }
}

function updateMainPage() {
    // Recarregar a página principal se estiver aberta
    try {
        // Tentar atualizar através de mensagens
        const mainPage = window.opener || window.parent;
        if (mainPage && !mainPage.closed) {
            if (mainPage.location.pathname === '/' || mainPage.location.pathname === '/index.html') {
                console.log('Recarregando a página principal');
                mainPage.location.reload();
            }
        }
    } catch (e) {
        console.log('Não foi possível recarregar a página principal automaticamente');
    }
} 