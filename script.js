const cells = 31;

// From 0.001 to 100
const items = [
  {name: 'Vkinka', img: 'IMG/case/snusik.png', chance: 5},
  {name: 'cigone', img: 'IMG/case/cigone.png', chance: 10},
  {name: 'xylinet', img: 'IMG/case/xylinet.png', chance: 15},
  {name: 'Pika', img: 'IMG/case/pika.png', chance: 16},
  {name: '1500ballov', img: 'IMG/case/1500ballov.png', chance: 0.01},
  {name: 'achonet', img: 'IMG/case/achonet.png', chance: 17},
  {name: '100ballov', img: 'IMG/case/100ballov.png', chance: 35},
  {name: '50ballov', img: 'IMG/case/50ballov.png', chance: 45}
];

// const items = [
//     {name: 'Pika', img: 'IMG/case/pika.png', chance: 6},
//     {name: 'cigone', img: 'IMG/case/cigone.png', chance: 8},
//     {name: 'Vkinka', img: 'IMG/case/snusik.png', chance: 10},
//     {name: 'xylinet', img: 'IMG/case/xylinet.png', chance: 7},
//     {name: '100ballov', img: 'IMG/case/100ballov.png', chance: 20},
//     {name: 'lose', img: 'IMG/case/lose.png', chance: 20},
//     {name: '1500ballov', img: 'IMG/case/1500ballov.png', chance: 1},
//     {name: '50ballov', img: 'IMG/case/50ballov.png', chance: 25},
//     {name: 'achonet', img: 'IMG/case/achonet.png', chance: 11}

function getItem() {
  let item;

  while (!item) {
    const chance = Math.floor(Math.random() * 100);

    items.forEach((elm) => {
      if (chance < elm.chance && !item) item = elm;
    });
  }

  return item;
}

function generateItems() {
  document.querySelector(".list").remove();
  document.querySelector(".scope").innerHTML = `
    <ul class="list"></ul>
  `;

  const list = document.querySelector(".list");

  for (let i = 0; i < cells; i++) {
    const item = getItem();

    const li = document.createElement("li");
    li.setAttribute("data-item", JSON.stringify(item));
    li.classList.add("list__item");
    li.innerHTML = `
      <img src="${item.img}" alt="" />
    `;

    list.append(li);
  }
}

generateItems();

let isStarted = false;
let isFirstStart = true;

function start() {
  // if (getCookie("attempt").includes("played")) {
  //   console.log(getCookie("attempt"));
  //   return;
  // }

  if (isStarted) return;
  else isStarted = true;

  if (!isFirstStart) generateItems();
  else isFirstStart = false;
  const list = document.querySelector(".list");

  setTimeout(() => {
    list.style.left = "50%";
    list.style.transform = "translate3d(-50%, 0, 0)";
  }, 0);

  const item = list.querySelectorAll("li")[15];

  list.addEventListener(
    "transitionend",
    () => {
      isStarted = false;
      item.classList.add("active");
      const data = JSON.parse(item.getAttribute("data-item"));

      console.log(data);
      confetti.render();
    },
    { once: true }
  );

  document.getElementById("start-button").style.background = "#ffffff1c";
  document.getElementById("start-button").style.cursor = "not-allowed";
  document.getElementById("start-button").disabled = true;

  // Confetti
  var confettiSettings = { target: "confetti" };
  var confetti = new ConfettiGenerator(confettiSettings);

  setTimeout(() => {
    document.getElementById("start-button").style.background = "#13161a";
    document.getElementById("start-button").style.cursor = "pointer";
    document.getElementById("start-button").disabled = false;
    confetti.clear();
  }, 20 * 1000);

  setTimeout(() => {
    // document.getElementById("confetti").style.zIndex = "100000";
  }, 4700);
}
