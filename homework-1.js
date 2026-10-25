const readline = require('node:readline/promises');

function ticketPrice(category) {
  let price = 0;

  switch (category) {
    case 1:
      price = 300;
      break;
    case 2:
      price = 500;
      break;
    case 3:
      price = 900;
      break;
  }

  return price;
}

function maxTickets(budget, price) {
  let ticket = 0;

  while (budget >= price) {
    budget -= price;
    ticket += 1;
  }

  return ticket;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);

  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }

  const ticketCount = maxTickets(budget, price);

  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${ticketCount} шт.`);
}

function deliveryPrice(distance, total) {
  if (total >= 3000 || distance <= 3) {
    return 0;
  }

  if (distance <= 10) {
    return 200;
  }

  return 200 + (25 * (distance - 10));
}

function printDelivery(distance, total) {
  const cost = deliveryPrice(distance, total);

  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${cost} руб.`);
}

function printSteps(height) {
  let builtSteps = 0;

  for (let step = 1; step <= height; step++) {
    if (step === 4) {
      continue;
    }

    console.log(`Ступень ${step}`);
    builtSteps++;

    if (step === 10) {
      console.log('Дальше лестница не построена');
      break;
    }
  }

  console.log(`Всего построено: ${builtSteps}`);
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log('Выберите задачу:');
  console.log('1 — билетная касса');
  console.log('2 — доставка заказа');
  console.log('3 — лестница');

  const action = Number(await rl.question('Ваш выбор: '));

  switch (action) {
    case 1: {
      const category = Number(await rl.question('Категория билета: '));
      const budget = Number(await rl.question('Бюджет: '));
      printTicketResult(category, budget);
      break;
    }
    case 2: {
      const distance = Number(await rl.question('Расстояние: '));
      const total = Number(await rl.question('Сумма заказа: '));
      printDelivery(distance, total);
      break;
    }
    case 3: {
      const height = Number(await rl.question('Высота лестницы: '));
      printSteps(height);
      break;
    }
    default:
      console.log('такой задачи нет');
  }

  rl.close();
}

main();