import * as flsFunctions from './modules/functions.js';

flsFunctions.isWebp();

// Найти все элементы <select> в HTML, где будет отображаться список времени
const selectElements = document.querySelectorAll('select');

// Создать начальное время
const startTime = new Date();
startTime.setHours(9);
startTime.setMinutes(0);

// Создать конечное время
const endTime = new Date();
endTime.setHours(23);
endTime.setMinutes(59);

// Шаг времени в минутах
const timeStep = 30;

// Проход по каждому элементу <select>
selectElements.forEach((selectElement) => {
    // Очистить элемент перед добавлением новых вариантов времени
    selectElement.innerHTML = '';

    // Проход по времени с шагом 30 минут и добавление вариантов в текущий выпадающий список
    for (
        let currentTime = new Date(startTime);
        currentTime <= endTime;
        currentTime.setMinutes(currentTime.getMinutes() + timeStep)
    ) {
        // Получить часы и минуты из текущего времени
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();

        // Преобразование часов и минут в строку в формате "чч:мм"
        const timeString = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(
            -2
        )}`;

        // Создание нового элемента <option> и добавление его в текущий <select>
        const optionElement = document.createElement('option');
        optionElement.innerHTML = timeString;
        selectElement.appendChild(optionElement);
    }
});

// ...

const date1Input = document.querySelector('.data1');
const date2Input = document.querySelector('.data2');
const form = document.querySelector('.calendar__form');

const currentDate = new Date();

// Установка минимальной даты в поле ввода date1Input
// date1Input.min = currentDate.toISOString().slice(0, 10);

// Установка текущей даты в поле ввода date1Input
date1Input.value = currentDate.toISOString().slice(0, 10);

// Создание элемента для вывода ошибки
const errorMessage = document.createElement('span');
errorMessage.classList.add('error-message');
form.insertAdjacentElement('afterend', errorMessage);

// ... ваш код ...
// функция проверяет время равно между собой или что-то больше, а что-то меньше
function compareTime(time1, time2) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);
    if (hours1 > hours2) {
        return -1;
    } else if (hours1 < hours2) {
        return 1;
    } else {
        if (minutes1 > minutes2) {
            return -1;
        } else if (minutes1 < minutes2) {
            return 1;
        } else {
            return 0;
        }
    }
}

//если 2 даты равны между собой то функция проверяет время
function checkDate(date1, date2) {
    if (date2.getTime() === date1.getTime()) {
        let time1 = selectElements[0].value;
        let time2 = selectElements[1].value;
        if (compareTime(time1, time2) < 1) {
            errorMessage.textContent =
                'Время конца аренды не может быть раньше или в то же время что и начало';
        } else {
            errorMessage.textContent = '';
        }
    }
}

const inputs = [date1Input, date2Input];
inputs.forEach(function (input) {
    input.addEventListener('change', function () {
        let date1 = new Date(date1Input.value);
        let date2 = new Date(date2Input.value);
        let getDay = date1.getTime();
        let today = currentDate.getTime();
        console.log(today);
        console.log(getDay);
        if (getDay < today - 99999999) {
            errorMessage.textContent =
                'дата подачи не может быть раньше чем сегодня';
            date1Input.value = '';
        } else {
            errorMessage.textContent = '';
        }

        checkDate(date1, date2);
        if (date1 > date2) {
            errorMessage.textContent =
                'дата подачи не может быть позже чем дата возврата';
            date2Input.value = '';
        }
    });
});

// Обработка изменений времени начала и конца аренды
selectElements.forEach(function (selectElement) {
    selectElement.addEventListener('change', function () {
        let date1 = new Date(date1Input.value);
        let date2 = new Date(date2Input.value);
        checkDate(date1, date2);
    });
});
