export interface User {
    name: string;
    age: number;
    email?: string;
}

export function showAlert(message: string, type: 'success' | 'danger' | 'warning' | 'info', container: HTMLElement): void {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    container.appendChild(alertDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

export function createBootstrapCard(title: string, content: string): string {
    return `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${content}</p>
                <button class="btn btn-primary">Ação</button>
            </div>
        </div>
    `;
}