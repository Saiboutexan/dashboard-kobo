alert("SCRIPT MIS À JOUR");

const FORM_URL =
  "https://script.google.com/macros/s/AKfycbzhX33qWAo8Y1MvYMbM3VA6N5Ak8SOLqraRfDCyU1xCZKb0IHEvEVXgyik7MQheEEXUAQ/exec";

async function chargerDonnees() {

  const tbody = document.getElementById("tbody");
  const total = document.getElementById("total");

  try {

    tbody.innerHTML = `
      <tr>
        <td colspan="3">Chargement...</td>
      </tr>
    `;

    const response = await fetch(FORM_URL);

    if (!response.ok) {
      throw new Error("Erreur API : " + response.status);
    }

    const results = await response.json();

    console.log(results);

    total.innerText = results.length;

    tbody.innerHTML = "";

    if (results.length === 0) {

      tbody.innerHTML = `
        <tr>
          <td colspan="3">Aucune donnée trouvée</td>
        </tr>
      `;

      return;
    }

    results.forEach((item) => {

      tbody.innerHTML += `
        <tr>
          <td>${item.ID || ""}</td>
          <td>${item.NOM || ""}</td>
          <td>${item.Pr_nom || ""}</td>
        </tr>
      `;

    });

  } catch(error) {

    console.error(error);

    tbody.innerHTML = `
      <tr>
        <td colspan="3">
          Erreur : ${error.message}
        </td>
      </tr>
    `;

  }

}

chargerDonnees();