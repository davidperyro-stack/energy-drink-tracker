const drinkSelect = document.getElementById("drink");
const caffeineAmount = document.getElementById("caffeineAmount");
const caffeineMessage = document.getElementById("caffeineMessage");

const drinks = {
    "Monster Energy Original Green": 160,
    "Monster Energy Zero Sugar": 160,
    "Monster Energy Strawberry Shot": 160,
    "Monster Energy Zero Sugar Strawberry Shot": 160,
    "Monster Energy Lando Norris": 160,
    "Monster Energy Electric Blue": 160,
    "Monster Energy Orange Dreamsicle": 160,
    "Monster Energy Lo-Carb": 160,
    "Monster Energy Reserve Orange Dreamsicle": 160,
    "Monster Energy Reserve Peaches n' Crème": 160,
    "Monster Energy Nitro Super Dry": 160,
    "Monster Energy Super-Premium Import": 160,

    "Monster Ultra Red White Blue Razz": 140,
    "Monster Ultra Zero Ultra": 140,
    "Monster Ultra Punk Punch": 140,
    "Monster Ultra Blue Hawaiian": 140,
    "Monster Ultra Vice Guava": 140,
    "Monster Ultra Wild Passion": 140,
    "Monster Ultra Strawberry Dreams": 140,
    "Monster Ultra Sunrise": 140,
    "Monster Ultra Violet": 140,
    "Monster Ultra Peachy Keen": 140,
    "Monster Ultra Fantasy Ruby Red": 140,
    "Monster Ultra Paradise": 140,
    "Monster Ultra Fiesta Mango": 140,
    "Monster Ultra Watermelon": 140,
    "Monster Ultra Rosá": 140,
    "Monster Ultra Red": 140,
    "Monster Ultra Blue": 140,
    "Monster Ultra Black": 140,

    "Java Monster Mean Bean": 188,
    "Java Monster Loca Moca": 188,
    "Java Monster Salted Caramel": 188,
    "Java Monster Café Latte": 188,
    "Java Monster Irish Crème": 188,
    "Killer Brew Loca Moca": 188,
    "Killer Brew Mean Bean": 188,

    "Juice Monster Strawberry Lemonade": 160,
    "Juice Monster Voodoo Grape": 160,
    "Juice Monster Mango Loco": 160,
    "Juice Monster Pacific Punch": 160,
    "Juice Monster Viking Berry": 160,
    "Juice Monster Bad Apple": 160,
    "Juice Monster Rio Punch": 160,
    "Juice Monster Pipeline Punch": 160,

    "Rehab Monster Tea + Lemonade": 160,
    "Rehab Monster Peach Tea": 160,
    "Rehab Monster Wild Berry Tea": 160,
    "Rehab Monster Green Tea": 160,

    "Red Bull Energy Drink": 80,
    "Red Bull Sugarfree": 80,
    "Red Bull Zero": 80,
    "Red Bull Red Edition": 80,
    "Red Bull Yellow Edition": 80,
    "Red Bull Coconut Edition": 80,
    "Red Bull Amber Edition": 80,
    "Red Bull Sea Blue Edition": 80,
    "Red Bull Sea Blue Edition Sugarfree": 80,
    "Red Bull Pink Edition": 80,
    "Red Bull Pink Edition Sugarfree": 80,
    "Red Bull Peach Edition": 80,
    "Red Bull Peach Edition Sugarfree": 80,
    "Red Bull Iced Edition": 80,
    "Red Bull Iced Edition Sugarfree": 80,
    "Red Bull Summer Edition": 80,
    "Red Bull Summer Edition Sugarfree": 80,
    "Red Bull Spring Edition": 80
};

drinkSelect.addEventListener("change", function() {

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

function saveDrinks() {
    localStorage.setItem(
        "energyDrinks",
        JSON.stringify(savedDrinks)
    );
}

addDrinkButton.addEventListener("click", function() {

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
    drinkItem.className = "drink";

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

            saveDrinks();

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

    saveDrinks();
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

const yesterday = new Date();

yesterday.setDate(yesterday.getDate() - 1);

const historyGroups = {};

savedDrinks.slice().reverse().forEach(function(drink) {

    totalDrinkCount++;
    totalCaffeineAllTime += drink.caffeine;

    const drinkDateObject = new Date(drink.date);
    const drinkDate = drinkDateObject.toDateString();

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
    }

    if (!historyGroups[drinkDate]) {
        historyGroups[drinkDate] = [];
    }

    historyGroups[drinkDate].push(drink);
});

Object.keys(historyGroups).forEach(function(date) {

    const dateHeader = document.createElement("h3");

    if (date === today) {
        dateHeader.textContent = "Today";
    } else if (date === yesterday.toDateString()) {
        dateHeader.textContent = "Yesterday";
    } else {
        dateHeader.textContent = new Date(date).toLocaleDateString();
    }

    drinkList.appendChild(dateHeader);

    historyGroups[date].forEach(function(drink) {

        const drinkItem = document.createElement("div");

        drinkItem.className = "drink";

        drinkItem.textContent =
            `${drink.name} - ${drink.caffeine} mg caffeine - ${new Date(drink.date).toLocaleTimeString()}`;

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            const index = savedDrinks.indexOf(drink);

            if (index !== -1) {
                savedDrinks.splice(index, 1);

                saveDrinks();

                location.reload();
            }
        });

        drinkItem.appendChild(deleteButton);

        drinkList.appendChild(drinkItem);
    });
});

drinkCount.textContent = numberOfDrinks;
totalCaffeine.textContent = caffeineTotal;

weekDrinkCountElement.textContent = weekDrinkCount;
weekCaffeineElement.textContent = weekCaffeine;

monthDrinkCountElement.textContent = monthDrinkCount;
monthCaffeineElement.textContent = monthCaffeine;

totalDrinkCountElement.textContent = totalDrinkCount;
totalCaffeineAllTimeElement.textContent = totalCaffeineAllTime;

if (caffeineTotal === 0) {
    caffeineMessage.textContent = "It looks like you dont want energy today.";
} else if (caffeineTotal < 100) {
    caffeineMessage.textContent = "Just getting started, huh?";
} else if (caffeineTotal < 200) {
    caffeineMessage.textContent = "You're working on something right now, arent you?";
} else {
    caffeineMessage.textContent = "Either youre a gym rat, working on something big or you just refuse sleep. Maybe consider stopping for today.";
}

const resetDrinksButton = document.getElementById("resetDrinks");

resetDrinksButton.addEventListener("click", function() {

    const confirmed = confirm("Are you sure you want to delete all saved drinks?");

    if (!confirmed) {
        return;
    }

    localStorage.removeItem("energyDrinks");

    location.reload();
});
