const SERVER_URL = "https://kf.kobotoolbox.org";
const API_KEY = "VOTRE_API_KEY";
const ASSET_UID = "VOTRE_UID";

async function chargerDonnees() {

  try {

    const response = await fetch(
      `${SERVER_URL}/api/v2/assets/${ASSET_UID}/data/?format=json`,
      {
        headers: {
          "Authorization": `Token ${API_KEY}`,
          "Accept": "application/json"
        }
      }
    );

    const data = await response.json();

    const results = data.results;

    document.getElementById("total").innerText = results.length;

    const tbody = document.getElementById("tbody");

    results.forEach(item => {

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item._id}</td>
        <td>${item.nom || ""}</td>
        <td>${item.prenom || ""}</td>
      `;

      tbody.appendChild(tr);

    });

  } catch(error) {

    console.error(error);

  }

}

chargerDonnees();
