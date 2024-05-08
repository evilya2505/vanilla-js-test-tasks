// Даны два массива чисел nums1 и nums2, отсортированных в порядке неубывания, и два целых числа m и n, представляющие количество элементов в nums1 и nums2 соответственно.

// Объедините nums1 и nums2 в единый массив, отсортированный в порядке неубывания.

// Конечный отсортированный массив не должен возвращаться функцией, а вместо этого храниться внутри массива nums1. Чтобы учесть это, nums1 имеет длину m + n,
// где первые m элементов обозначают элементы, которые должны быть объединены, а последние n элементов имеют значение 0 и должны игнорироваться. nums2 имеет длину n.

// Стек: задача должна быть выполнена на языке Javascript. Использование сторонних библиотек запрещается.

function merge(nums1, m, nums2, n) {
  // Удаление лишних нулей
  nums1.splice(m, n);
  // Добавление элементов из nums2
  nums1.push(...nums2);
  // Сортировка
  nums1.sort((a, b) => a - b);
}

const nums1 = [1, 2, 3, 0, 0, 0];
const m = 3;
const nums2 = [2, 5, 6];
const n = 3;

merge(nums1, m, nums2, n); // -> после выполнения функции nums1 === [1,2,2,3,5,6]
