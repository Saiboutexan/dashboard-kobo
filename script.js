alert("NOUVEAU SCRIPT CHARGÉ");

const FORM_URL = "https://script.google.com/macros/s/AKfycbxJKVbECtzabq5SwQAq0I3lIGhPOOmYCszsr6KTFBDTHwFcepHe0jBORgQ-UZZ8LE8jzA/exec";

async function chargerDonnees() {

  try {

    console.log("Chargement des données...");

    const response = await fetch(FORM_URL);

    console.log("Response :", response);

    const data = await response.json();

    console.log("DATA :", data);

    const results = data.results || [];

    console.log("RESULTS :", results);

    // TOTAL
    document.getElementById("total").innerText = results.length;

    // TABLEAU
    const tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

    // Si aucune donnée
    if(results.length === 0) {

      tbody.innerHTML = `
        <tr>
          <td colspan="3">Aucune donnée trouvée</td>
        </tr>
      `;

      return;

    }

    // Ajout des lignes
    results.forEach(item => {

      const row = `
        <tr>
          <td>${item.Id || ""}</td>
          <td>${item.Nom || ""}</td>
          <td>${item.Pr_nom || ""}</td>
        </tr>
      `;

      tbody.innerHTML += row;

    });

  } catch(error) {

    console.error("Erreur :", error);

    alert("Erreur : " + error.message);

  }

}

// Lancement
chargerDonnees();