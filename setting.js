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
  let Tspeed = 5;
  localStorage.setItem("Tspeed", Tspeed);

  let Bspeed = 20;
  localStorage.setItem("Bspeed", Bspeed);

  let freq = 500;
  localStorage.setItem("freq", freq);

  let ars = 5;
  localStorage.setItem("ars", ars);

  let file_map =
    "1, 435, 320, 4,\n1, 825, 320, 4,\n2, 300, 200, 5,\n2, 1170, 200, 5,\n2, 710, 170, 2,\n2, 710, 410, 2,\nend;";
  localStorage.setItem("file_map", file_map);
};


