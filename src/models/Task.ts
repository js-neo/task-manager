export class Task {
    constructor(
        public id: number,
        public title: string,
        public status: boolean = false
    ) {}

    complete() {
        this.status = true;
    }

    isCompleted(): boolean {
        return this.status;
    }

    toString(): string {
        return `${this.id}: ${this.title} [${this.status ? 'Завершено' : 'Не завершено'}]`;
    }
}
