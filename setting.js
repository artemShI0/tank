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
  document.getElementById('Tspeed').value = 5;
  document.getElementById('Bspeed').value = 20;
  document.getElementById('freq').value = 500;
  document.getElementById('ars').value = 5;
};
