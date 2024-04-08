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
    "11111111111111111111111111" +
    "\r" +
    "\n" +
    "10000000010000001000000001" +
    "\r" +
    "\n" +
    "10000000010000001000000001" +
    "\r" +
    "\n";
  file_map +=
    "10000000010011001000000001" +
    "\r" +
    "\n" +
    "10000000010011001000000001" +
    "\r" +
    "\n";
  file_map +=
    "10000000000011000000000001" +
    "\r" +
    "\n" +
    "10000000000011000000000001" +
    "\r" +
    "\n";
  file_map +=
    "10000000010011001000000001" +
    "\r" +
    "\n" +
    "10000000010011001000000001" +
    "\r" +
    "\n";
  file_map +=
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
  localStorage.setItem("file_map", file_map);
};
