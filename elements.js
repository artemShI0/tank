const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export let cage = {
  up: {
    x: 150,
    y: 100,
    width: 600,
    height: 15,
    color: "orange",
    dx: 1,
    dy: 1,
  },
  right: {
    x: 750,
    y: 100,
    width: 15,
    height: 300,
    color: "orange",
    dx: 1,
    dy: 1,
  },
  down: {
    x: 150,
    y: 400,
    width: 615,
    height: 15,
    color: "orange",
    dx: 1,
    dy: 1,
  },
  left: {
    x: 150,
    y: 100,
    width: 15,
    height: 300,
    color: "orange",
    dx: 1,
    dy: 1,
  },
};

export let rect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  color: "orange",
  dx: 1,
  dy: 1,
};

export let point = {
  x: 100,
  y: 100,
  radius: 20,
  color: "red",
  dx: 1,
  dy: 1,
};

export let mouse = {
  x: 0,
  y: 0,
  pressed: false,
};

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
});

canvas.addEventListener("mousedown", function (event) {
  mouse.pressed = true;
});

canvas.addEventListener("mouseup", function (event) {
  mouse.pressed = false;
});

//#######################################################################################################################################

export const pressed = {};
export let push1 = [];
export let push2 = [];

function eraser(arr, s) {
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] == s) {
      arr[i] = undefined;
    }
  }
}

export function last(arr, fr) {
  for (let i = fr; i >= 0; --i) {
    if (arr[i]) {
      return arr[i];
    }
  }
  for (let i = arr.length - 1; i > fr; --i) {
    if (arr[i]) {
      return arr[i];
    }
  }
}

export let pusheri = 0;
export let pusherj = 0;
document.addEventListener("keydown", function (event) {
  pressed[event.code] = true;
  if (pusheri == 1000) {
    pusheri -= 1000;
  }
  if (pusherj == 1000) {
    pusherj -= 1000;
  }
  if (
    event.code == "KeyW" ||
    event.code == "KeyD" ||
    event.code == "KeyS" ||
    event.code == "KeyA"
  ) {
    push1[pusheri] = event.code;
    ++pusheri;
  }
  if (
    event.code == "ArrowUp" ||
    event.code == "ArrowRight" ||
    event.code == "ArrowDown" ||
    event.code == "ArrowLeft"
  ) {
    push2[pusherj] = event.code;
    ++pusherj;
  }
});

document.addEventListener("keyup", function (event) {
  pressed[event.code] = false;
  if (
    event.code == "KeyW" ||
    event.code == "KeyD" ||
    event.code == "KeyS" ||
    event.code == "KeyA"
  ) {
    eraser(push1, event.code);
  }
  if (
    event.code == "ArrowUp" ||
    event.code == "ArrowRight" ||
    event.code == "ArrowDown" ||
    event.code == "ArrowLeft"
  ) {
    eraser(push2, event.code);
  }
});

//#######################################################################################################################################

const image1 = new Image();
const image2 = new Image();
const image3 = new Image();
const image4 = new Image();
const image5 = new Image();
const image6 = new Image();
const image7 = new Image();
const image8 = new Image();
const image9 = new Image();
const image10 = new Image();
const image11 = new Image();
const image12 = new Image();
const image13 = new Image();
const image14 = new Image();
const image15 = new Image();
const image16 = new Image();
const image17 = new Image();
const image18 = new Image();

let costumes1 = [new Image(), new Image(), new Image(), new Image()];

let costumes2 = [new Image(), new Image(), new Image(), new Image()];

let costumes3 = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
];

let costumes4 = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
];

export let tank1 = {
  name: "blue",
  costumes: costumes1,
  x: 170,
  y: 325,
  sx: 170,
  sy: 325,
  width: 40,
  height: 40,
  dx: 5,
  dy: 5,
  direction: 1,
  direct: 1,
  bullet_max: 4,
  points: 0,
  live: 3,
  numb: 1,
};

export let tank2 = {
  name: "red",
  costumes: costumes2,
  x: 1300,
  y: 325,
  sx: 1300,
  sy: 325,
  width: 40,
  height: 40,
  dx: 5,
  dy: 5,
  direction: 3,
  direct: 1,
  bullet_max: 4,
  points: 0,
  live: 3,
  numb: 2,
};

export let bot = {
  name: "red",
  costumes: costumes2,
  x: 1300,
  y: 325,
  sx: 1300,
  sy: 325,
  width: 40,
  height: 40,
  dx: 5,
  dy: 5,
  direction: 3,
  direct: 1,
  bullet_max: 4,
  points: 0,
  live: 3,
  numb: 2,
};

export let kust = {
  x: 500,
  y: 200,
  width: 120,
  height: 100,
  dx: 10,
  dy: 10,
};

export let brick_brown = {
  width: 40,
  height: 40,
};

export let brick_white = {
  width: 50,
  height: 50,
  is: true,
};

brick_white.crush1;
brick_white.crush2;
brick_white.is;

export let out = {
  up: {
    x: 150,
    y: 100,
    width: 600,
    height: 15,
  },
  right: {
    x: 750,
    y: 100,
    width: 15,
    height: 300,
  },
  down: {
    x: 150,
    y: 400,
    width: 615,
    height: 15,
  },
  left: {
    x: 150,
    y: 100,
    width: 15,
    height: 300,
  },
  up: 0,
  down: 0,
  left: 0,
  right: 0,
};

export let bullet = {
  costumes: costumes3,
  booms: costumes4,
  dx: 20,
  dy: 20,
  see: false,
  costume_i: 0,
};

export let box = {
  x: 500,
  y: 400,
  width: 50,
  height: 50,
  dx: 1,
  width_b: 50,
  height_b: 50,
  width_sh: 70,
  height_sh: 70,
  dy: 1,
  see: false,
  dt: 10000,
  at: 5000,
  start: 0,
  own: 0,
};

export let map = {
  wall: [],
  blue_i: 0,
  red_i: 0,
  number: 0,
  is: false,
  image1: {
    width: 400,
    height: 200,
    sy: 200,
    sx: 250,
  },
  image2: {
    width: 400,
    height: 200,
    sy: 200,
    sx: 900,
  },
};

tank1.image = image1;
tank2.image = image2;
bot.image = image2;
kust.image = image3;
out.image = image4;
brick_brown.image = image5;
brick_white.image = image6;
brick_white.white = image6;
brick_white.dark = image17;
brick_white.blue = image8;
brick_white.red = image9;
brick_white.crush1 = image12;
brick_white.crush2 = image13;
brick_white.crush3 = image14;
bullet.image = costumes3[2];
map.image1.image = image10;
map.image2.image = image11;
box.image = image15;
box.image_b = image15;
box.image_sh = image16;
brick_white.red_dark = image18;


image7.src = "./trash_img/bullet.png";
image4.src = "./trash_img/wall.png";
image3.src = "./trash_img/kust.png";
image1.src = "./images/blue1.png";
image2.src = "./images/red3.png";
image5.src = "./images/brick_brown.png";
image6.src = "./images/brick_white.png";
image8.src = "./images/brick_blue.jpg";
image9.src = "./images/brick_red.jpg";
image10.src = "./images/pole1.jpg";
image11.src = "./images/pole2.jpg";
image12.src = "./images/brick_white_1.jpg";
image13.src = "./images/brick_white_2.jpg";
image14.src = "./images/brick_white_3.jpg";
image15.src = "./images/box.png";
image16.src = "./images/sheld.png";
image17.src = "./images/brick_white_dark.png";
image18.src = "./images/brick_red_dark.jpg";

export let wall_goriz = {
  x: 150,
  y: 100,
  dx: brick_white.width * 5,
  dy: brick_white.height,
  bricks: [],
};

export let wall_vert = {
  x: 150,
  y: 100,
  dx: brick_white.width,
  dy: brick_white.height * 5,
  bricks: [],
};

export let chooser = {
  rect1: {
    color: "green",
    x: 395,
    y: 190,
    width: 280,
    height: 280,
  },
  rect2: {
    color: "green",
    x: 855,
    y: 190,
    width: 280,
    height: 280,
  },
  one: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  two: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
};

{
  costumes1[0].src = "./images/blue0.png";
  costumes1[1].src = "./images/blue1.png";
  costumes1[2].src = "./images/blue2.png";
  costumes1[3].src = "./images/blue3.png";
}
{
  costumes2[0].src = "./images/red0.png";
  costumes2[1].src = "./images/red1.png";
  costumes2[2].src = "./images/red2.png";
  costumes2[3].src = "./images/red3.png";
}
{
  costumes3[0].src = "./images/bullet0.png";
  costumes3[1].src = "./images/bullet1.png";
  costumes3[2].src = "./images/bullet2.png";
  costumes3[3].src = "./images/bullet3.png";
  costumes3[4].src = "./images/boom0.png";
}
{
  costumes4[0].src = "./images/boom0.png";
  costumes4[1].src = "./images/boom1.png";
  costumes4[2].src = "./images/boom2.png";
  costumes4[3].src = "./images/boom3.png";
  costumes4[4].src = "./images/boom4.png";
  costumes4[5].src = "./images/boom5.png";
  costumes4[6].src = "./images/boom6.png";
}
