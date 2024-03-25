const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const hello = document.getElementById("music");
const explosion = document.getElementById("explosion");
const piu = document.getElementById("piu");
const background = document.getElementById("background");
import {
  cage,
  rect,
  point,
  mouse,
  pressed,
  tank1,
  tank2,
  kust,
  out,
  brick_white,
  brick_brown,
  bullet,
  map,
  push1,
  push2,
  last,
  pusheri,
  pusherj,
  box,
} from "./elements.js";

import {
  drawPoint,
  drawRect,
  inside,
  pointStatus,
  drawCage,
  move1,
  move2,
  drawOut,
  appearence1,
  appearence2,
  bulletset,
  bulletgo,
  drawwalls,
  setmap1,
  setmap2,
  touch,
  setbullet,
  shot,
  bulletflight,
  picture_catch,
  read,
  read_line,
  setmap,
  move_box,
  touch_box,
} from "./functions.js";

//#######################################################################################################

tank1.dx = 1 * localStorage.getItem("Tspeed");
tank1.dy = 1 * localStorage.getItem("Tspeed");
tank2.dx = 1 * localStorage.getItem("Tspeed");
tank2.dy = 1 * localStorage.getItem("Tspeed");
tank1.bullet_max = 1 * localStorage.getItem("ars");
tank2.bullet_max = 1 * localStorage.getItem("ars");
let dt = localStorage.getItem("freq");
bullet.dx = 1 * localStorage.getItem("Bspeed");
bullet.dy = 1 * localStorage.getItem("Bspeed");
let file_map = localStorage.getItem("file_map");
let winner = {};
let time;
let time1 = 0;
let time2 = 0;
let a = 10;
let b = 10;
let c = (700 / brick_white.height - 1) * brick_white.height - 5;
let d = (1530 / brick_white.width - 1) * brick_white.width - 15;
box.last = new Date();
let sound = {
  hello: hello,
  explosion: explosion,
  piu: piu,
};
hello.onended = function () {
  background.play();
};
background.onended = function () {
  background.play();
};
background.onpause = function () {
  background.play();
};

///setmap1(map.walls_goriz, map.walls_vert, brick_white);
setbullet(tank1, bullet);
setbullet(tank2, bullet);

setmap(map.walls_goriz, map.walls_vert, brick_white, file_map);
//########################################################################################################

function render() {
  time = new Date();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //    ctx.drawImage(brick_brown.image, 700, 500, brick_brown.width, brick_brown.height);
  //    drawCage(cage);
  ////      drawRect(rect);
  //    drawPoint(point);
  //    drawOut(out);
  drawwalls(map.walls_goriz, map.walls_vert);
  ctx.drawImage(tank1.image, tank1.x, tank1.y, tank1.width, tank1.height);
  ctx.drawImage(tank2.image, tank2.x, tank2.y, tank2.width, tank2.height);

  //   ctx.drawImage(box.image_sh, tank1.x + tank1.width / 2 - box.width_sh / 2, tank1.y + tank1.height / 2 - box.height_sh / 2, box.width_sh, box.height_sh)
  //    ctx.drawImage(kust.image, kust.x, kust.y, kust.width, kust.height);
  //    pointStatus(point, mouse);
  appearence1(tank1, last(push1, pusheri));
  appearence2(tank2, last(push2, pusherj));
  move1(tank1, tank2, map, box);
  move1(tank2, tank1, map, box);
  box.see ? ctx.drawImage(box.image, box.x, box.y, box.width, box.height) : 0;
  move_box(box, time, map, tank1, tank2);
  //    move2(tank2, pressed, brick_white, a, b, c, d);
  //    inside(tank1, brick_white, a, b, c, d);
  //    inside(tank2, brick_white, a, b, c, d);

  time1 = shot(pressed["KeyQ"], tank1, time, time1, dt);
  time2 = shot(pressed["Space"], tank2, time, time2, dt);
  bulletflight(tank1, tank2, map, winner, box, time, sound);
  bulletflight(tank2, tank1, map, winner, box, time, sound);
  document.querySelector(".outBlue").innerHTML = tank1.points;
  document.querySelector(".outRed").innerHTML = tank2.points;

  ////    function small(){rect.height = 0; rect.width = 0;}
  ////    if(winner.who = 'red'){rect.height = 100; rect.width = 100; setTimeout(small, 5000);}
  ////    if(winner.who = 'blue'){rect.height = 100; rect.width = 100; setTimeout(small, 5000);}

  window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
