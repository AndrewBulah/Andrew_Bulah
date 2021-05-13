'use strict';

class HashStorageClass {
    constructor() {
        this.storage = {};
    }
    addValue(key,value) {
        this.storage[key] = value;
    }
    getValue(key) {
        return this.storage[key];
    }
    deleteValue(key) {
        if (!(key in this.storage)) {
            return false;
        }
        delete this.storage[key];
        return true;
    }
    getKeys() {
        return Object.keys(this.storage);
    }
}

let drinkStorage = new HashStorageClass();

function drinkName() {
    let name = prompt('Введите напиток');
    if (!name) {
        return;
    }
    let alco = confirm('Подтвердите, если напиток алкогольный') ? 'да' : 'нет';
    let recipeInfo = prompt('Введите рецепт напитка');
    if (recipeInfo === null) {
        if (confirm('Хотите отменить добавление напитка?')) {
            return;
        }
        recipeInfo = prompt('Введите рецепт напитка');
    }
    if (recipeInfo === '') {
        recipeInfo = 'не указан';
    }
    drinkStorage.addValue(name, { alсoholic: alco,
                                  recipe: recipeInfo});
    alert('Напиток добавлен');
}

function drinkInfo() {
    let name = prompt('Введите напиток');
    if (!name) {
        return;
    }
    let info = drinkStorage.getValue(name);
    if (!info) {
        return alert('Напиток не найден');
    }
    alert('напиток ' + name + '\n' + 'алкогольный: ' + info.alсoholic + '\n' + 'рецепт приготовления: ' + info.recipe);
}

function drinkInfoDel() {
    let name = prompt('Введите напиток, который хотите удалить');
    if (!name) {
        return;
    }
    drinkStorage.deleteValue(name)  ? alert('Напиток удален') : alert('Напиток не найден');
}

function drinkList() {
    let drinks = drinkStorage.getKeys();
    if (drinks.length === 0) {
        return alert('Вы не добавили напиток');
    }
    alert('Напитки в хранилище: ' + drinks.join(', '));
}