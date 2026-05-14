let map = L.map('map').setView([9.5, -11.8], 6);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:'© OpenStreetMap'
  }
).addTo(map);

let markers = [];

function updateMap(data){

  markers.forEach(marker => {
    map.removeLayer(marker);
  });

  markers = [];

  data.forEach(item => {

    let marker = L.circleMarker(
      [item.lat, item.lng],
      {
        radius:10,
        fillColor:item.status === "RETARD"
          ? "red"
          : "green",

        color:"#fff",
        weight:2,
        fillOpacity:0.8
      }
    ).addTo(map);

    marker.bindPopup(`
      <b>${item.region}</b><br>
      BV: ${item.bv}<br>
      Heure: ${item.heure}
    `);

    markers.push(marker);

  });

}
