import { ExpenseManager } from './expenseManager.js';
import { UIManager } from './uiManager.js';
import { CSVManager } from './csvManager.js';

const expenseManager = new ExpenseManager();
const uiManager = new UIManager(expenseManager);
const csvManager = new CSVManager(expenseManager, uiManager);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    uiManager.initialize();
    csvManager.initialize();
});