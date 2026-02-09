// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// для фильтрации нужны поля ввода min и max веса
const minWeightInput = document.querySelector('.minweight__input');
const maxWeightInput = document.querySelector('.maxweight__input');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

// копия для фильтрации (чтобы не потерять исходные данные)
let filteredFruits = [...fruits];

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = (fruitsArray) => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';

  for (let i = 0; i < fruitsArray.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const fruit = fruitsArray[i];
    
    // определяем класс для цвета
    let colorClass = 'fruit_violet';
    if (fruit.color === 'зеленый') colorClass = 'fruit_green';
    else if (fruit.color === 'розово-красный') colorClass = 'fruit_carmazin';
    else if (fruit.color === 'желтый') colorClass = 'fruit_yellow';
    else if (fruit.color === 'светло-коричневый') colorClass = 'fruit_lightbrown';
    else if (fruit.color === 'фиолетовый') colorClass = 'fruit_violet';
    
    li.className = `fruit__item ${colorClass}`;
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'fruit__info';
    infoDiv.innerHTML = `
      <div>index: ${i}</div>
      <div>kind: ${fruit.kind}</div>
      <div>color: ${fruit.color}</div>
      <div>weight (кг): ${fruit.weight}</div>
    `;
    
    li.appendChild(infoDiv);
    fruitsList.appendChild(li);
  }
};

// первая отрисовка карточек
display(filteredFruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let originalOrder = [...filteredFruits]; // сохраняем исходный порядок для проверки

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (filteredFruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    const randomIndex = getRandomInt(0, filteredFruits.length - 1);
    const randomFruit = filteredFruits.splice(randomIndex, 1)[0];
    result.push(randomFruit);
  }

  filteredFruits = result;
  
  // проверяем, изменился ли порядок
  let isSameOrder = true;
  for (let i = 0; i < originalOrder.length; i++) {
    if (originalOrder[i] !== filteredFruits[i]) {
      isSameOrder = false;
      break;
    }
  }
  
  if (isSameOrder && originalOrder.length > 1) {
    alert('Порядок не изменился! Попробуйте еще раз.');
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(filteredFruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  const minWeight = parseFloat(minWeightInput.value);
  const maxWeight = parseFloat(maxWeightInput.value);
  
  if (isNaN(minWeight) && isNaN(maxWeight)) {
    // если оба поля пустые, показываем все фрукты
    filteredFruits = [...fruits];
  } else {
    const actualMin = isNaN(minWeight) ? 0 : minWeight;
    const actualMax = isNaN(maxWeight) ? Infinity : maxWeight;
    
    filteredFruits = fruits.filter((item) => {
      // TODO: допишите функцию
      return item.weight >= actualMin && item.weight <= actualMax;
    });
  }
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display(filteredFruits);
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

// приоритет цветов для сортировки
const colorPriority = ['красный', 'оранжевый', 'желтый', 'зеленый', 'голубой', 'синий', 'фиолетовый', 'розово-красный', 'светло-коричневый'];

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const colorA = a.color.toLowerCase();
  const colorB = b.color.toLowerCase();
  
  const indexA = colorPriority.indexOf(colorA);
  const indexB = colorPriority.indexOf(colorB);
  
  if (indexA !== -1 && indexB !== -1) {
    return indexA - indexB;
  }
  
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  
  return colorA.localeCompare(colorB);
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const array = [...arr];
    const n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (comparation(array[j], array[j + 1]) > 0) {
          // меняем местами
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    
    return array;
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    if (arr.length <= 1) {
      return [...arr];
    }
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];
    
    for (const item of arr) {
      const cmp = comparation(item, pivot);
      if (cmp < 0) {
        left.push(item);
      } else if (cmp > 0) {
        right.push(item);
      } else {
        equal.push(item);
      }
    }
    
    return [...this.quickSort(left, comparation), ...equal, ...this.quickSort(right, comparation)];
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    const sorted = sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    return sorted;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind === 'bubbleSort') {
    sortKind = 'quickSort';
  } else {
    sortKind = 'bubbleSort';
  }
  
  sortKindLabel.textContent = sortKind;
  sortTimeLabel.textContent = '-';
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  
  const sort = sortAPI[sortKind];
  filteredFruits = sortAPI.startSort(sort, filteredFruits, comparationColor);
  display(filteredFruits);
  
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  const kind = kindInput.value.trim();
  const color = colorInput.value.trim();
  const weight = parseFloat(weightInput.value);
  
  if (!kind || !color || isNaN(weight)) {
    alert('Все поля должны быть заполнены корректно!');
    return;
  }
  
  const newFruit = {
    kind: kind,
    color: color,
    weight: weight
  };
  
  fruits.push(newFruit);
  filteredFruits.push(newFruit);
  
  // очищаем поля ввода
  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';
  
  display(filteredFruits);
});