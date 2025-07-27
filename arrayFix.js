function createArray(rows, cols, minVal, maxVal) {
    const arr = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
        }
        arr.push(row);
    }
    return arr;
}

function printArray(arr, markedRow) {
    for (let i = 0; i < arr.length; i++) {
        let prefix = (i === markedRow) ? '*' : ' ';
        let row = arr[i].join(', ');
        let minInRow = Math.min(...arr[i]);
        console.log(`${prefix} Строка ${i}: [${row}] Мин: ${minInRow}`);
    }
}

function findRowWithMinNumber(arr) {
    let minVal = Infinity;
    let minRow = -1;
    for (let i = 0; i < arr.length; i++) {
        let rowMin = Math.min(...arr[i]);
        if (rowMin < minVal) {
            minVal = rowMin;
            minRow = i;
        }
    }
    return minRow;
}

function fixArray(arr) {
    let replacements = 0;
    for (let i = 0; i < arr.length; i++) {
        let count = 1;
        for (let j = 1; j < arr[i].length; j++) {
            if ((arr[i][j] > 0 && arr[i][j - 1] > 0) || (arr[i][j] < 0 && arr[i][j - 1] < 0)) {
                count++;
            } else {
                count = 1;
            }
            if (count === 3) {
                arr[i][j] = 0;
                replacements++;
                count = 1; // сброс, т.к. 0 разрывает последовательность
            }
        }
    }
    return replacements;
}

// Основной запуск
const rows = 10, cols = 10;
const minVal = -20, maxVal = 20;

const arr = createArray(rows, cols, minVal, maxVal);

const minRow = findRowWithMinNumber(arr);

console.log("Изначальный массив:");
printArray(arr, minRow);

const totalReplacements = fixArray(arr);

console.log(`\nВсего заменено чисел для разрыва последовательностей: ${totalReplacements}`);

console.log("\nМассив после исправления подряд чисел:");
printArray(arr, minRow);
