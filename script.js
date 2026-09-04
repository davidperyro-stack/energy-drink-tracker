const drinkSelect = document.getElementById("drink");
const caffeineAmount = document.getElementById("caffeineAmount");

const drinks = {
    "Monster Energy": 160,
    "Monster Ultra": 150,
    "Monster Mango Loco": 160,
    "Monster Pipeline Punch": 160,
    "Monster Pacific Punch": 160,
    "Red Bull": 80,
    "Red Bull Sugarfree": 80,
    "Red Bull Watermelon": 80,
    "Red Bull Blueberry": 80,
    "Red Bull Tropical": 80
};

drinkSelect.addEventListener("change", function () {

    const selectedDrink = drinkSelect.value;

    if (selectedDrink === "") {
        caffeineAmount.textContent = "Caffeine: -- mg";
        return;
    }

    const caffeine = drinks[selectedDrink];

    caffeineAmount.textContent = `Caffeine: ${caffeine} mg`;
});

const addDrinkButton = document.getElementById("addDrink");
const drinkList = document.getElementById("drinkList");
const drinkCount = document.getElementById("drinkCount");
const totalCaffeine = document.getElementById("totalCaffeine");

let numberOfDrinks = 0;
let caffeineTotal = 0;

let weekDrinkCount = 0;
let weekCaffeine = 0;

const weekDrinkCountElement = document.getElementById("weekDrinkCount");
const weekCaffeineElement = document.getElementById("weekCaffeine");

let monthDrinkCount = 0;
let monthCaffeine = 0;

const monthDrinkCountElement = document.getElementById("monthDrinkCount");
const monthCaffeineElement = document.getElementById("monthCaffeine");

let totalDrinkCount = 0;
let totalCaffeineAllTime = 0;

const totalDrinkCountElement = document.getElementById("totalDrinkCount");
const totalCaffeineAllTimeElement = document.getElementById("totalCaffeineAllTime");

let savedDrinks = JSON.parse(localStorage.getItem("energyDrinks")) || [];

addDrinkButton.addEventListener("click", function () {

    const selectedDrink = drinkSelect.value;

    if (selectedDrink === "") {
        alert("Please choose a drink first!");
        return;
    }

    const caffeine = drinks[selectedDrink];

    numberOfDrinks++;
    caffeineTotal += caffeine;

    drinkCount.textContent = numberOfDrinks;
    totalCaffeine.textContent = caffeineTotal;

    const drinkItem = document.createElement("div");

    drinkItem.textContent =
        `${selectedDrink} - ${caffeine} mg caffeine - ${new Date().toLocaleString()}`;

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
        const index = savedDrinks.findIndex(function(drink) {
            return drink.name === selectedDrink &&
                   drink.caffeine === caffeine;
        });

        if (index !== -1) {
            savedDrinks.splice(index, 1);

            localStorage.setItem(
                "energyDrinks",
                JSON.stringify(savedDrinks)
            );

            location.reload();
        }
    });

    drinkItem.appendChild(deleteButton);
    drinkList.appendChild(drinkItem);

    const drink = {
        name: selectedDrink,
        caffeine: caffeine,
        date: new Date().toISOString()
    };

    savedDrinks.push(drink);

    localStorage.setItem(
        "energyDrinks",
        JSON.stringify(savedDrinks)
    );
});

const today = new Date().toDateString();

const now = new Date();

const dayOfWeek = now.getDay();

const startOfWeek = new Date(now);

startOfWeek.setDate(
    now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
);

startOfWeek.setHours(0, 0, 0, 0);

const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
);

savedDrinks.forEach(function(drink) {

    totalDrinkCount++;
    totalCaffeineAllTime += drink.caffeine;

    const drinkDate = new Date(drink.date).toDateString();

    const drinkDateObject = new Date(drink.date);

    if (drinkDateObject >= startOfWeek) {
        weekDrinkCount++;
        weekCaffeine += drink.caffeine;
    }

    if (drinkDateObject >= startOfMonth) {
        monthDrinkCount++;
        monthCaffeine += drink.caffeine;
    }

    if (drinkDate === today) {

        numberOfDrinks++;
        caffeineTotal += drink.caffeine;

        const drinkItem = document.createElement("div");

        drinkItem.textContent =
            `${drink.name} - ${drink.caffeine} mg caffeine - ${new Date(drink.date).toLocaleString()}`;

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            const index = savedDrinks.indexOf(drink);

            if (index !== -1) {

                savedDrinks.splice(index, 1);

                localStorage.setItem(
                    "energyDrinks",
                    JSON.stringify(savedDrinks)
                );

                location.reload();
            }
        });

        drinkItem.appendChild(deleteButton);

        drinkList.appendChild(drinkItem);
    }
});

drinkCount.textContent = numberOfDrinks;
totalCaffeine.textContent = caffeineTotal;

weekDrinkCountElement.textContent = weekDrinkCount;
weekCaffeineElement.textContent = weekCaffeine;

monthDrinkCountElement.textContent = monthDrinkCount;
monthCaffeineElement.textContent = monthCaffeine;

totalDrinkCountElement.textContent = totalDrinkCount;
totalCaffeineAllTimeElement.textContent = totalCaffeineAllTime;
