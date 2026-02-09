// Исходные данные фруктов
const fruits = [
  { kind: 'Мангустин', color: 'фиолетовый', weight: 13 },
  { kind: 'Дуриан', color: 'зеленый', weight: 35 },
  { kind: 'Личи', color: 'розово-красный', weight: 17 },
  { kind: 'Карамбола', color: 'желтый', weight: 28 },
  { kind: 'Тамаринд', color: 'светло-коричневый', weight: 22 }
];

// Текущий отображаемый массив
let currentFruits = [...fruits];

// Алгоритм сортировки (по умолчанию пузырьковая)
let currentSortAlgorithm = 'bubbleSort';

// Приоритет цветов для сортировки
const colorPriority = [
  'красный',
  'оранжевый', 
  'желтый',
  'зеленый',
  'голубой',
  'синий',
  'фиолетовый',
  'розово-красный',
  'светло-коричневый'
];

// Получение элементов DOM
const fruitsList = document.querySelector('.fruits__list');
const shuffleBtn = document.querySelector('.shuffle__btn');
const minWeightInput = document.querySelector('.minweight__input');
const maxWeightInput = document.querySelector('.maxweight__input');
const filterBtn = document.querySelector('.filter__btn');
const sortKindElement = document.querySelector('.sort__kind');
const sortTimeElement = document.querySelector('.sort__time');
const sortChangeBtn = document.querySelector('.sort__change__btn');
const sortActionBtn = document.querySelector('.sort__action__btn');
const kindInput = document.querySelector('.kind__input');
const colorInput = document.querySelector('.color__input');
const weightInput = document.querySelector('.weight__input');
const addActionBtn = document.querySelector('.add__action__btn');

// Функция для сравнения цветов
function comparationColor(a, b) {
  const colorA = a.color.toLowerCase();
  const colorB = b.color.toLowerCase();
  
  const indexA = colorPriority.indexOf(colorA);
  const indexB = colorPriority.indexOf(colorB);
  
  if (indexA === -1 && indexB === -1) return colorA.localeCompare(colorB);
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;
  
  return indexA - indexB;
}

// Пузырьковая сортировка
function bubbleSort(arr, comparator) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (comparator(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Быстрая сортировка
function quickSort(arr, comparator) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  
  for (const item of arr) {
    const cmp = comparator(item, pivot);
    if (cmp < 0) {
      left.push(item);
    } else if (cmp > 0) {
      right.push(item);
    } else {
      equal.push(item);
    }
  }
  
  return [...quickSort(left, comparator), ...equal, ...quickSort(right, comparator)];
}

// Функция для отображения фруктов
function display(fruitsArray) {
  fruitsList.innerHTML = '';
  
  fruitsArray.forEach((fruit, index) => {
    const li = document.createElement('li');
    
    // Определяем класс цвета
    let colorClass = '';
    switch(fruit.color.toLowerCase()) {
      case 'фиолетовый':
        colorClass = 'fruit_violet';
        break;
      case 'зеленый':
        colorClass = 'fruit_green';
        break;
      case 'розово-красный':
        colorClass = 'fruit_carmazin';
        break;
      case 'желтый':
        colorClass = 'fruit_yellow';
        break;
      case 'светло-коричневый':
        colorClass = 'fruit_lightbrown';
        break;
      default:
        colorClass = 'fruit_violet';
    }
    
    li.className = `fruit__item ${colorClass}`;
    
    li.innerHTML = `
      <div class="fruit__info">
        <div>index: ${index}</div>
        <div>kind: ${fruit.kind}</div>
        <div>color: ${fruit.color}</div>
        <div>weight (кг): ${fruit.weight}</div>
      </div>
    `;
    
    fruitsList.appendChild(li);
  });
}

// Функция перемешивания
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  // Проверяем, изменился ли порядок
  let isSame = true;
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== newArray[i]) {
      isSame = false;
      break;
    }
  }
  
  if (isSame) {
    alert('Порядок не изменился! Попробуйте еще раз.');
  }
  
  return newArray;
}

// Функция фильтрации
function filterFruits() {
  const minWeight = parseFloat(minWeightInput.value) || 0;
  const maxWeight = parseFloat(maxWeightInput.value) || Infinity;
  
  if (minWeight > maxWeight) {
    alert('Минимальный вес не может быть больше максимального!');
    return currentFruits;
  }
  
  return fruits.filter(fruit => 
    fruit.weight >= minWeight && fruit.weight <= maxWeight
  );
}

// Функция сортировки с измерением времени
function performSort() {
  const startTime = performance.now();
  
  let sortedArray;
  if (currentSortAlgorithm === 'bubbleSort') {
    sortedArray = bubbleSort([...currentFruits], comparationColor);
  } else {
    sortedArray = quickSort([...currentFruits], comparationColor);
  }
  
  const endTime = performance.now();
  const sortTime = (endTime - startTime).toFixed(2);
  
  sortTimeElement.textContent = `${sortTime} мс`;
  return sortedArray;
}

// Инициализация
function init() {
  // Отображаем начальные данные
  display(currentFruits);
  
  // Устанавливаем текущий алгоритм сортировки
  sortKindElement.textContent = currentSortAlgorithm;
  sortTimeElement.textContent = '-';
  
  // Обработчики событий
  
  // Перемешать
  shuffleBtn.addEventListener('click', () => {
    currentFruits = shuffleArray(currentFruits);
    display(currentFruits);
  });
  
  // Фильтровать
  filterBtn.addEventListener('click', () => {
    currentFruits = filterFruits();
    display(currentFruits);
  });
  
  // Сменить алгоритм сортировки
  sortChangeBtn.addEventListener('click', () => {
    currentSortAlgorithm = currentSortAlgorithm === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
    sortKindElement.textContent = currentSortAlgorithm;
    sortTimeElement.textContent = '-';
  });
  
  // Сортировать
  sortActionBtn.addEventListener('click', () => {
    currentFruits = performSort();
    display(currentFruits);
  });
  
  // Добавить фрукт
  addActionBtn.addEventListener('click', () => {
    const kind = kindInput.value.trim();
    const color = colorInput.value.trim();
    const weight = parseFloat(weightInput.value);
    
    if (!kind || !color || isNaN(weight) || weight <= 0) {
      alert('Пожалуйста, заполните все поля корректно!');
      return;
    }
    
    const newFruit = {
      kind,
      color,
      weight
    };
    
    fruits.push(newFruit);
    currentFruits = [...fruits];
    display(currentFruits);
    
    // Очищаем поля ввода
    kindInput.value = '';
    colorInput.value = '';
    weightInput.value = '';
  });
}

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', init);