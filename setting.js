var strong1 = 0;
var strong2 = 0;

document.getElementById("Next").onclick = function () {
  localStorage.clear();
  let Tspeed = document.querySelector(".Tspeed").value;
  localStorage.setItem("Tspeed", Tspeed);

  let Bspeed = document.querySelector(".Bspeed").value;
  localStorage.setItem("Bspeed", Bspeed);

  let freq = document.querySelector(".freq").value;
  localStorage.setItem("freq", freq);

  let ars = document.querySelector(".ars").value;
  localStorage.setItem("ars", ars);

  localStorage.setItem("strong1", strong1);
  localStorage.setItem("strong2", strong2);

  let ub1 = document.getElementById("ub1");
  localStorage.setItem("ub1", ub1.checked);
  let ub2 = document.getElementById("ub2");
  localStorage.setItem("ub2", ub2.checked);

  let file_map = "";
  let file = document.getElementById("map").files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  console.log("yes");
  reader.onload = function () {
    file_map += reader.result;
    console.log(map);
    console.log("yes");
    localStorage.setItem("file_map", file_map);
  };
};

document.getElementById("Default").onclick = function () {
  localStorage.clear();
  document.getElementById("Tspeed").value = 5;
  document.getElementById("Bspeed").value = 20;
  document.getElementById("freq").value = 500;
  document.getElementById("ars").value = 5;
};

document.getElementById("strong10").onclick = function () {
  if (document.getElementById("ub1").checked) {
    document.getElementById("strong10").style.backgroundColor = "#0000ff";
    document.getElementById("strong11").style.backgroundColor = "#2c83df";
    document.getElementById("strong12").style.backgroundColor = "#2c83df";
    document.getElementById("strong13").style.backgroundColor = "#2c83df";
    document.getElementById("strong14").style.backgroundColor = "#2c83df";
    document.getElementById("strong15").style.backgroundColor = "#2c83df";
    strong1 = 0;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong11").onclick = function () {
  if (document.getElementById("ub1").checked) {
    document.getElementById("strong10").style.backgroundColor = "#2c83df";
    document.getElementById("strong11").style.backgroundColor = "#0000ff";
    document.getElementById("strong12").style.backgroundColor = "#2c83df";
    document.getElementById("strong13").style.backgroundColor = "#2c83df";
    document.getElementById("strong14").style.backgroundColor = "#2c83df";
    document.getElementById("strong15").style.backgroundColor = "#2c83df";
    strong1 = 1;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong12").onclick = function () {
  if (document.getElementById("ub1").checked) {
    document.getElementById("strong10").style.backgroundColor = "#2c83df";
    document.getElementById("strong11").style.backgroundColor = "#2c83df";
    document.getElementById("strong12").style.backgroundColor = "#0000ff";
    document.getElementById("strong13").style.backgroundColor = "#2c83df";
    document.getElementById("strong14").style.backgroundColor = "#2c83df";
    document.getElementById("strong15").style.backgroundColor = "#2c83df";
    strong1 = 2;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong13").onclick = function () {
  if (document.getElementById("ub1").checked) {
    document.getElementById("strong10").style.backgroundColor = "#2c83df";
    document.getElementById("strong11").style.backgroundColor = "#2c83df";
    document.getElementById("strong12").style.backgroundColor = "#2c83df";
    document.getElementById("strong13").style.backgroundColor = "#0000ff";
    document.getElementById("strong14").style.backgroundColor = "#2c83df";
    document.getElementById("strong15").style.backgroundColor = "#2c83df";
    strong1 = 3;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong14").onclick = function () {
  if (document.getElementById("ub1").checked) {
    document.getElementById("strong10").style.backgroundColor = "#2c83df";
    document.getElementById("strong11").style.backgroundColor = "#2c83df";
    document.getElementById("strong12").style.backgroundColor = "#2c83df";
    document.getElementById("strong13").style.backgroundColor = "#2c83df";
    document.getElementById("strong14").style.backgroundColor = "#0000ff";
    document.getElementById("strong15").style.backgroundColor = "#2c83df";
    strong1 = 4;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong15").onclick = function () {
  if (document.getElementById("ub1").checked) {
    document.getElementById("strong10").style.backgroundColor = "#2c83df";
    document.getElementById("strong11").style.backgroundColor = "#2c83df";
    document.getElementById("strong12").style.backgroundColor = "#2c83df";
    document.getElementById("strong13").style.backgroundColor = "#2c83df";
    document.getElementById("strong14").style.backgroundColor = "#2c83df";
    document.getElementById("strong15").style.backgroundColor = "#0000ff";
    strong1 = 5;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};

document.getElementById("strong20").onclick = function () {
  if (document.getElementById("ub2").checked) {
    document.getElementById("strong20").style.backgroundColor = "#ff0000";
    document.getElementById("strong21").style.backgroundColor = "#ff7066";
    document.getElementById("strong22").style.backgroundColor = "#ff7066";
    document.getElementById("strong23").style.backgroundColor = "#ff7066";
    document.getElementById("strong24").style.backgroundColor = "#ff7066";
    document.getElementById("strong25").style.backgroundColor = "#ff7066";
    strong2 = 0;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong21").onclick = function () {
  if (document.getElementById("ub2").checked) {
    document.getElementById("strong20").style.backgroundColor = "#ff7066";
    document.getElementById("strong21").style.backgroundColor = "#ff0000";
    document.getElementById("strong22").style.backgroundColor = "#ff7066";
    document.getElementById("strong23").style.backgroundColor = "#ff7066";
    document.getElementById("strong24").style.backgroundColor = "#ff7066";
    document.getElementById("strong25").style.backgroundColor = "#ff7066";
    strong2 = 1;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong22").onclick = function () {
  if (document.getElementById("ub2").checked) {
    document.getElementById("strong20").style.backgroundColor = "#ff7066";
    document.getElementById("strong21").style.backgroundColor = "#ff7066";
    document.getElementById("strong22").style.backgroundColor = "#ff0000";
    document.getElementById("strong23").style.backgroundColor = "#ff7066";
    document.getElementById("strong24").style.backgroundColor = "#ff7066";
    document.getElementById("strong25").style.backgroundColor = "#ff7066";
    strong2 = 2;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong23").onclick = function () {
  if (document.getElementById("ub2").checked) {
    document.getElementById("strong20").style.backgroundColor = "#ff7066";
    document.getElementById("strong21").style.backgroundColor = "#ff7066";
    document.getElementById("strong22").style.backgroundColor = "#ff7066";
    document.getElementById("strong23").style.backgroundColor = "#ff0000";
    document.getElementById("strong24").style.backgroundColor = "#ff7066";
    document.getElementById("strong25").style.backgroundColor = "#ff7066";
    strong2 = 3;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong24").onclick = function () {
  if (document.getElementById("ub2").checked) {
    document.getElementById("strong20").style.backgroundColor = "#ff7066";
    document.getElementById("strong21").style.backgroundColor = "#ff7066";
    document.getElementById("strong22").style.backgroundColor = "#ff7066";
    document.getElementById("strong23").style.backgroundColor = "#ff7066";
    document.getElementById("strong24").style.backgroundColor = "#ff0000";
    document.getElementById("strong25").style.backgroundColor = "#ff7066";
    strong2 = 4;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
document.getElementById("strong25").onclick = function () {
  if (document.getElementById("ub2").checked) {
    document.getElementById("strong20").style.backgroundColor = "#ff7066";
    document.getElementById("strong21").style.backgroundColor = "#ff7066";
    document.getElementById("strong22").style.backgroundColor = "#ff7066";
    document.getElementById("strong23").style.backgroundColor = "#ff7066";
    document.getElementById("strong24").style.backgroundColor = "#ff7066";
    document.getElementById("strong25").style.backgroundColor = "#ff0000";
    strong2 = 5;
  } else {
    alert("ИГРА С БОТОМ НЕ ВЫБРАНА")
  }
};
