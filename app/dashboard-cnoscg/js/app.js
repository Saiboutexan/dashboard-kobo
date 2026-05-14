let liveData = [];

initCharts();

function processData(records){

  liveData = [];

  let stats = {
    total:0,
    heure:0,
    retard:0,
    hommes:0,
    femmes:0,
    delegues:0
  };

  records.forEach(item => {

    stats.total++;

    if(item.heure_ouverture <= "07:00"){
      stats.heure++;
    }else{
      stats.retard++;
    }

    if(item.genre === "Homme"){
      stats.hommes++;
    }else{
      stats.femmes++;
    }

    if(item.delegues === "Oui"){
      stats.delegues++;
    }

    liveData.push({
      region:item.region || "Inconnue",
      bv:item.nom_bv || "BV",
      heure:item.heure_ouverture || "--:--",
      status:item.heure_ouverture <= "07:00"
        ? "OK"
        : "RETARD",

      lat:item._geolocation?.[0] || 9.5,
      lng:item._geolocation?.[1] || -11.8
    });

  });

  animateCounter("totalBV", stats.total);
  animateCounter("retards", stats.retard);

  document.getElementById("ouverture").innerHTML =
      ((stats.heure / stats.total) * 100 || 0).toFixed(1) + "%";

  document.getElementById("delegues").innerHTML =
      ((stats.delegues / stats.total) * 100 || 0).toFixed(1) + "%";

  updateCharts(stats);
  updateMap(liveData);
  renderTable();

}

function renderTable(){

  const body =
    document.getElementById('liveBody');

  body.innerHTML = "";

  liveData.reverse().slice(0,20)
    .forEach(item => {

    body.innerHTML += `
      <tr>
        <td>${item.region}</td>
        <td>${item.bv}</td>
        <td>${item.heure}</td>
        <td>${item.status}</td>
      </tr>
    `;

  });

}

function animateCounter(id,value){

  let obj =
    document.getElementById(id);

  let start = 0;

  let duration = 1000;

  let increment = value / duration * 10;

  let timer = setInterval(() => {

    start += increment;

    obj.innerHTML =
      Math.floor(start);

    if(start >= value){

      obj.innerHTML = value;

      clearInterval(timer);

    }

  },10);

}

function toggleTVMode(){
  document.body.classList.toggle("tv-mode");
}
