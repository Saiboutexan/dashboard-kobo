let openChart;
let genreChart;

function initCharts(){

  openChart = new Chart(
    document.getElementById('openChart'),
    {
      type:'bar',
      data:{
        labels:['À l\'heure','Retard'],
        datasets:[{
          data:[0,0]
        }]
      }
    }
  );

  genreChart = new Chart(
    document.getElementById('genreChart'),
    {
      type:'doughnut',
      data:{
        labels:['Hommes','Femmes'],
        datasets:[{
          data:[0,0]
        }]
      }
    }
  );

}

function updateCharts(stats){

  openChart.data.datasets[0].data = [
    stats.heure,
    stats.retard
  ];

  openChart.update();

  genreChart.data.datasets[0].data = [
    stats.hommes,
    stats.femmes
  ];

  genreChart.update();

}
