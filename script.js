const FORM_URL = "https://script.google.com/macros/s/AKfycbxJKVbECtzabq5SwQAq0I3lIGhPOOmYCszsr6KTFBDTHwFcepHe0jBORgQ-UZZ8LE8jzA/exec";

async function chargerDonnees() {

  try {

    const response = await fetch(FORM_URL);

    const data = await response.json();

    console.log(data);

    const results = data.results || [];

    // TOTAL
    document.getElementById("total").innerText = results.length;

    // TABLEAU
    const tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

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

    console.error(error);

    alert(error.message);

  }

}

chargerDonnees();