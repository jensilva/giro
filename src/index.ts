import { User, showAlert } from './utils.js';

class BootstrapApp {
    private mainButton: HTMLButtonElement;
    private alertContainer: HTMLDivElement;

    constructor() {
        this.mainButton = document.getElementById('mainBtn') as HTMLButtonElement;
        this.alertContainer = document.getElementById('alertContainer') as HTMLDivElement;

        this.init();
    }

    private init(): void {
        this.mainButton.addEventListener('click', () => this.handleButtonClick());

        // Exemplo de modal (se quiser usar programaticamente)
        this.showWelcomeModal();
    }

    private handleButtonClick(): void {
        const user: User = {
            name: 'João Silva',
            age: 30,
            email: 'joao@email.com'
        };

        // Mostrar alerta do Bootstrap
        showAlert(`Olá, ${user.name}!`, 'success', this.alertContainer);

        // Mudar aparência do botão
        this.mainButton.textContent = 'Clicado!';
        this.mainButton.classList.remove('btn-light');
        this.mainButton.classList.add('btn-success');

        // Disable button temporarily
        this.mainButton.disabled = true;
        setTimeout(() => {
            this.mainButton.disabled = false;
            this.mainButton.classList.remove('btn-success');
            this.mainButton.classList.add('btn-light');
            this.mainButton.textContent = 'Clique aqui novamente';
        }, 2000);
    }

    private showWelcomeModal(): void {
        // Você pode criar modais programaticamente se necessário
        console.log('App inicializado com Bootstrap!');
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new BootstrapApp();
});

// Adicionar tipos para Bootstrap se necessário
declare global {
    interface Window {
        bootstrap: any;
    }
}