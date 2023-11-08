const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transID;

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        axios.post('https://expense-tracker-bb3t.onrender.com/api/v1/transactions', {
            text: text.value,
            amount: amount.value
        }).then(resp => {
            addTransactionDOM(resp.data.data);
            updateValues();

            text.value = '';
            amount.value = '';
        }).catch ((err) => {
            console.log(err);
        })
    }
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    transID = transaction._id;
    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> 
    <button class="delete-btn" data-id="${transaction._id}">x</button>
    `;
    list.appendChild(item);

    const deleteTrans = document.querySelectorAll('.delete-btn');
    deleteTrans.forEach((item)=>{
        item.addEventListener('click', (e) => {
            removeTransaction(e.currentTarget.dataset.id);
            list.removeChild(document.querySelector(`[data-id='${e.currentTarget.dataset.id}']`).parentNode);
        });
    })
}

// Update the balance, income and expense
function updateValues() {

    axios.get('https://expense-tracker-bb3t.onrender.com/api/v1/transactions', {
        timeout: 5000
    }).then(resp => {
        let transactions = resp.data.data;
        const amounts = transactions.map(transaction => transaction.amount);

        const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

        const income = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0)
            .toFixed(2);

        const expense = (
            amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
            -1
        ).toFixed(2);

        balance.innerText = `₹${total}`;
        money_plus.innerText = `₹${income}`;
        money_minus.innerText = `₹${expense}`;
    }).catch((err) => {
        console.log(err);
    })
}

// Remove transaction by ID
function removeTransaction(id) {
    axios.delete(`https://expense-tracker-bb3t.onrender.com/api/v1/transactions/${id}`)
    .then(resp=>{
        if (resp.data.success) {
            updateValues();
        }
    }).catch((err)=>{
        console.log(err);
    })
}

// Init app
async function init() {
    list.innerHTML = '';
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);