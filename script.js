const FORM_URL = "https://script.google.com/macros/s/AKfycbz3lkNVJ6xH7zDF_KAsJYX8CrefCclX4tp7cLkgJTBlOVxMrqwnt7Xg_m56I6rXu0Pk8A/exec";

async function chargerDonnees() {

  try {

    const response = await fetch(FORM_URL);

    const data = await response.json();

    console.log(data);

    const results = data.results || [];

    // Total
    document.getElementById("total").innerText = results.length;

    // Tableau
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