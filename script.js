const FORM_URL = "https://kf.kobotoolbox.org/api/v2/assets/aMfrC6SQo5rdpVJfyBwgcC/data/?format=json";

async function chargerDonnees() {

  try {

    const response = await fetch(FORM_URL);

    console.log(response);

    const data = await response.json();

    console.log(data);

    const results = data.results || [];

    document.getElementById("total").innerText = results.length;

    const tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

    results.forEach(item => {

      tbody.innerHTML += `
        <tr>
          <td>${item.Id || ""}</td>
          <td>${item.Nom || ""}</td>
          <td>${item.Pr_nom || ""}</td>
        </tr>
      `;

    });

  } catch(error) {

    console.error(error);

    alert(error.message);

  }

}

chargerDonnees();