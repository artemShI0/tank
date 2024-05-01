const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


export function drawPoint(point) {
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, point.radius, point.radius, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fillStyle = point.color;
    ctx.fill();
}

export function drawRect(rect) {
    ctx.beginPath();
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.fill();
}

export function drawCage(cage) {
    drawRect(cage.up);
    drawRect(cage.right);
    drawRect(cage.down);
    drawRect(cage.left);
}


//###########################################################################################################################################
//###########################################################################################################################################

function inside2(obj1, obj2){
    if(obj1.x + obj1.width/2 >= obj2.x && obj1.x + obj1.width/2 <= obj2.x + obj2.width && obj1.y + obj1.height/2 >= obj2.y && obj1.y + obj1.height/2 <= obj2.y + obj2.height){
        return true;
    }
    return false;
}

export function touch(map, tankA, tankB, box){
    let pink = 0;
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(map.wall[i][j].is){
                if(tankA.x + tankA.width > map.wall[i][j].x && tankA.x < map.wall[i][j].x + map.wall[i][j].dx && 
                    tankA.y + tankA.height > map.wall[i][j].y && tankA.y < map.wall[i][j].y + map.wall[i][j].dy){
                    if(tankA && map.wall[i][j].status != 3 && map.wall[i][j].main == false){
                        map.wall[i][j].image = map.wall[i][j].crush[map.wall[i][j].status];
                    }
                    if(map.wall[i][j].status != 3){
                        pink = 1;
                    }
                }
            }
        }
    }
    if(tankA.x + tankA.height > tankB.x && tankA.x < tankB.x + tankB.width && tankA.y + tankA.height> tankB.y && tankA.y < tankB.y + tankB.height){pink = 2}
    return pink;
}

export function touch_bullet(map, tankB, bullet, box){
    let pink = {};
    pink.touch = 0;
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(map.wall[i][j].is){
                if(bullet.x + bullet.width > map.wall[i][j].x && bullet.x < map.wall[i][j].x + map.wall[i][j].dx && 
                    bullet.y + bullet.height > map.wall[i][j].y && bullet.y < map.wall[i][j].y + map.wall[i][j].dy){
                        if(map.wall[i][j].status != 3){
                            pink.touch = true;
                        }
                        if(bullet.costume_i == 0 && map.wall[i][j].status != 3 && map.wall[i][j].main == false){
                            map.wall[i][j].status++;
                            map.wall[i][j].image = map.wall[i][j].crush[map.wall[i][j].status];
                        }
                }
            }
        }
    }
    if(bullet.x + bullet.width > tankB.x && bullet.x < tankB.x + tankB.width && bullet.y + bullet.height> tankB.y && bullet.y < tankB.y + tankB.height){pink.touch = true; pink.what = tankB.name}
    if(bullet.x + bullet.width > tankB.x && bullet.x < tankB.x + tankB.width && bullet.y + bullet.height> tankB.y && bullet.y < tankB.y + tankB.height){pink.touch = true; pink.what = tankB.name}
    
    else{pink.name = 0;}
    return pink;
}




export function touch_box(box, map){
    let pink = {};
    pink.touch = 0;
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(map.wall[i][j].is){
                if(box.x + box.width > map.wall[i][j].x && box.x < map.wall[i][j].x + map.wall[i][j].dx && 
                    box.y + box.height > map.wall[i][j].y && box.y < map.wall[i][j].y + map.wall[i][j].dy){
                        if(map.wall[i][j].status != 3){
                            pink.touch = 1;
                            pink.wall = 1
                        }
                    }
            }
        }
    }
    return pink;
}

//###########################################################################################################################################
//###########################################################################################################################################


export function move1(tank, tankB, map, box) {
    if (tank.direction == 1) {
        tank.x += tank.dx;
        while(touch(map, tank, tankB, box)){
            tank.x -= 1;
        }
    }
    if (tank.direction == 3) {
        tank.x -= tank.dx;
        while(touch(map, tank, tankB, box)){
            tank.x += 1;
        }
    }
    if (tank.direction == 0) {
        tank.y -= tank.dy;
        while(touch(map, tank, tankB, box)){
            tank.y += 1;
        }
    }
    if (tank.direction == 2) {
        tank.y += tank.dy;
        while(touch(map, tank, tankB, box)){
            tank.y -= 1;
        }
    }
}

export function move2(rect, pressed, brick_white, a, b, c, d) {
    if (pressed["ArrowRight"] && rect.x < d - rect.width) {
        rect.x += rect.dx;
    }
    if (pressed["ArrowLeft"] && rect.x > a + brick_white.width) {
        rect.x -= rect.dx;
    }
    if (pressed["ArrowUp"] && rect.y > b - 9 + brick_white.height) {
        rect.y -= rect.dy;
    }
    if (pressed["ArrowDown"] && rect.y < c - rect.height) {
        rect.y += rect.dy;
    }
}





//###########################################################################################################################################
//###########################################################################################################################################

export function inside(rect, brick_white, a, b, c, d) {
    if (rect.x > d - rect.width) {
        rect.x = d - rect.width;
    }
    if (rect.x < a + brick_white.width) {
        rect.x = a + brick_white.width;
    }
    if (rect.y < b  + brick_white.height) {
        rect.y = b  + brick_white.height;
    }
    if (rect.y > c - rect.height) {
       rect.y = c - rect.height;
    }
}

export function pointStatus(point, mouse) {
    point.x = mouse.x;
    point.y = mouse.y;
    if (mouse.pressed) {
        point.color = "blue";
    } else {
        point.color = "red";
    }
}


export function picture_catch(mouse, rect){
    if(mouse.x > rect.sx && mouse.x < rect.sx + rect.width   &&   mouse.y > rect.sy && mouse.y < rect.sy + rect.height   && mouse.pressed){
        return true;
    }
    return false;
}


//###########################################################################################################################################
//###########################################################################################################################################

export function drawOut(wall) {
    ctx.drawImage(wall.image, wall.up.x, wall.up.y, wall.up.width, wall.up.height);
    ctx.drawImage(wall.image, wall.down.x, wall.down.y, wall.down.width, wall.down.height);
    ctx.drawImage(wall.image, wall.left.x, wall.left.y, wall.left.width, wall.left.height);
    ctx.drawImage(wall.image, wall.right.x, wall.right.y, wall.right.width, wall.right.height);
}

//###########################################################################################################################################
//###########################################################################################################################################



export function to_file(map){
    let text = ''
    for(let i = 1; i < map.walls_goriz.length - 1; ++i){
        for(let j = 0; j < map.walls_goriz[i].length; ++j){
            if(map.walls_goriz[i][j].use){
                text += `1, ${(map.walls_goriz[i][j].x - 105 )* 2 + 105}, ${(map.walls_goriz[i][j].y - 200)* 2 + 55}, 1,\n`
            }
        }
    }
    text += "end;";
    return text;
}





export function read_line(line){
    let values = [];
    for(let i = 0; values.length < 3; ++i){
        let S = ''
        for(let j = i; line[j] != ','; ++j, ++i){
            S += line[j];
        }
        values.push(Number(S));
    }
    return values;
}


export function read(text){
    let walls = [];
    let goriz = [];
    let vert = [];

    for(let i = 0; text[i] != 'e' &&  text[i] != 'n' &&  text[i] != 'd'; ++i){
        if(text[i] == 1){
            let S = ''
            for(let j = i + 3; text[j] != '\n'; ++j, ++i){
                S += text[j];
            }
            goriz.push(read_line(S));
            i += 3
        }
        else if(text[i] == 2){
            let S = ''
            for(let j = i + 3; text[j] != '\n'; ++j, ++i){
                S += text[j];
            }
            vert.push(read_line(S));
            i += 3
        }
    }
    walls.push(goriz);
    walls.push(vert);
    return walls;
}


function setwall_goriz(brick_white, x, y, times){
    let wall_goriz = [];
//    x += 100;
//    y += 50;
    for(let i = 0; i < times; ++i){
        wall_goriz[i] = {}
        wall_goriz[i].x = x + i * brick_white.width;
        wall_goriz[i].y = y;
        wall_goriz[i].width = brick_white.width;
        wall_goriz[i].height = brick_white.height;
        wall_goriz[i].dx = brick_white.width;
        wall_goriz[i].dy = brick_white.height;
        wall_goriz[i].image = brick_white.white;
        wall_goriz[i].white = brick_white.white;
        wall_goriz[i].dark = brick_white.dark;
        wall_goriz[i].blue = brick_white.blue;
        wall_goriz[i].red = brick_white.red;
        wall_goriz[i].crush = [brick_white.white, brick_white.crush1, brick_white.crush2, brick_white.crush3];
        wall_goriz[i].status = 0;
        wall_goriz[i].main = false;
        wall_goriz[i].is = true;
    }
    return wall_goriz;
}

function setwall_vert(brick_white, x, y, times){
    let wall_vert = [];
//    x += 100;
//    y += 50;
    for(let i = 0; i < times; ++i){
        wall_vert[i] = {};
        wall_vert[i].x = x;
        wall_vert[i].y = y + i * brick_white.height;
        wall_vert[i].width = brick_white.width;
        wall_vert[i].height = brick_white.height;
        wall_vert[i].dx = brick_white.width;
        wall_vert[i].dy = brick_white.height;
        wall_vert[i].image = brick_white.image;
        wall_vert[i].white = brick_white.white;
        wall_vert[i].dark = brick_white.dark;
        wall_vert[i].blue = brick_white.blue;
        wall_vert[i].red = brick_white.red;
        wall_vert[i].crush = [brick_white.white, brick_white.crush1, brick_white.crush2, brick_white.crush3];
        wall_vert[i].status = 0;
        wall_vert[i].main = false;
    }
    return wall_vert;
}



export function setmap1(walls_goriz, walls_vert, brick_white){
    walls_goriz[0] = setwall_goriz(brick_white, 5, 5, 1290 - 1);
    walls_goriz[1] = setwall_goriz(brick_white, 5, 560, 1290 - 1);
    walls_vert[0] = setwall_vert(brick_white, 5, 5, 570 - 1);
    walls_vert[1] = setwall_vert(brick_white, 1265, 5, 570 - 1);

    walls_goriz[2] = setwall_goriz(brick_white, 335, 280, 240 - 1);
    walls_goriz[3] = setwall_goriz(brick_white, 725, 280, 240 - 1);

    walls_vert[2] = setwall_vert(brick_white, 210, 190, 210 - 1);
    walls_vert[3] = setwall_vert(brick_white, 1070, 190, 210 - 1);
    walls_vert[4] = setwall_vert(brick_white, 635 , 80 , 150 - 1);
    walls_vert[5] = setwall_vert(brick_white, 635 , 360 , 150 - 1);

    walls_goriz[0][1].image = walls_goriz[0][1].blue;
    walls_goriz[0][2].image = walls_goriz[0][2].blue;
    walls_goriz[0][3].image = walls_goriz[0][3].blue;
    walls_goriz[0][39].image = walls_goriz[0][39].red;
    walls_goriz[0][40].image = walls_goriz[0][40].red;
    walls_goriz[0][41].image = walls_goriz[0][41].red;
}

export function setmap2(walls_goriz, walls_vert, brick_white){
    walls_goriz[0] = setwall_goriz(brick_white, 5, 5, 1290 - 1);
    walls_goriz[1] = setwall_goriz(brick_white, 5, 560, 1290 - 1);
    walls_vert[0] = setwall_vert(brick_white, 5, 5, 570 - 1);
    walls_vert[1] = setwall_vert(brick_white, 1265, 5, 570 - 1);

    walls_goriz[2] = setwall_goriz(brick_white, 90, 245, 150 - 1);
    walls_goriz[3] = setwall_goriz(brick_white, 160, 435, 240 - 1);
    walls_goriz[4] = setwall_goriz(brick_white, 575, 300, 240 - 1);
    walls_goriz[5] = setwall_goriz(brick_white, 600, 425, 240 - 1);
    walls_goriz[6] = setwall_goriz(brick_white, 830, 90, 240 - 1);
    walls_goriz[7] = setwall_goriz(brick_white, 1015, 360, 59 - 1);
    walls_goriz[8] = setwall_goriz(brick_white, 1130, 375, 90 - 1);


    walls_vert[2] = setwall_vert(brick_white, 395, 180, 210 - 1);
    walls_vert[3] = setwall_vert(brick_white, 925, 180, 210 - 1);
    walls_vert[4] = setwall_vert(brick_white, 150, 75, 120 - 1);
    walls_vert[5] = setwall_vert(brick_white, 640, 100, 150 - 1);
    walls_vert[6] = setwall_vert(brick_white, 500, 355, 150 - 1);
    walls_vert[7] = setwall_vert(brick_white, 800, 200, 60 - 1);
    walls_vert[8] = setwall_vert(brick_white, 830, 200, 60 - 1);
    walls_vert[9] = setwall_vert(brick_white, 845 , 500, 60 - 1);
    walls_vert[10] = setwall_vert(brick_white, 1100 , 180, 120 - 1);
    walls_vert[11] = setwall_vert(brick_white, 725 , 35, 30 - 1);


    walls_goriz[0][1].image = walls_goriz[0][1].blue;
    walls_goriz[0][2].image = walls_goriz[0][2].blue;
    walls_goriz[0][3].image = walls_goriz[0][3].blue;
    walls_goriz[0][39].image = walls_goriz[0][39].red;
    walls_goriz[0][40].image = walls_goriz[0][40].red;
    walls_goriz[0][41].image = walls_goriz[0][41].red;

}


export function setmap3(walls_goriz, walls_vert, brick_white){
    walls_goriz[0] = setwall_goriz(brick_white, 105, 200, 25);
    walls_vert[0] = setwall_vert(brick_white, 105, 200, 12);
    walls_vert[1] = setwall_vert(brick_white, 105 + brick_white.width * 25, 200, 12);
    for(let i = 1; i < 11; ++i){
        walls_goriz[i] = setwall_goriz(brick_white, 105 + brick_white.width, 200 + brick_white.height * i, 24);
    }
    walls_goriz[11] = setwall_goriz(brick_white, 105, 200 + brick_white.height * 11, 25);
}

export function drawwalls(walls_goriz, walls_vert){
    for(let i = 0; i < walls_goriz.length; ++i){
        for(let j = 0; j < walls_goriz[i].length; ++j){
            ctx.drawImage(walls_goriz[i][j].image, walls_goriz[i][j].x, walls_goriz[i][j].y, walls_goriz[i][j].width, walls_goriz[i][j].height);
        }
    }
    for(let i = 0; i < walls_vert.length; ++i){
        for(let j = 0; j < walls_vert[i].length; ++j){
            ctx.drawImage(walls_vert[i][j].image, walls_vert[i][j].x, walls_vert[i][j].y, walls_vert[i][j].width, walls_vert[i][j].height);
        }
    }
}

//###########################################################################################################################################
//###########################################################################################################################################
//###########################################################################################################################################
//###########################################################################################################################################



export function input(map){
    let text = ''; 
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(map.wall[i][j].use || (i == 0 || j == 0 || i == map.wall.length - 1 || j == map.wall[i].length - 1)){
                text += '1';
            } else {
                text += '0';
            }  
        }
        text += '\r';
        text += '\n';
    }
    text += "end;";
    return text;
}



function read_matrix(text){
    let matrix = []
    let line = 0;
    let column = 0;
    let y = 0;
    let x = 0;
    for(let i = 0; i < text.length; ++i){
        if(text[i] == '0' || text[i] == '1'){
            let arr = []
            for(let j = 0; j < 26; ++i, ++j){
                arr[j] = Number(text[i]);
            }
            matrix.push(arr);
        }
    }
    return matrix
}


function setbrick(i, j, brick_white, x0, y0){
    let brick = {}
    brick.x = x0 + j * brick_white.width;               
    brick.y = y0 + i * brick_white.height;
    brick.width = brick_white.width;
    brick.height = brick_white.height;
    brick.dx = brick_white.width;
    brick.dy = brick_white.height;
    brick.image = brick_white.white;
    brick.white = brick_white.white;
    brick.dark = brick_white.dark;
    brick.blue = brick_white.blue;
    brick.red = brick_white.red;
    brick.red_dark = brick_white.red_dark;
    brick.crush = [brick_white.white, brick_white.crush1, brick_white.crush2, brick_white.crush3];
    brick.status = 0;
    brick.main = false;
    brick.is = true;
    return brick;
}


export function setmap(map, brick_white, text){
    if(!text){
        text =
        "11111111111111111111111111" +
        "\r" +
        "\n" +
        "10000000010000001000000001" +
        "\r" +
        "\n" +
        "10000000010000001000000001" +
        "\r" +
        "\n";
        text +=
        "10000000010011001000000001" +
        "\r" +
        "\n" +
        "10000000010011001000000001" +
        "\r" +
        "\n";
        text +=
        "10000000000011000000000001" +
        "\r" +
        "\n" +
        "10000000000011000000000001" +
        "\r" +
        "\n";
        text +=
        "10000000010011001000000001" +
        "\r" +
        "\n" +
        "10000000010011001000000001" +
        "\r" +
        "\n";
        text +=
        "10000000010000001000000001" +
        "\r" +
        "\n" +
        "10000000010000001000000001" +
        "\r" +
        "\n" +
        "11111111111111111111111111" +
        "\r" +
        "\n" +
        "end;";
    }
    for(let i = 0; i < 12; ++i){
        map.wall[i] = [];
        for(let j = 0; j < 26; ++j){
            map.wall[i][j] = setbrick(i, j, brick_white, 105, 55);
        }
    }
    for(let i = 0; i < map.wall.length; ++i){
        map.wall[i][0].main = true;
        map.wall[i][map.wall[i].length - 1].main = true;
    }
    for(let i = 0; i < map.wall[0].length; ++i){
        map.wall[0][i].main = true;
        map.wall[map.wall.length - 1][i].main = true;
    }
    let walls = read_matrix(text);
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(walls[i][j] == 0){
                map.wall[i][j].is = false;
            }
        }
    }
    map.wall[0][1].image = map.wall[0][1].blue;
    map.wall[0][2].image = map.wall[0][2].blue;
    map.wall[0][3].image = map.wall[0][3].blue;
    map.wall[0][22].image = map.wall[0][22].red;
    map.wall[0][23].image = map.wall[0][23].red;
    map.wall[0][24].image = map.wall[0][24].red;
}

export function setmap4(map, brick_white, text){
    for(let i = 0; i < 12; ++i){
        map.wall[i] = [];
        for(let j = 0; j < 26; ++j){
            map.wall[i][j] = setbrick(i, j, brick_white, 105, 155);
        }
    }
    for(let i = 0; i < map.wall.length; ++i){
        map.wall[i][0].main = true;
        map.wall[i][map.wall[i].length - 1].main = true;
    }
    for(let i = 0; i < map.wall[0].length; ++i){
        map.wall[0][i].main = true;
        map.wall[map.wall.length - 1][i].main = true;
    }
    let walls = read_matrix(text);
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(walls[i][j] == 0){
                map.wall[i][j].is = false;
            }
        }
    }
}
export function visualwalls(map){
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(map.wall[i][j].is){
                ctx.drawImage(map.wall[i][j].image, map.wall[i][j].x, map.wall[i][j].y, map.wall[i][j].width, map.wall[i][j].height);
            }
        }
    }
}
//###########################################################################################################################################
//###########################################################################################################################################
//##################################################################################################################################################
//###########################################################################################################################################

function centre(bot, brick){
    if(bot.x >= brick.x && bot.x + bot.width <= brick.x + brick.width &&
        bot.y >= brick.y && bot.y + bot.height <= brick.y + brick.height){
            return true;
    }
    return false;
}

function clear_way(map, bot){
    let x1, y1;
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(inside2(bot, map.wall[i][j])){
                y1 = i;
                x1 = j;
            }
        }
    }
    let option = []
    x1--;
    if(!map.wall[y1][x1].is || map.wall[y1][x1].status == 3){
        option.push(y1 * 25 + x1);
    }
    x1++;
    x1++;
    if(!map.wall[y1][x1].is || map.wall[y1][x1].status == 3){
        option.push(y1 * 25 + x1);
    }
    x1--;
    y1++;
    if(!map.wall[y1][x1].is || map.wall[y1][x1].status == 3){
        option.push(y1 * 25 + x1);
    }
    y1--;
    y1--;
    if(!map.wall[y1][x1].is || map.wall[y1][x1].status == 3){
        option.push(y1 * 25 + x1);
    }
    y1++;
    let i = Math.floor(Math.random() * option.length)
    return option[i];
}



export function appearence1(tank, last){
    if(last == "KeyW"){tank.image = tank.costumes[0]; tank.direction = 0; tank.direct = 0}
    else if(last == "KeyD"){tank.image = tank.costumes[1]; tank.direction = 1; tank.direct = 1}
    else if(last == "KeyS"){tank.image = tank.costumes[2]; tank.direction = 2; tank.direct = 2}
    else if(last == "KeyA"){tank.image = tank.costumes[3]; tank.direction = 3; tank.direct = 3}
    else{tank.direction = -1}
}

export function appearence2(tank, last){
    if(last == "ArrowUp"){tank.image = tank.costumes[0]; tank.direction = 0; tank.direct = 0}
    else if(last == "ArrowRight"){tank.image = tank.costumes[1]; tank.direction = 1; tank.direct = 1}
    else if(last == "ArrowDown"){tank.image = tank.costumes[2]; tank.direction = 2; tank.direct = 2}
    else if(last == "ArrowLeft"){tank.image = tank.costumes[3]; tank.direction = 3; tank.direct = 3}
    else{tank.direction = -1}
}

export function appearence_bot(bot, bot_way, map, time, dt){
    let x1, y1;
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(inside2(bot, map.wall[i][j])){
                y1 = i;
                x1 = j;
            }
        }
    }
    if(centre(bot, map.wall[y1][x1]) && y1 * 25 + x1 != bot.prev){

        bot.last_centre_time = time
        if(bot.prev != y1 * 25 + x1){
            bot.passed++;
            bot.prev = y1 * 25 + x1;
        }
        if(bot.move_type){
            let destination = clear_way(map, bot);
            let x2 = destination % 25;
            let y2 = Math.floor(destination / 25)
            if(y2 > y1){
                bot.direction = 2;
            } else if(y2 < y1){
                bot.direction = 0;
            } else if(x2 < x1){
                bot.direction = 3;
            } else if(x2 > y1){
                bot.direction = 1;
            }
            
            if(bot.direction){
                bot.image = bot.costumes[bot.direction];
                bot.direct = bot.direction;
            }
            if(bot.passed > bot.go_with){
                bot.passed = 0;
                bot.move_type = 0;
            }
        } else {
            if(bot_way.length > 1){
                if(x1 == bot_way[1][1] && y1 > bot_way[1][0] && centre(bot, map.wall[y1][x1])){bot.image = bot.costumes[0]; bot.direction = 0; bot.direct = 0}
                else if(x1 < bot_way[1][1] && y1 == bot_way[1][0] && centre(bot, map.wall[y1][x1])){bot.image = bot.costumes[1]; bot.direction = 1; bot.direct = 1}
                else if(x1 == bot_way[1][1] && y1 < bot_way[1][0] && centre(bot, map.wall[y1][x1])){bot.image = bot.costumes[2]; bot.direction = 2; bot.direct = 2}
                else if(x1 > bot_way[1][1] && y1 == bot_way[1][0] && centre(bot, map.wall[y1][x1])){bot.image = bot.costumes[3]; bot.direction = 3; bot.direct = 3}
            } else {bot.direction = -1}
            if(bot.passed > bot.go_without){
                bot.passed = 0;
                bot.move_type = 1;
            }
        }
    }

    if(time - bot.last_centre_time > dt * 3){
        if(bot.direct == 0){
            bot.direction = 2;
            bot.direct = 2;
            bot.image = bot.costumes[2]
        } else if(bot.direct == 1){
            bot.direction = 3;
            bot.direct = 3;
            bot.image = bot.costumes[3]
        } else if(bot.direct == 2){
            bot.direction = 0;
            bot.direct = 0;
            bot.image = bot.costumes[0]
        } else if(bot.direct == 3){
            bot.direction = 1;
            bot.direct = 1;
            bot.image = bot.costumes[1]
        }
        bot.passed = 0;
        bot.move_type = 0;
        bot.last_centre_time = time;
    }
}


//###########################################################################################################################################
//###########################################################################################################################################

function reset_map(map, box, time){
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(map.wall[i][j].is){
                map.wall[i][j].status = 0;
                map.wall[i][j].image = map.wall[i][j].crush[map.wall[i][j].status];
            }
        }
    }
    box.own = 0;
    box.see = false;
    box.width = box.width_b;
    box.height = box.height_b;
    box.image = box.image_b;
}


export function setbullet(tank, bullet){
    tank.bullets = [];
    tank.bullet_i = 0;
    for(let i = 0; i < tank.bullet_max; ++i){
        tank.bullets[i] = {};
        tank.bullets[i].costumes = bullet.costumes;
        tank.bullets[i].booms = bullet.booms;
        tank.bullets[i].dx = bullet.dx;
        tank.bullets[i].dy = bullet.dy;
        tank.bullets[i].see = bullet.see;
        tank.bullets[i].costume_i = bullet.costume_i;
        tank.bullets[i].direction = bullet.direction;
        tank.bullets[i].image = bullet.image;
    }
}



//###########################################################################################################################################
//###########################################################################################################################################



export function bulletset(tank){
    tank.bullets[tank.bullet_i].see = true;
    tank.bullets[tank.bullet_i].direction = tank.direct;
    if(tank.bullets[tank.bullet_i].direction == 0){tank.bullets[tank.bullet_i].image = tank.bullets[tank.bullet_i].costumes[0]; tank.bullets[tank.bullet_i].width = 25; tank.bullets[tank.bullet_i].height = 50;tank.bullets[tank.bullet_i].x = tank.x + 9; tank.bullets[tank.bullet_i].y = tank.y - 15;}
    if(tank.bullets[tank.bullet_i].direction == 1){tank.bullets[tank.bullet_i].image = tank.bullets[tank.bullet_i].costumes[1]; tank.bullets[tank.bullet_i].width = 50; tank.bullets[tank.bullet_i].height = 25;tank.bullets[tank.bullet_i].x = tank.x + 9; tank.bullets[tank.bullet_i].y = tank.y + 10;}
    if(tank.bullets[tank.bullet_i].direction == 2){tank.bullets[tank.bullet_i].image = tank.bullets[tank.bullet_i].costumes[2]; tank.bullets[tank.bullet_i].width = 25; tank.bullets[tank.bullet_i].height = 50;tank.bullets[tank.bullet_i].x = tank.x + 6; tank.bullets[tank.bullet_i].y = tank.y + 10;}
    if(tank.bullets[tank.bullet_i].direction == 3){tank.bullets[tank.bullet_i].image = tank.bullets[tank.bullet_i].costumes[3]; tank.bullets[tank.bullet_i].width = 50; tank.bullets[tank.bullet_i].height = 25;tank.bullets[tank.bullet_i].x = tank.x - 10; tank.bullets[tank.bullet_i].y = tank.y + 7;}
}


export function bulletgo(bullet, tankA, tankB, map, winner, box, time, sound){
    let pink = touch_bullet(map, tankB, bullet, box);
    
    bullet.touch = pink.touch;

    if(pink.what == 'blue' && bullet.costume_i == 0 && box.own != tankB.numb){
        map.wall[0][3 - map.red_i].image = map.wall[0][3 - map.red_i + 3].white;
        map.red_i++;
        if(map.red_i == 3){
            tankA.x = tankA.sx;
            tankA.y = tankA.sy;
            tankB.x = tankB.sx;
            tankB.y = tankB.sy;
            tankA.points++;
            map.red_i = 0;
            map.blue_i = 0;
            if(tankA.passed || tankB.passed){
                if(tankA.passed){
                    tankA.passed = 0;
                } else {
                    tankB.passed = 0;
                }
            }
            reset_map(map, box, time);
            for(let i = 0; i < 3; ++i){map.wall[0][i + 1].image = map.wall[0][i + 1].blue;}
            for(let i = 0; i < 3; ++i){map.wall[0][i + 22].image = map.wall[0][i + 22].red;}
            winner.who = 'red'
        }
        // ctx.beginPath();
        // ctx.ellipse(100, 100, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
        // ctx.fillStyle = 'red';
        // ctx.fill();
    }
    if(pink.what == 'red' && bullet.costume_i == 0 && box.own != tankB.numb){
        map.wall[0][map.blue_i + 22].image = map.wall[0][map.blue_i + 22].white;
        map.blue_i++;
        if(map.blue_i == 3){
            tankA.x = tankA.sx;
            tankA.y = tankA.sy;
            tankB.x = tankB.sx;
            tankB.y = tankB.sy;
            tankA.points++;
            map.red_i = 0;
            map.blue_i = 0;
            if(tankA.passed || tankB.passed){
                if(tankA.passed){
                    tankA.passed = 0;
                } else {
                    tankB.passed = 0;
                }
            }
            reset_map(map, box, time);
            for(let i = 0; i < 3; ++i){map.wall[0][i + 1].image = map.wall[0][i + 1].blue;}
            for(let i = 0; i < 3; ++i){map.wall[0][i + 22].image = map.wall[0][i + 22].red;}
            winner.who = 'blue'
            box.see = false;
            box.last = time;
        }
        // ctx.beginPath();
        // console.log(tankA.x, " ",tankA.sx)
        // ctx.ellipse(100, 100, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
        // ctx.fillStyle = 'blue';
        // ctx.fill();
    }
    if(bullet.touch){
        if(bullet.costume_i == 0){
            sound.explosion.play();
        }
        if (bullet.direction == 1) {
            if(!bullet.costume_i){
                bullet.x += bullet.dx;
            }
            while(touch(map, bullet, tankB, box) && !bullet.costume_i){
                bullet.x -= 1;
            }
            if(bullet.costume_i == 1){
                bullet.x += 30;
            }
        }
        if (bullet.direction == 3) {
            if(!bullet.costume_i){
                bullet.x -= bullet.dx;
            }
            while(touch(map, bullet, tankB, box) && !bullet.costume_i){
                bullet.x += 1;
            }
            if(bullet.costume_i == 1){                  
                bullet.x -= 30;
            }
        }
        if (bullet.direction == 0) {
            if(!bullet.costume_i){
                bullet.y -= bullet.dy;
            }
            while(touch(map, bullet, tankB, box) && !bullet.costume_i){
                bullet.y += 1;
            }
            if(bullet.costume_i == 1){
                bullet.y -= 30;
            }
        }
        if (bullet.direction == 2) {
            if(!bullet.costume_i){
                bullet.y += bullet.dy;
            }
            while(touch(map, bullet, tankB, box) && !bullet.costume_i){
                bullet.y -= 1;
            }
            if(bullet.costume_i == 1){
                bullet.y += 30;
            }
        }
    }

    if(!bullet.touch){
        if(bullet.direction == 0){bullet.y -= bullet.dy;}
        if(bullet.direction == 1){bullet.x += bullet.dx;}
        if(bullet.direction == 2){bullet.y += bullet.dy;}
        if(bullet.direction == 3){bullet.x -= bullet.dx;}
    } else {
        if(bullet.costume_i == 0){
            bullet.image = bullet.booms[0];
            bullet.costume_i += 0.4;
            bullet.height = 50;
            bullet.width = 50;
        }
    }
    if(bullet.costume_i < 7 && bullet.costume_i != 0){
        bullet.image = bullet.booms[Math.floor(bullet.costume_i)];
        bullet.costume_i += 0.4;
    } else if(bullet.costume_i >= 7) {
        bullet.see = false;
        bullet.costume_i = 0;
    }
    if(winner.who != 'blue' && winner.who != 'red'){winner.who = 0;}
}



//###########################################################################################################################################
//###########################################################################################################################################


export function bot_shot(bot_way, tank1, map, tank, time, time0, dt){
    let button = false;
    let x1, y1, x2, y2;
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(inside2(tank, map.wall[i][j])){
                y1 = i;
                x1 = j;
            }
            if(inside2(tank1, map.wall[i][j])){
                y2 = i;
                x2 = j;
            }
        }
    }
    if((x1 == x2 && (tank.direction == 0 || tank.direction == 2)) || (y1 == y2 && (tank.direction == 1 || tank.direction == 3))){
        button = true;
    }
    if(button && !tank.bullets[tank.bullet_i].see && time0 < time - dt){
        bulletset(tank);
        tank.bullet_i++;
        if(tank.bullet_i == tank.bullet_max){tank.bullet_i = 0}
        time0 = time
    }
    return time0;
}


export function shot(button, tank, time, time0, dt){
    if(button && !tank.bullets[tank.bullet_i].see && time0 < time - dt){
        bulletset(tank);
        tank.bullet_i++;
        if(tank.bullet_i == tank.bullet_max){tank.bullet_i = 0}
        time0 = time
    }
    return time0;
}

export function bulletflight(tankA, tankB, map, winner, box, time, sound){
    for(let i = 0; i < tankA.bullet_max; ++i){
        if(tankA.bullets[i].see){
            ctx.drawImage(tankA.bullets[i].image, tankA.bullets[i].x, tankA.bullets[i].y, tankA.bullets[i].width, tankA.bullets[i].height);
            bulletgo(tankA.bullets[i], tankA, tankB, map, winner, box, time, sound);
        }
    }
}



//###########################################################################################################################################
//###########################################################################################################################################


export function move_box(box, time, map, tank1, tank2){
    if(box.own == 1){
        box.x = tank1.x + tank1.width / 2 - box.width_sh / 2;
        box.y = tank1.y + tank1.height / 2 - box.height_sh / 2;
        if(time - box.start >= box.at){
            box.own = 0;
            box.see = true;
            box.width = box.width_b;
            box.height = box.height_b;
            box.image = box.image_b;
        }
    }
    else if(box.own == 2){
        box.x = tank2.x + tank2.width / 2 - box.width_sh / 2;
        box.y = tank2.y + tank2.height / 2 - box.height_sh / 2;
        if(time - box.start > box.at){
            box.own = 0;
            box.see = false;
            box.width = box.width_b;
            box.height = box.height_b;
            box.image = box.image_b;
        }
    } else {
        if(time - box.last >= box.dt){
            box.see = true;
            box.x = Math.random() * (1370 - 70) + 70;
            box.y = Math.random() * (560 - 105) + 105;
            box.last = time;
            let pink = touch_box(box, map);
            while(pink.touch && box.x + box.width / 2 < 622 && pink.wall == 2){
                box.x++;
                pink = touch_box(box, map);
            }
            while(pink.touch && box.x + box.width / 2 >= 622 && pink.wall == 2){
                box.x--;
                pink = touch_box(box, map);
            }
            while(pink.touch && box.y + box.height / 2 < 292 && pink.wall == 1){
                box.y++;
                pink = touch_box(box, map);
            }
            while(pink.touch && box.y + box.height / 2 >= 292 && pink.wall == 1){
                box.y--;
                pink = touch_box(box, map);
            }
        }
        if (box.x + box.width >= tank1.x && box.x <= tank1.x + tank1.width && box.y + box.height >= tank1.y && box.y <= tank1.y + tank1.height) {
            box.image = box.image_sh;
            box.own = 1;
            box.width = box.width_sh;
            box.height = box.height_sh;
            box.start = time;
        }
        if (box.x + box.width >= tank2.x && box.x <= tank2.x + tank2.width && box.y + box.height >= tank2.y && box.y <= tank2.y + tank2.height) {
            box.image = box.image_sh;
            box.own = 2;
            box.width = box.width_sh;
            box.height = box.height_sh;
            box.start = time;
        }
    }
}



//###########################################################################################################################################
//###########################################################################################################################################
//###########################################################################################################################################
//###########################################################################################################################################

function coord(v, m){
    let pair = []
    for(let i = 0; i < v.length; ++i){
        pair[i] = []
        pair[i].push(Math.floor(v[i] / m));
        pair[i].push(Math.floor(v[i] % m));
    }
    return pair;
}

function conect(v, i, n, m, map){
    if(map.wall[Math.floor(i/m)][i%m].is && map.wall[Math.floor(i/m)][i%m].status != 3){
        return false;
    }
    if( Math.abs(Math.floor(v/m) - Math.floor(i/m)) == 0 && Math.abs(v%m - i%m) == 1){
        return true;
    }
    if( Math.abs(Math.floor(v/m) - Math.floor(i/m)) == 1 && Math.abs(v%m - i%m) == 0){
        return true;
    }
    return false;
}



function bfs(v, n, m, way, used, dist, q, map){
    way[v].push(v);
    q.push(v);
    dist[v] = 0;
    used[v] = 1;
    while(q.length > 0){
        v = q.shift();
        for(let i = 0; i < n * m; ++i){
            if(conect(v, i, n, m, map)){
                if(!used[i]){
                    q.push(i);
                    used[i] = 1;
                    dist[i] = dist[v] + 1;
                    for(let j = 0; j < way[v].length; ++j){
                        way[i].push(way[v][j]);
                    }
                    way[i].push(i);
                }
            }
        }
    }
}


export function findway(tank2, tank1, map){
    for(let i = 0; i < map.wall.length; ++i){
        for(let j = 0; j < map.wall[i].length; ++j){
            if(inside2(tank2, map.wall[i][j])){
                tank2.insy = i;
                tank2.insx = j;
            }
            if(inside2(tank1, map.wall[i][j])){
                tank1.insy = i;
                tank1.insx = j;
            }
        }
    }
    let x1 = tank2.insx, y1 = tank2.insy;
    let x2 = tank1.insx, y2 = tank1.insy;
    let way = []
    let used = []
    let dist = []
    let q = []
    let n = 12
    let m = 26
    for(let i = 0; i < n * m; ++i){
        way[i] = []
    }
    bfs(y1 * m + x1, n, m, way, used, dist, q, map);
    return coord(way[y2 * m + x2], m);
}


export function show_way(coord, map){
    for(let i = 0; i < coord.length; ++i){
        let wall = map.wall[coord[i][0]][coord[i][1]]
        ctx.drawImage(wall.red_dark, wall.x, wall.y, wall.width, wall.height);
    }
}