import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { Task } from '../models/Task.js';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tasksPath = join(__dirname, '../../tasks.json');

class TaskService {
    private static instance: TaskService;
    private readonly tasks: Task[] = [];

    public static getInstance(): TaskService {
        if (!this.instance) {
            this.instance = new TaskService();
        }
        return this.instance;
    }

    private constructor() {
        try {
            const data = readFileSync(tasksPath, 'utf8');
            this.tasks = JSON.parse(data).map((task: any) => new Task(task.id, task.title, task.status));
        } catch (error) {
            console.log(chalk.yellow('No tasks found.'));
        }
    }

    createTask(title: string): void {
        const lastId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) : 0;
        const task = new Task(lastId + 1, title);
        this.tasks.push(task);
        this.saveTasks();
        console.log(chalk.green(`Задача "${title}" успешно создана!`));
    }

    markAsDone(id: number): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.complete();
            this.saveTasks();
            console.log(chalk.green(`Задача с ID ${id} отмечена как выполненная.`));
        } else {
            console.log(chalk.red(`Задача с ID ${id} не найдена.`));
        }
    }

    displayTasks(): void {
        if (this.tasks.length > 0) {
            console.table(this.tasks.map(task => task.toString()));
        } else {
            console.log(chalk.yellow('Нет задач для отображения.'));
        }
    }

    sortByStatus(): void {
        this.tasks.sort((a, b) => Number(a.status) - Number(b.status));
        this.displayTasks();
    }

    deleteTask(id: number): void {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            this.saveTasks();
            console.log(chalk.green(`Задача с ID ${id} успешно удалена.`));
        } else {
            console.log(chalk.red(`Задача с ID ${id} не найдена.`));
        }
    }

    editTask(id: number, newTitle: string): void {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].title = newTitle;
            this.saveTasks();
            console.log(chalk.green(`Задача с ID ${id} успешно изменена на "${newTitle}".`));
        } else {
            console.log(chalk.red(`Задача с ID ${id} не найдена.`));
        }
    }

    saveTasks(): void {
        const jsonData = JSON.stringify(this.tasks, null, 2);
        writeFileSync(tasksPath, jsonData, 'utf8');
    }
}

export default TaskService.getInstance();
