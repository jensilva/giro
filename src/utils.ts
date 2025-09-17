export interface User {
    name: string;
    age: number;
}

export function formatMessage(user: User): string {
    return `Olá, ${user.name}! Você tem ${user.age} anos.`;
}

export function sum(a: number, b: number): number {
    return a + b;
}