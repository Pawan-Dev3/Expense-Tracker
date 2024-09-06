let balance = 0;
let debitData = {};

function updateBalance() {
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function addHistory(description, amount, type, receipt, paymentType) {
    const historyList = document.getElementById('history-list');
    const listItem = document.createElement('li');
    listItem.className = type;

    listItem.innerHTML = `
        <span>${description} (${paymentType})</span>
        <span>₹${amount.toFixed(2)}</span>
        <img src="${receipt}" alt="Receipt">
        <button class="delete-btn btn" onclick="deleteHistory(this, ${amount}, '${type}', '${description}')">Delete</button>
    `;
    historyList.appendChild(listItem);
}

function previewReceipt(event, previewElementId) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewElement = document.getElementById(previewElementId);
        previewElement.innerHTML = `<img src="${e.target.result}" alt="Receipt Preview">`;
    };
    reader.readAsDataURL(file);
}

document.getElementById('credit-receipt').addEventListener('change', (event) => previewReceipt(event, 'credit-preview'));
document.getElementById('debit-receipt').addEventListener('change', (event) => previewReceipt(event, 'debit-preview'));

function addCredit() {
    const description = document.getElementById('credit-description').value;
    const amount = parseFloat(document.getElementById('credit-amount').value);
    const paymentType = document.getElementById('credit-type').value;
    const receipt = document.getElementById('credit-preview').querySelector('img')?.src;

    if (description && !isNaN(amount) && amount > 0 && receipt) {
        balance += amount;
        updateBalance();
        addHistory(description, amount, 'credit', receipt, paymentType);
        clearInputs('credit');
    }
}

function addDebit() {
    const description = document.getElementById('debit-description').value;
    const amount = parseFloat(document.getElementById('debit-amount').value);
    const paymentType = document.getElementById('debit-type').value;
    const receipt = document.getElementById('debit-preview').querySelector('img')?.src;

    if (description && !isNaN(amount) && amount > 0 && receipt) {
        balance -= amount;
        updateBalance();
        addHistory(description, amount, 'debit', receipt, paymentType);

        if (debitData[description]) {
            debitData[description] += amount;
        } else {
            debitData[description] = amount;
        }
        updateDebitChart();
        clearInputs('debit');
    }
}

function deleteHistory(element, amount, type, description) {
    if (type === 'credit') {
        balance -= amount;
    } else if (type === 'debit') {
        balance += amount;
        debitData[description] -= amount;
        if (debitData[description] <= 0) {
            delete debitData[description];
        }
        updateDebitChart();
    }
    updateBalance();
    element.parentElement.remove();
}

function updateDebitChart() {
    const ctx = document.getElementById('debitChart').getContext('2d');
    const chartData = {
        labels: Object.keys(debitData),
        datasets: [{
            label: 'Debits',
            data: Object.values(debitData),
            backgroundColor: ['#f44336', '#ff9800', '#2196f3', '#4caf50', '#9c27b0'],
        }]
    };

    if (window.myPieChart) {
        window.myPieChart.destroy();
    }

    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
    });
}

function clearInputs(type) {
    document.getElementById(`${type}-description`).value = '';
    document.getElementById(`${type}-amount`).value = '';
    document.getElementById(`${type}-type`).value = 'None';
    document.getElementById(`${type}-preview`).innerHTML = '';
    document.getElementById(`${type}-receipt`).value = '';
}

updateBalance();
