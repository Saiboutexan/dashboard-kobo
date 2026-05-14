const KOBO_CONFIG = {

  url: "https://script.google.com/macros/s/AKfycbwlIOdUDN3DpTf1knduCgLNXu8aitb1xKTd8fq30wdVi7xo9pibJA6b5YXAdFgB1tA/exec"

};

// ======================================
// CONNEXION KOBO
// ======================================

async function connectKobo() {

  try {

    console.log("🔄 Connexion Proxy Kobo...");

    const response = await fetch(
      KOBO_CONFIG.url,
      {
        method: "GET",
        cache: "no-cache"
      }
    );

    // ======================================
    // VERIFICATION HTTP
    // ======================================

    if (!response.ok) {

      throw new Error(
        `Erreur HTTP : ${response.status}`
      );

    }

    // ======================================
    // JSON
    // ======================================

    const data = await response.json();

    console.log("📦 DATA KOBO :", data);

    // ======================================
    // VERIFICATION DATA
    // ======================================

    if (!data) {

      throw new Error(
        "Aucune donnée reçue depuis le proxy"
      );

    }

    // ======================================
    // EXTRACTION RESULTATS
    // ======================================

    const records =
      Array.isArray(data.results)
        ? data.results
        : [];

    console.log(
      `📊 Nombre d'enregistrements : ${records.length}`
    );

    // ======================================
    // AUCUNE DONNEE
    // ======================================

    if (records.length === 0) {

      console.warn(
        "⚠️ Aucune donnée Kobo trouvée"
      );

      return;

    }

    // ======================================
    // MISE A JOUR DASHBOARD
    // ======================================

    if (typeof processData === "function") {

      processData(records);

      console.log(
        "✅ Dashboard mis à jour"
      );

    } else {

      console.error(
        "❌ processData() introuvable"
      );

    }

  } catch (error) {

    console.error(
      "❌ ERREUR API :",
      error
    );

    alert(
      "Erreur Proxy API : " +
      error.message
    );

  }

}

// ======================================
// DEMARRAGE AUTOMATIQUE
// ======================================

window.addEventListener(
  "DOMContentLoaded",
  () => {

    connectKobo();

    // ======================================
    // REALTIME
    // ======================================

    if (typeof startRealtime === "function") {

      startRealtime();

    }

  }
);