document.addEventListener('DOMContentLoaded', () => {

const form = document.querySelector('.form');
const modal = document.getElementById('successModal');
const inputs = form.querySelectorAll('input');

// 📱 Находим телефон
const phoneInput = [...inputs].find(i => i.placeholder === 'Телефон');

// ===== МАСКА =====
phoneInput.addEventListener('input', () => {
let value = phoneInput.value.replace(/\D/g, '');

if (!value) {
phoneInput.value = '';
return;
}

if (value[0] === '8') value = '7' + value.slice(1);
if (value[0] !== '7') value = '7' + value;

let result = '+7';

if (value.length > 1) result += ' (' + value.substring(1, 4);
if (value.length >= 4) result += ') ' + value.substring(4, 7);
if (value.length >= 7) result += '-' + value.substring(7, 9);
if (value.length >= 9) result += '-' + value.substring(9, 11);

phoneInput.value = result;
});

// ===== ВАЛИДАЦИЯ =====
inputs.forEach(input => {
input.addEventListener('input', () => validateInput(input));
});

function validateInput(input) {
const value = input.value.trim();
const errorEl = input.nextElementSibling;

errorEl.textContent = '';
input.classList.remove('input-error');

if (value === '') {
errorEl.textContent = `Введите ${input.placeholder}`;
input.classList.add('input-error');
return false;
}

if (input.placeholder === 'Телефон') {
const digits = input.value.replace(/\D/g, '');
if (digits.length < 11) {
errorEl.textContent = 'Введите полный номер';
input.classList.add('input-error');
return false;
}
}

return true;
}

// ===== SUBMIT =====
form.addEventListener('submit', (e) => {
e.preventDefault();

let isValid = true;

inputs.forEach(input => {
if (!validateInput(input)) isValid = false;
});

if (!isValid) return;

modal.style.display = 'flex';
form.reset();
});

// ===== ЗАКРЫТИЕ МОДАЛКИ =====
window.closeModal = function () {
modal.style.display = 'none';
};

});