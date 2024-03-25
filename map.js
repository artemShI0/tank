const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("gener").onclick = generClick; // связь с кнопкой give

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
  setmap3,
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
  to_file,
} from "./functions.js";

//#######################################################################################################

let text = "";
let myBrick = Object.assign({}, brick_white);
myBrick.width /= 2;
myBrick.height /= 2;

let map = {
  walls_goriz: [],
  walls_vert: [],
};
let file_map = "2, 610, 360, 0,\nend;";
let dt = 300;
let time0 = 0;
//setmap(map.walls_goriz, map.walls_vert, brick_white, file_map);
setmap3(map.walls_goriz, map.walls_vert, myBrick);

for (let i = 1; i < map.walls_goriz.length - 1; ++i) {
  for (let j = 0; j < map.walls_goriz[i].length; ++j) {
    map.walls_goriz[i][j].use = 0;
    map.walls_goriz[i][j].image = map.walls_goriz[i][j].dark;
  }
}

function generClick() {
  text = to_file(map);
}

//########################################################################################################

function render() {
  let time = new Date();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawwalls(map.walls_goriz, map.walls_vert);

  if (mouse.pressed && time - time0 > dt) {
    for (let i = 1; i < map.walls_goriz.length - 1; ++i) {
      for (let j = 0; j < map.walls_goriz[i].length; ++j) {
        if (
          mouse.x > map.walls_goriz[i][j].x &&
          mouse.x < map.walls_goriz[i][j].x + myBrick.width &&
          mouse.y > map.walls_goriz[i][j].y &&
          mouse.y < map.walls_goriz[i][j].y + myBrick.width
        ) {
          if (
            !((i == 5 || i == 6) && (j == 0 || j == 1 || j == 22 || j == 23))
          ) {
            if (map.walls_goriz[i][j].use) {
              map.walls_goriz[i][j].image = map.walls_goriz[i][j].dark;
              map.walls_goriz[i][j].use = 0;
            } else {
              map.walls_goriz[i][j].image = map.walls_goriz[i][j].white;
              map.walls_goriz[i][j].use = 1;
            }
            time0 = time;
          }
          // else {
          //    alert("нельзя ставить стену на эту позицию")
          // }
        }
      }
    }
  }

  document.querySelector(".outText").innerHTML = text;

  window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
