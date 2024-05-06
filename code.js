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
  bot,
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
  visualwalls,
  findway,
  show_way,
  appearence_bot,
  bot_shot,
} from "./functions.js";

//#######################################################################################################

let sound_on = true;
// document.getElementById('stopButton').addEventListener('click', () => {
//     document.querySelectorAll('audio').forEach(el => el.pause());
//   });



let already = false;
document.onkeydown = function checkKeycode(event){

  if(event.code == "Enter" && !already){
    already = true;
    document.querySelector(".outStart").innerHTML = '';
    
    let use_bot = false;
    let ub1 = localStorage.getItem("ub1");
    let ub2 = localStorage.getItem("ub2");
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
    let bot_way1 = []
    let bot_way2 = []
    box.last = new Date();

    hello.play();
    hello.onended = function () {
      background.play();
    };
    
    
    ///setmap1(map.walls_goriz, map.walls_vert, brick_white);
    
    setmap(map, brick_white, file_map);
    
    setbullet(tank1, bullet);
    setbullet(tank2, bullet);
    
    if(use_bot){
      bot.dx = 1 * localStorage.getItem("Tspeed");
      bot.dy = 1 * localStorage.getItem("Tspeed");
      bot.bullet_max = 1 * localStorage.getItem("ars");
      setbullet(bot, bullet);
    }
    
    tank1.x = map.wall[5][2].x + map.wall[5][2].width/2 - tank1.width/2;
    tank1. y = map.wall[5][2].y + map.wall[5][2].height/2 - tank1.height/2;
    tank2.x = map.wall[5][23].x + map.wall[5][23].width/2 - tank2.width/2;
    tank2. y = map.wall[5][23].y + map.wall[5][23].height/2 - tank2.height/2;
    bot.x = map.wall[5][2].x + map.wall[5][2].width/2 - tank1.width/2;
    bot.y = map.wall[5][2].y + map.wall[5][2].height/2 - tank1.height/2
    tank1.sx = tank1.x;
    tank1.sy = tank1.y;
    tank2.sx = tank2.x;
    tank2.sy = tank2.y;
    bot.sx = bot.x;
    bot.sy = bot.y;
    bot.last_centre_time = new Date()
    tank1.last_centre_time = new Date()
    tank2.last_centre_time = new Date()
    
    //########################################################################################################
    
    console.log(map)
    function render() {
        time = new Date();
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        visualwalls(map);
        move1(tank2, tank1, map, box);
        move1(tank1, tank2, map, box);
        
        //    ctx.drawImage(brick_brown.image, 700, 500, brick_brown.width, brick_brown.height);
        //    drawCage(cage);
        ////      drawRect(rect);
        //    drawPoint(point);
        //    drawOut(out);
        //   ctx.drawImage(box.image_sh, tank1.x + tank1.width / 2 - box.width_sh / 2, tank1.y + tank1.height / 2 - box.height_sh / 2, box.width_sh, box.height_sh)
        //    ctx.drawImage(kust.image, kust.x, kust.y, kust.width, kust.height);
        //    pointStatus(point, mouse);
        
        if(ub1 == 'false'){
            appearence1(tank1, last(push1, pusheri));
            time1 = shot(pressed["KeyQ"], tank1, time, time1, dt);
        } else {
            bot_way1 = findway(tank1, tank2, map);
            show_way(bot_way1, map);
            appearence_bot(tank1, bot_way1, map, time, dt);
            time1 = bot_shot(bot_way1, tank2, map, tank1, time, time1, dt);
        }
        if(ub2 == 'false'){
            appearence2(tank2, last(push2, pusherj));
            time2 = shot(pressed["Space"], tank2, time, time2, dt);
        } else {
            bot_way2 = findway(tank2, tank1, map);
            show_way(bot_way2, map);
            appearence_bot(tank2, bot_way2, map, time, dt);
            time2 = bot_shot(bot_way2, tank1, map, tank2, time, time2, dt);
        }
        ctx.drawImage(tank1.image, tank1.x, tank1.y, tank1.width, tank1.height);
        ctx.drawImage(tank2.image, tank2.x, tank2.y, tank2.width, tank2.height);
        
        
        
        bulletflight(tank1, tank2, map, winner, box, time, sound, sound_on);
        bulletflight(tank2, tank1, map, winner, box, time, sound, sound_on);
        move_box(box, time, map, tank2, tank1);
        document.querySelector(".outRed").innerHTML = tank2.points;
        document.querySelector(".outBlue").innerHTML = tank1.points;

   
        console.log(sound.on)
        //    move2(tank2, pressed, brick_white, a, b, c, d);
        //    inside(tank1, brick_white, a, b, c, d);
        //    inside(tank2, brick_white, a, b, c, d);
        ////    function small(){rect.height = 0; rect.width = 0;}
        ////    if(winner.who = 'red'){rect.height = 100; rect.width = 100; setTimeout(small, 5000);}
        ////    if(winner.who = 'blue'){rect.height = 100; rect.width = 100; setTimeout(small, 5000);}
        box.see ? ctx.drawImage(box.image, box.x, box.y, box.width, box.height) : 0;
    
      window.requestAnimationFrame(render);
    }
    window.requestAnimationFrame(render);
  }
}






//    ctx.drawImage(brick_brown.image, 700, 500, brick_brown.width, brick_brown.height);
//    drawCage(cage);
////      drawRect(rect);
//    drawPoint(point);
//    drawOut(out);
//   ctx.drawImage(box.image_sh, tank1.x + tank1.width / 2 - box.width_sh / 2, tank1.y + tank1.height / 2 - box.height_sh / 2, box.width_sh, box.height_sh)
//    ctx.drawImage(kust.image, kust.x, kust.y, kust.width, kust.height);
//    pointStatus(point, mouse);




/*
      time = new Date();
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      
      //    ctx.drawImage(brick_brown.image, 700, 500, brick_brown.width, brick_brown.height);
      //    drawCage(cage);
      ////      drawRect(rect);
      //    drawPoint(point);
      //    drawOut(out);
      visualwalls(map);
    
      
      //   ctx.drawImage(box.image_sh, tank1.x + tank1.width / 2 - box.width_sh / 2, tank1.y + tank1.height / 2 - box.height_sh / 2, box.width_sh, box.height_sh)
      //    ctx.drawImage(kust.image, kust.x, kust.y, kust.width, kust.height);
      //    pointStatus(point, mouse);
      
      if(use_bot == "false"){
        ctx.drawImage(tank1.image, tank1.x, tank1.y, tank1.width, tank1.height);
        ctx.drawImage(tank2.image, tank2.x, tank2.y, tank2.width, tank2.height);
        appearence1(tank1, last(push1, pusheri));
        appearence2(tank2, last(push2, pusherj));
        move1(tank1, tank2, map, box);
        move1(tank2, tank1, map, box);
        time1 = shot(pressed["KeyQ"], tank1, time, time1, dt);
        time2 = shot(pressed["Space"], tank2, time, time2, dt);
        move_box(box, time, map, tank1, tank2);
        bulletflight(tank1, tank2, map, winner, box, time, sound);
        bulletflight(tank2, tank1, map, winner, box, time, sound);
        document.querySelector(".outBlue").innerHTML = tank1.points;
        document.querySelector(".outRed").innerHTML = tank2.points;
      } else {
        bot_way = findway(bot, tank2, map);
        show_way(bot_way, map);
        ctx.drawImage(tank2.image, tank2.x, tank2.y, tank2.width, tank2.height);
        ctx.drawImage(bot.image, bot.x, bot.y, bot.width, bot.height);
        appearence2(tank2, last(push2, pusherj));
        appearence_bot(bot, bot_way, map, time, dt);
        move1(tank2, bot, map, box);
        move1(bot, tank2, map, box);
        time1 = shot(pressed["Space"], tank2, time, time1, dt);
        time2 = bot_shot(bot_way, tank2, map, bot, time, time2, dt);
        move_box(box, time, map, tank2, bot);
        bulletflight(tank2, bot, map, winner, box, time, sound);
        bulletflight(bot, tank2, map, winner, box, time, sound);
        document.querySelector(".outRed").innerHTML = tank2.points;
        document.querySelector(".outBlue").innerHTML = bot.points;
      }
    
      box.see ? ctx.drawImage(box.image, box.x, box.y, box.width, box.height) : 0;
      //    move2(tank2, pressed, brick_white, a, b, c, d);
      //    inside(tank1, brick_white, a, b, c, d);
      //    inside(tank2, brick_white, a, b, c, d);
      ////    function small(){rect.height = 0; rect.width = 0;}
      ////    if(winner.who = 'red'){rect.height = 100; rect.width = 100; setTimeout(small, 5000);}
      ////    if(winner.who = 'blue'){rect.height = 100; rect.width = 100; setTimeout(small, 5000);}
    
      window.requestAnimationFrame(render);
    }
    window.requestAnimationFrame(render);
  }
*/