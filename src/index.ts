import {displayMenu} from "./menu.js";

console.clear();

(async () => {
    try {
        await displayMenu();
    } catch (error) {
        console.error('Ошибка:', error);
    }
})();
