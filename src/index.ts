import { formatMessage } from './utils.js';

interface User {
    name: string;
    age: number;
}

class App {
    private button: HTMLButtonElement;
    private output: HTMLDivElement;

    constructor() {
        this.button = document.getElementById('btn') as HTMLButtonElement;
        this.output = document.getElementById('output') as HTMLDivElement;

        this.init();
    }

    private init(): void {
        this.button.addEventListener('click', () => this.handleClick());
    }

    private handleClick(): void {
        const user: User = {
            name: 'João',
            age: 30
        };

        const message = formatMessage(user);
        this.output.innerHTML = message;

        console.log('Botão clicado!', user);
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new App();
});