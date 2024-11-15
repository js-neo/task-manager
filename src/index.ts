import TaskService from './services/TaskService.js';
import chalk from 'chalk';
import inquirer from 'inquirer';

const taskService = TaskService;

console.clear();

const menu = async () => {
    let running = true;

    while (running) {
        console.log(chalk.blue(`
    Меню:
    1. Создать новую задачу
    2. Отметить задачу как выполненную
    3. Показать все задачи
    4. Сортировать задачи по статусу
    5. Удалить задачу
    6. Изменить задачу
    7. Выход
    `));

        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Выберите пункт меню:',
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
                        message: 'Введите название задачи:',
                    },
                ]);
                taskService.createTask(title);
                break;

            case 'Отметить задачу как выполненную':
                const { id } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Введите ID задачи для отметки как выполненной:',
                        validate: (input) => !isNaN(parseFloat(input)) || 'Введите корректный ID',
                    },
                ]);
                taskService.markAsDone(parseFloat(id));
                break;

            case 'Показать все задачи':
                taskService.displayTasks();
                break;

            case 'Сортировать задачи по статусу':
                taskService.sortByStatus();
                break;

            case 'Удалить задачу':
                const { delId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'delId',
                        message: 'Введите ID задачи для удаления:',
                        validate: (input) => !isNaN(parseFloat(input)) || 'Введите корректный ID',
                    },
                ]);
                taskService.deleteTask(parseFloat(delId));
                break;

            case 'Изменить задачу':
                const { editId } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'editId',
                        message: 'Введите ID задачи для изменения:',
                        validate: (input) => !isNaN(parseFloat(input)) || 'Введите корректный ID',
                    },
                ]);
                const { newTitle } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'newTitle',
                        message: 'Введите новое название задачи:',
                    },
                ]);
                taskService.editTask(parseFloat(editId), newTitle);
                break;

            case 'Выход':
                running = false;
                break;
        }
    }
};

(async () => {
    try {
        await menu();
    } catch (error) {
        console.error('Ошибка:', error);
    }
})();
