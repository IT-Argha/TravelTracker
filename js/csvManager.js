export class CSVManager {
    constructor(expenseManager, uiManager) {
        this.expenseManager = expenseManager;
        this.uiManager = uiManager;
        this.importBtn = document.getElementById('importBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.fileInput = document.getElementById('fileInput');
    }

    initialize() {
        if (!this.importBtn || !this.exportBtn || !this.fileInput) {
            console.error('Required elements not found');
            return;
        }

        this.importBtn.addEventListener('click', () => this.fileInput.click());
        this.exportBtn.addEventListener('click', () => this.exportToCSV());
        this.fileInput.addEventListener('change', (e) => this.handleFileImport(e));
    }

    async handleFileImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const text = await file.text();
            const expenses = this.parseCSV(text);
            this.expenseManager.setExpenses(expenses);
            this.uiManager.updateExpenseCards();
            this.uiManager.showMessage('Data imported successfully!', 'success');
        } catch (error) {
            this.uiManager.showMessage('Error importing file: ' + error.message, 'error');
        }
        this.fileInput.value = '';
    }

    parseCSV(text) {
        const lines = text.split('\n');
        if (lines.length < 2) throw new Error('Invalid CSV format');

        const headers = lines[0].split(',').map(h => h.trim());
        
        return lines.slice(1)
            .filter(line => line.trim())
            .map(line => {
                const values = line.split(',').map(v => v.trim());
                if (values.length !== headers.length) {
                    throw new Error('Invalid CSV format: column count mismatch');
                }

                const expense = {};
                headers.forEach((header, index) => {
                    expense[header] = values[index];
                });

                // Ensure numeric values are properly converted
                expense.amount = parseFloat(expense.amount) || 0;
                expense.kms = parseFloat(expense.kms) || 0;
                
                return expense;
            });
    }

    exportToCSV() {
        const expenses = this.expenseManager.getExpenses();
        if (expenses.length === 0) {
            this.uiManager.showMessage('No data to export!', 'error');
            return;
        }

        const headers = ['date', 'from', 'to', 'transportMode', 'amount', 'kms', 'note'];
        const csvContent = [
            headers.join(','),
            ...expenses.map(expense => 
                headers.map(header => {
                    const value = expense[header] ?? '';
                    // Escape commas and quotes in values
                    return value.toString().includes(',') ? 
                        `"${value.replace(/"/g, '""')}"` : 
                        value;
                }).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `travel-expenses-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}