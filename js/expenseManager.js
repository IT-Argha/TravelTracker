import { StorageManager } from './storageManager.js';

export class ExpenseManager {
    constructor() {
        this.expenses = StorageManager.loadExpenses();
    }

    addExpense(expense) {
        this.expenses.push(expense);
        StorageManager.saveExpenses(this.expenses);
    }

    getExpenses() {
        return this.expenses;
    }

    setExpenses(expenses) {
        this.expenses = expenses;
        StorageManager.saveExpenses(this.expenses);
    }

    validateExpense(expense) {
        const required = ['date', 'from', 'to', 'transportMode', 'amount', 'kms'];
        
        for (const field of required) {
            if (!expense[field]) {
                throw new Error(`${field} is required`);
            }
        }

        const date = new Date(expense.date);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }

        if (isNaN(expense.amount) || expense.amount < 0) {
            throw new Error('Amount must be a positive number');
        }

        if (isNaN(expense.kms) || expense.kms < 0) {
            throw new Error('Kilometers must be a positive number');
        }

        return true;
    }
}