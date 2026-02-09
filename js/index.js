// ===== DOM =====
const fruitsList = document.querySelector('.fruits__list');
const shuffleButton = document.querySelector('.shuffle__btn');
const filterButton = document.querySelector('.filter__btn');
const sortKindLabel = document.querySelector('.sort__kind');
const sortTimeLabel = document.querySelector('.sort__time');
const sortChangeButton = document.querySelector('.sort__change__btn');
const sortActionButton = document.querySelector('.sort__action__btn');

const kindInput = document.querySelector('.kind__input');
const colorInput = document.querySelector('.color__input');
const weightInput = document.querySelector('.weight__input');
const minWeightInput = document.querySelector('.minweight__input');
const maxWeightInput = document.querySelector('.maxweight__input');
const addActionButton = document.querySelector('.add__action__btn');

// ===== DATA =====
let fruits = [
  { kind: 'Мангустин', color: 'фиолетовый', weight: 13 },
  { kind: 'Дуриан', color: 'зеленый', weight: 35 },
  { kind: 'Личи', color: 'розово-красный', weight: 17 },
  { kind: 'Карамбола', color: 'желтый', weight: 28 },
  { kind: 'Тамаринд', color: 'светло-коричневый', weight: 22 },
];

// ===== RENDER =====
const display = () => {
  fruitsList.innerHTML = '';

  fruits.forEach((fruit, index) => {
    const li = document.createElement('li');
    li.classList.add('fruit__item');

    if (fruit.color === 'фиолетовый') li.classList.add('fruit_violet');
    if (fruit.color === 'зеленый') li.classList.add('fruit_green');
    if (fruit.color === 'розово-красный') li.classList.add('fruit_carmazin');
    if (fruit.color === 'желтый') li.classList.add('fruit_yellow');
    if (fruit.color === 'светло-коричневый') li.classList.add('fruit_lightbrown');

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
};

display();

// ===== SHUFFLE =====
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleFruits = () => {
  const result = [];
  while (fruits.length > 0) {
    const i = getRandomInt(0, fruits.length - 1);
    result.push(fruits.splice(i, 1)[0]);
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

// ===== FILTER =====
const filterFruits = () => {
  const min = Number(minWeightInput.value);
  const max = Number(maxWeightInput.value);

  fruits = fruits.filter(
    (fruit) => fruit.weight >= min && fruit.weight <= max
  );
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

// ===== SORT =====
let sortKind = 'bubbleSort';
let sortTime = '-';

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

const comparationColor = (a, b) => {
  if (a.color > b.color) return 1;
  if (a.color < b.color) return -1;
  return 0;
};

const sortAPI = {
  bubbleSort(arr, compare) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (compare(arr[j], arr[j + 1]) > 0) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  },

  quickSort(arr, compare) {
    if (arr.length <= 1) return arr;

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
      if (compare(arr[i], pivot) < 0) left.push(arr[i]);
      else right.push(arr[i]);
    }

    const sorted = [
      ...this.quickSort(left, compare),
      pivot,
      ...this.quickSort(right, compare),
    ];

    arr.splice(0, arr.length, ...sorted);
  },

  startSort(sort, arr, compare) {
    const start = Date.now();
    sort(arr, compare);
    sortTime = `${Date.now() - start} ms`;
  },
};

sortChangeButton.addEventListener('click', () => {
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  sortAPI.startSort(sortAPI[sortKind], fruits, comparationColor);
  sortTimeLabel.textContent = sortTime;
  display();
});

// ===== ADD FRUIT =====
addActionButton.addEventListener('click', () => {
  if (!kindInput.value || !colorInput.value || !weightInput.value) return;

  fruits.push({
    kind: kindInput.value,
    color: colorInput.value,
    weight: Number(weightInput.value),
  });

  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';

  display();
});
const fruitsList = document.querySelector('.fruits__list');
const addActionButton = document.querySelector('.add__action__btn');
const kindInput = document.querySelector('.kind__input');
const colorInput = document.querySelector('.color__input');
const weightInput = document.querySelector('.weight__input');

let fruits = [
  { kind: 'Мангустин', color: 'фиолетовый', weight: 13 },
  { kind: 'Дуриан', color: 'зеленый', weight: 35 },
];

const display = () => {
  fruitsList.innerHTML = '';

  fruits.forEach((fruit, index) => {
    const li = document.createElement('li');
    li.classList.add('fruit__item');
    li.innerHTML = `
      <div class="fruit__info">
        <div>index: ${index}</div>
        <div>kind: ${fruit.kind}</div>
        <div>color: ${fruit.color}</div>
        <div>weight: ${fruit.weight}</div>
      </div>
    `;
    fruitsList.appendChild(li);
  });
};

display();

addActionButton.addEventListener('click', () => {
  fruits.push({
    kind: kindInput.value,
    color: colorInput.value,
    weight: Number(weightInput.value),
  });

  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';

  display();
});

