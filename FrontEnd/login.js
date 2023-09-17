import { header, footer } from "./headerFooter.js";

document.addEventListener("DOMContentLoaded", function () {
  document.body.insertAdjacentHTML("afterbegin", header);

  //Formulaire Login
  const mainContent = `
    <main>
      <div id="container-login">
          <h2>Login</h2>
          <form id="form-login">
              <label for="email-login">Email:
              <input type="email" id="email-login" name="email-login" autocomplete="current-password">
              </label>
              <span id="email-error-login" class="error-message-login"></span>

              <label for="password-login">Mot de passe :
              <input type="password" id="password-login" name="password-login" autocomplete="current-password">
              </label>
              <span id="password-error-login" class="error-message-login"></span>

              <div class="bloc-show-password-login">
                  <label   for="show-password-login" class="show-password-login">Afficher le mot de passe
                  <input   type="checkbox" id="show-password-login" name="show-password-login"></div>
                  </label>
              <div id="error-message" class="error-message-login" style="display: none;"></div>
              <button type="button" id="button-login">Se connecter</button>
              <a href="#" id="password-forget-login">Mot de passe oublié</a>
          </form>
      </div>
    </main>
  `;
  document.body.insertAdjacentHTML("beforeend", mainContent);

  // Ajout du footer
  document.body.insertAdjacentHTML("beforeend", footer);

  // Connexion
  const loginButton = document.getElementById("button-login");
  const errorMessage = document.getElementById("error-message");
  const emailInput = document.getElementById("email-login");
  const passwordInput = document.getElementById("password-login");
  const showPasswordLogin = document.getElementById("show-password-login");

  showPasswordLogin.addEventListener("change", function () {
    if (this.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    const emailLogin = emailInput.value.trim();
    const passwordLogin = passwordInput.value.trim();

    // Réinitialisation des messages d'erreur
    errorMessage.textContent = "";
    errorMessage.style.display = "none";

    // Vérification des champs vides
    if (emailLogin === "" || passwordLogin === "") {
      errorMessage.textContent = "Veuillez remplir tous les champs.";
      errorMessage.style.display = "block";
      return;
    }

    const data = {
      email: emailLogin,
      password: passwordLogin,
    };

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            const token = data.token;
            // console.log("Token récupéré:", token);
            window.localStorage.setItem("token", token);
            // Si le token est valide
            window.localStorage.setItem("isLoggedIn", "true");
            window.location.href = "index.html";
          });
        } else if (response.status === 401) {
          // Erreur  401
          errorMessage.textContent = "Identifiants / mot de passe incorrects.";
          errorMessage.style.display = "block";
        } else {
          // autre erreur
          errorMessage.textContent =
            "Une erreur s'est produite. Veuillez réessayer plus tard.";
          errorMessage.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion au serveur:", error);
        console.log("La connexion au serveur a échoué.");
      });
  });
});
