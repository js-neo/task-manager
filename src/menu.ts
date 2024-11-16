import chalk from 'chalk';
import inquirer from 'inquirer';
import TaskService from './services/TaskService.js';
import { validateId } from './utils.js';

const taskService = TaskService;

export const displayMenu = async () => {
    let running = true;

    while (running) {
        console.log(chalk.blue('===================='));
        console.log(chalk.green('Меню задач:'));
        console.log(chalk.blue('===================='));

        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: chalk.yellow('Выберите пункт меню:'),
                choices: [
                    'Создать новую задачу',
                    'Отметить задачу как выполненную',
                    'Показать все задачи',
                    'Сортировать задачи по статусу',
                    'Удалить задачу',
                    'Изменить задачу',
                    'Выход'
                ],
            },
        ]);

        switch (choice) {
            case 'Создать новую задачу':
                const { title } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: chalk.yellow('Введите название задачи:'),
                    },
                ]);
                taskService.createTask(title);
                console.log(chalk.green('Задача успешно создана!'));
                break;

            case 'Отметить задачу как выполненную':
                const { id } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: chalk.yellow('Введите ID задачи для отметки как выполненной:'),
                        validate: (input) => validateId(input) || chalk.red('Введите корректный ID'),
                    },
                ]);
                taskService.markAsDone(parseFloat(id));
                console.log(chalk.green('Задача отмечена как выполненная!'));
                break;

            case 'Показать все задачи':
                taskService.displayTasks();
                break;

            case 'Сортировать задачи по статусу':
                taskService.sortByStatus();
                console.log(chalk.green('Задачи отсортированы по статусу!'));
                break;

            case 'Удалить задачу':
                const { delId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'delId',
                        message: chalk.yellow('Введите ID задачи для удаления:'),
                        validate: (input) => validateId(input) || chalk.red('Введите корректный ID'),
                    },
                ]);
                taskService.deleteTask(parseFloat(delId));
                console.log(chalk.green('Задача успешно удалена!'));
                break;

            case 'Изменить задачу':
                const { editId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'editId',
                        message: chalk.yellow('Введите ID задачи для изменения:'),
                        validate: (input) => validateId(input) || chalk.red('Введите корректный ID'),
                    },
                ]);
                const { newTitle } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newTitle',
                        message: chalk.yellow('Введите новое название задачи:'),
                    },
                ]);
                taskService.editTask(parseFloat(editId), newTitle);
                console.log(chalk.green('Задача успешно изменена!'));
                break;

            case 'Выход':
                running = false;
                console.log(chalk.blue('Выход из программы...'));
                break;
        }
    }
};
