"use strict";

let drinkStorage = new tHashStorage();
let drinkName = document.getElementById("drinkName");

drinkName.onclick = function() {
    let keyP = prompt("напишите название напитка");
    let valueC = {};

    valueC.alcohol = confirm(keyP + " - алкогольный напиток или нет?\nok - алкогольный\nотмена - без алкогольный");
    valueC.recipe = prompt("напишите рецепт напитка - " + keyP);
    drinkStorage.addValue(keyP, valueC);
}

let drinkInfo = document.getElementById("drinkInfo");

drinkInfo.onclick = function() {
    let drinkInf = prompt("Напишите название напитка");
    let drinkInfoP = document.getElementById("drinkInfoP");

    let answer = drinkStorage.getValue(drinkInf);

    if (drinkStorage.getValue(drinkInf) !== undefined) {
        drinkInfoP.innerHTML = "напиток: " + drinkInf +
            "<br>" + "алкогольный: " + (answer.alcohol === true ? "да" : "нет") +
            "<br>" + "Рецепт: " + (answer.recipe ? answer.recipe : "к сожалению РЕЦЕПТА НЕТ");
    } else {
        drinkInfoP.innerHTML = "В хранилище такой напиток ОТСУТСТВУЕТ!";
    }
}

let drinkInfoDel = document.getElementById("drinkInfoDel");

drinkInfoDel.onclick = function() {
    let drinkInfoDel = prompt("Напишите название напитка");
    let drinkInfoP = document.getElementById("drinkInfoP");

    if (drinkStorage.deleteValue(drinkInfoDel) === true) {
        drinkInfoP.innerHTML = "информация о напитке УДАЛЕНО!";
    } else {
        drinkInfoP.innerHTML = "В хранилище такой напиток отсутствует";
    }

}

let drinkList = document.getElementById("drinkList");

drinkList.onclick = function() {
    let drinkInfoP = document.getElementById("drinkInfoP");
    drinkInfoP.innerHTML = drinkStorage.getKeys();
}