export class UIManager {
    constructor(expenseManager) {
        this.expenseManager = expenseManager;
        this.form = document.getElementById('expenseForm');
        this.expenseContainer = document.getElementById('expenseContainer');
        
        if (!this.form || !this.expenseContainer) {
            console.error('Required elements not found');
            return;
        }
    }

    initialize() {
        this.setupEventListeners();
        this.setupDateField();
        this.updateExpenseCards();
    }

    setupEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    setupDateField() {
        const dateField = document.getElementById('date');
        if (dateField) {
            const today = new Date().toISOString().split('T')[0];
            dateField.value = today;
            dateField.max = today;
        }
    }

    getFormData() {
        return {
            date: document.getElementById('date')?.value,
            from: document.getElementById('from')?.value,
            to: document.getElementById('to')?.value,
            transportMode: document.getElementById('transportMode')?.value,
            amount: parseFloat(document.getElementById('amount')?.value || '0'),
            kms: parseFloat(document.getElementById('kms')?.value || '0'),
            note: document.getElementById('note')?.value || ''
        };
    }

    async handleSubmit(e) {
        e.preventDefault();
        const expense = this.getFormData();

        try {
            this.expenseManager.validateExpense(expense);
            this.expenseManager.addExpense(expense);
            this.updateExpenseCards();
            this.form?.reset();
            this.setupDateField();
            this.showMessage('Expense added successfully!', 'success');
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    updateExpenseCards() {
        if (!this.expenseContainer) return;

        this.expenseContainer.innerHTML = '';
        const expenses = this.expenseManager.getExpenses();

        if (!Array.isArray(expenses) || expenses.length === 0) {
            this.expenseContainer.innerHTML = `
                <div class="no-expenses">
                    <h3>No expenses yet</h3>
                    <p>Add your first expense using the form above</p>
                </div>
            `;
            return;
        }

        expenses.forEach(expense => {
            if (!expense) return;

            try {
                const date = new Date(expense.date);
                const formattedDate = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });

                const card = document.createElement('div');
                card.className = `expense-card ${(expense.transportMode || '').toLowerCase()}`;
                card.innerHTML = `
                    <div class="expense-card-header">
                        <span class="expense-date">${formattedDate}</span>
                        <span class="expense-amount">₹${(expense.amount || 0).toFixed(2)}</span>
                    </div>
                    <div class="expense-card-body">
                        <div class="expense-route">
                            <span class="from">${expense.from || ''}</span>
                            <span class="arrow">→</span>
                            <span class="to">${expense.to || ''}</span>
                        </div>
                        <div class="expense-details">
                            <span class="transport-mode">${expense.transportMode || ''}</span>
                            <span class="distance">${(expense.kms || 0)} km</span>
                        </div>
                        ${expense.note ? `<div class="expense-note">${expense.note}</div>` : ''}
                    </div>
                `;

                this.expenseContainer.appendChild(card);
            } catch (error) {
                console.error('Error rendering expense card:', error);
            }
        });
    }

    showMessage(message, type) {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.padding = '1rem';
        alert.style.borderRadius = '4px';
        alert.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
        alert.style.color = 'white';
        alert.textContent = message;

        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    }
}