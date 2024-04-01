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
  setmap,
  setmap1,
  setmap2,
  setmap3,
  setmap4,
  touch,
  setbullet,
  shot,
  bulletflight,
  picture_catch,
  read,
  read_line,
  move_box,
  touch_box,
  to_file,
  input,
  visualwalls,
} from "./functions.js";

//#######################################################################################################
let shape = '11111111111111111111111111' + '\r' + '\n' + '11111111111111111111111111' + '\r' + '\n' + '11111111111111111111111111' + '\r' + '\n'
shape += '11111111111111111111111111' + '\r' + '\n' + '11111111111111111111111111' + '\r' + '\n'
shape += '11111111111111111111111111' + '\r' + '\n' + '11111111111111111111111111' + '\r' + '\n'
shape += '11111111111111111111111111' + '\r' + '\n' + '11111111111111111111111111' + '\r' + '\n' 
shape += '11111111111111111111111111' + '\r' + '\n' + '11111111111111111111111111' + '\r' + '\n' + '11111111111111111111111111' + '\r' + '\n' + 'end;'

let text = "";
let myBrick = Object.assign({}, brick_white);
myBrick.width /= 2;
myBrick.height /= 2;

let map = {
  wall: []
};
let file_map = "2, 610, 360, 0,\nend;";
let dt = 300;
let time0 = 0;
//setmap(map.walls_goriz, map.walls_vert, brick_white, file_map);
setmap4(map, myBrick, shape);

for (let i = 1; i < map.wall.length - 1; ++i) {
  for (let j = 1; j < map.wall[i].length - 1; ++j) {
    map.wall[i][j].use = 0;
    map.wall[i][j].image = map.wall[i][j].dark;
  }
}

function generClick() {
  text = input(map);
}

//########################################################################################################

function render() {
  let time = new Date();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  visualwalls(map);

  if (mouse.pressed && time - time0 > dt) {
    for (let i = 1; i < map.wall.length - 1; ++i) {
      for (let j = 1; j < map.wall[i].length - 1; ++j) {
        if (
          mouse.x > map.wall[i][j].x &&
          mouse.x < map.wall[i][j].x + myBrick.width &&
          mouse.y > map.wall[i][j].y &&
          mouse.y < map.wall[i][j].y + myBrick.width
        ) {
          if (
            !((i == 5 || i == 6) && (j == 0 || j == 1 || j == 23 || j == 24))
          ) {
            if (map.wall[i][j].use) {
              map.wall[i][j].image = map.wall[i][j].dark;
              map.wall[i][j].use = 0;
            } else {
              map.wall[i][j].image = map.wall[i][j].white;
              map.wall[i][j].use = 1;
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
