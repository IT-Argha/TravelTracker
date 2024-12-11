export class StorageManager {
    static STORAGE_KEY = 'travel-expenses';

    static saveExpenses(expenses) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
    }

    static loadExpenses() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
}