import { header, footer } from "./headerFooter.js";
document.addEventListener("DOMContentLoaded", function () {
  const token = window.localStorage.getItem("token");

  document.body.insertAdjacentHTML("afterbegin", header);
  // Page principale ---//
  const mainContent = `
    <div id="introduction">
      <figure>
        <img src="./assets/images/sophie-bluel.png" alt="">
        <div class="open-modal-intro open-modal-css hide-on-login">
        <div class="svg-black"></div>
        <a href="#" class="text-modifier">Modifier</a>
        </div>
      </figure>
      
      <article id="bloc-article">
        <h2 class="titre-introduction">Designer d'espace</h2>
        <p>Chaque projet sera étudié
          en commun, de façon à mettre en
          valeur les volumes, les matières
          et les couleurs dans le respect de
          l’esprit des lieux et le choix adapté
          des matériaux. Le suivi du chantier sera
          assuré dans le souci du détail, le respect
          du planning et du budget.</p>
        <p>Je raconte votre histoire, je
          valorise vos idées. Je vous accompagne
          de la conception à la livraison finale du chantier.</p>
        <p>En cas de besoin, une équipe pluridisciplinaire
          peut être constituée : architecte DPLG,
          décorateur(trice)</p>
      </article>
    </div>

    <section id="portfolio">
      <div class="bloc-btn-modifier-svg">
        <h2 class="title-portfolio">Mes projets</h2>
        <div class="open-modal-portfolio open-modal-css hide-on-login  ">
        <div class="svg-black"></div>
        <a href="#" class="text-modifier">Modifier</a>
      </div>
      </div>
      <div id="btn-categories"></div>
      <div class="gallery"></div>
    </section>

   <section id="contact">
      <h2 id="contactTitre">Contact</h2>
      <p id="contactText">Vous avez un projet ? Discutons-en !</p>
      <form action="#" method="#">
        <label for="name">Nom
        <input type="text" name="name" id="name">
        <span id="name-error" class="error"></span>
        </label>
        <label for="email">Email
        <input type="email" name="email" id="email">
        <span id="email-error" class="error"></span>
        </label>
        <label for="message">Message       
        <textarea  name="message" id="message"></textarea>
        <span id="message-error" class="error"></span>
        </label>
        <input type="submit" value="Envoyer">
      </form>
    </section>
  `;
  const mainElement = document.querySelector("main");
  mainElement.insertAdjacentHTML("beforeend", mainContent);

  const openModal1 = document.querySelector(".open-modal-intro");
  openModal1.addEventListener("click", function (event) {
    event.preventDefault();
    modal1.style.display = "block";
  });

  const openModalPortfolio = document.querySelector(".open-modal-portfolio");
  openModalPortfolio.addEventListener("click", function (event) {
    event.preventDefault();
    modal1.style.display = "block";
  });

  document.body.insertAdjacentHTML("beforeend", footer);
  const connexionReussi = window.localStorage.getItem("isLoggedIn");
  if (connexionReussi === "true") {
    const hideOnLoginElements = document.querySelectorAll(".hide-on-login");
    hideOnLoginElements.forEach((element) => {
      element.classList.remove("hide-on-login");
    });

    const loginButton = document.querySelector(".login-link");
    if (loginButton) {
      loginButton.style.display = "none";
    }
  }

  const logoutButton = document.querySelector(".show-logout");
  logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.localStorage.clear();
    window.localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  });

  // MODAL-HTML
  const modalContent = `
  <!--MODAL-->
  <div id="modal-1" class="modal">
    <div class="modal-content">
      <p class="txt-ajout-photo">Galerie photo</p>
      <span class="close-modal">X</span>
     
      <div class="btn-modal-ajout-suprim">
      <hr class="separator1">
        <p class="btn-ajout-photo">Ajouter photo</p>
        <button class="delete-gallery-button">Supprimer la galerie</button>
      </div>
      <div class="gallery-modal modal-gallery">
      </div>
    </div>
  </div>
  
  <!-- MODALE-2 -->
<div id="modal-2" class="modal-2">
  <div class="modal-content">
  <!-- Bouton pour fermer la modal-->
  <span class="close-modal">X</span>
  <!-- Bouton pour aller sur la modal1 
  <span class="retour-modal1"></span>-->
  <a href="#" class="link-page">
    <i class="fa-solid fa-circle-left"></i>
</a>
    <p class="txt-ajout-photo">Ajout photo</p>
    <!-- Fond gris -->
    <div class="rectangle">
    <div class="box-rectangle">
    <p class="picture-image-svg" id="selected-image"></p>
      <label for="upload-image" class="custom-file-label">
        <input type="file" accept="image/*" id="upload-image" class="upload-image" style="display: none;" />
      </label>
      <p class="info-image">jpg - png : 4Mo max</p>
      </div>
    </div>
    <div class="bloc-titre-categories">
      <label for="titre" class="titre">Titre</label>
      <input type="text" id="titre" class="input-field" placeholder="Ajouter un titre">

      <!-- Champ Catégories -->
      <label for="categorie" class="titre">Catégories</label>
      <select id="categorie" class="select-field">
        <option value="" disabled selected>Sélectionner une catégorie</option>
        <option value="cat1">Catégorie 1</option>
        <option value="cat2">Catégorie 2</option>
        <option value="cat3">Catégorie 3</option>
      </select>
    </div>
    <hr class="separator2">
    <!-- Bouton Valider -->
    <button type="submit" class="submit-button">Valider</button>

    <!-- Message d'erreur -->
    <p id="error-message" class="error-message"></p>
  </div>
</div>

  `;
  const modalElement = document.querySelector("main");
  modalElement.insertAdjacentHTML("beforeend", modalContent);
  const modal1 = document.getElementById("modal-1");
  const galleryModal = document.querySelector(".gallery-modal");

  ////MODAL-1
  const deleteGalleryButton = document.querySelector(".delete-gallery-button");
  deleteGalleryButton.addEventListener("click", function () {
    galleryModal.innerHTML = "";
  });
  function elementIconCorbeillee(figure, imageUrl, imageId, token) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "";
    figure.appendChild(img);

    const iconCorbeille = document.createElement("span");
    const iconCorbeilleHTML =
      '<span><i class="fa-regular fa-trash-can"></i></span>';
    iconCorbeille.innerHTML = iconCorbeilleHTML;
    figure.appendChild(iconCorbeille);

    // pour supprimer l'image et le titre
    iconCorbeille.addEventListener("click", function () {
      supprimerImage(imageId, token); // suppression avec l'ID de l'image
      figure.remove(); // Supprimez la figure du DOM
    });
  }

  function supprimerImage(imageId, token) {
    //  pour supprimer l'image du serveur
    fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // jeton d'authentification
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(
            `Image avec l'ID ${imageId} supprimée avec succès du serveur.`
          );
          removeImageFromPage(imageId);
        } else {
          console.error(
            `Échec de la suppression de l'image avec l'ID ${imageId} du serveur.`
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'image :", error);
      });
  }
  function removeImageFromPage(imageId) {
    const imageElement = document.querySelector(`[data-image-id="${imageId}"]`);
    if (imageElement) {
      imageElement.remove();
    }
  }
  const btnAjoutPhoto = document.querySelector(".btn-ajout-photo");
  btnAjoutPhoto.addEventListener("click", function () {
    modal2.style.display = "block";
  });
  // MODAL-2
  const modal2 = document.getElementById("modal-2");
  const retourModal1Button = document.querySelector(".link-page");
  retourModal1Button.addEventListener("click", function () {
    modal2.style.display = "none";
    modal1.style.display = "block";
  });

  // éléments avec la classe "close-modal"
  const closeModalButtons = document.querySelectorAll(".close-modal");
  closeModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal1) {
      modal1.style.display = "none";
    }
    if (event.target === modal2) {
      modal2.style.display = "none";
    }
  });

  const uploadImageInput = document.getElementById("upload-image");
  const selectedImageElement = document.getElementById("selected-image");

  uploadImageInput.addEventListener("change", function () {
    const selectedImage = uploadImageInput.files[0];
    if (selectedImage) {
      // Vérification du format de l'image
      if (!/\.png$|\.jpg$/i.test(selectedImage.name)) {
        errorMessageElement.textContent =
          "Le format de l'image doit être .png ou .jpg";
        selectedImageElement.innerHTML = "";
        uploadImageInput.value = ""; // Effacez la sélection de fichier incorrecte
        return;
      }

      // Vérification de la taille de l'image
      if (selectedImage.size > 4 * 1024 * 1024) {
        // 4 Mo
        errorMessageElement.textContent = "L'image ne doit pas dépasser 4 Mo.";
        selectedImageElement.innerHTML = "";
        uploadImageInput.value = ""; // Effacez la sélection de fichier incorrecte
        return;
      }
      const imageUrl = URL.createObjectURL(selectedImage);
      selectedImageElement.innerHTML = `<img src="${imageUrl}" alt="Selected Image" />`;
      errorMessageElement.textContent = ""; // Effacez le message d'erreur s'il y en avait un
    } else {
      selectedImageElement.innerHTML = "";
    }
  });

  const submitButton = document.querySelector(".submit-button");
  submitButton.addEventListener("click", async () => {
    const title = document.getElementById("titre").value;
    const categoryId = document.getElementById("categorie").value;
    console.log(title, categoryId);
    const uploadImageInput = document.getElementById("upload-image");

    console.log(token);
    // Vérification des champs obligatoires
    if (!title || !categoryId || !uploadImageInput.files[0]) {
      errorMessageElement.textContent =
        "Veuillez remplir tous les champs obligatoires !";
      return;
    }

    const formData = new FormData();
    formData.append("image", uploadImageInput.files[0]);
    formData.append("title", title);
    formData.append("token", token);
    formData.append("category", "1");
    formData.append("userId", 1);
    console.log(formData);

    try {

      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const newImage = await response.json();
        ajouterImageAGalerie(title, categoryId, newImage.imageUrl);

        //  verification
        rectangleImage.src = newImage.imageUrl;
        rectangleImage.alt = title;
        // Fermez la modal
        modal2.style.display = "";
      } else {
        console.error("Échec de l'envoi de l'image");
      }
    } catch (error) {
      console.error("Erreur inattendue:", error);
    }
  });

  const errorMessageElement = document.getElementById("error-message");
  // Requete gallery modal
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      galleryModal.innerHTML = "";
      data.forEach((gallery) => {
        const figure = document.createElement("figure");
        figure.dataset.categoryId = gallery.categoryId;
        elementIconCorbeillee(figure, gallery.imageUrl, gallery.id, token);
        galleryModal.appendChild(figure);

        const editButton = document.createElement("button");
        editButton.textContent = "éditer";
        editButton.classList.add("edit-image-button");
        editButton.dataset.imageId = gallery.id;
        figure.appendChild(editButton);
      });
    })
    .catch((error) => {
      console.log(
        "Une erreur s'est produite lors de la récupération des galeries:",
        error
      );
    });

  // Requete galerie accueil et catégories
  Promise.all([
    fetch("http://localhost:5678/api/works").then((response) =>
      response.json()
    ),
    fetch("http://localhost:5678/api/categories").then((response) =>
      response.json()
    ),
  ])
    .then((data) => {
      const worksData = data[0];
      const categoriesData = data[1];

      const galleryModal = document.querySelector(".gallery");
      galleryModal.innerHTML = ""; // Efface le contenu actuel de la galerie

      worksData.forEach((gallery) => {
        const figure = document.createElement("figure");
        figure.dataset.imageId = gallery.id;
        const img = document.createElement("img");
        img.src = gallery.imageUrl;
        img.alt = gallery.title;
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = gallery.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.dataset.categoryId = gallery.categoryId;
        galleryModal.appendChild(figure);
      });

      const btnCategories = document.getElementById("btn-categories");

      const allButton = document.createElement("button");
      allButton.textContent = "Tous";
      allButton.dataset.categoryId = "all";
      allButton.addEventListener("click", () => {
        const galleryItems = document.querySelectorAll(".gallery figure");
        galleryItems.forEach((item) => {
          item.style.display = "block";
        });
      });

      btnCategories.appendChild(allButton);

      categoriesData.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.dataset.categoryId = category.id;
        button.addEventListener("click", () => {
          const categoryId = category.id;
          const galleryItems = document.querySelectorAll(".gallery figure");
          galleryItems.forEach((item) => {
            const itemCategoryId = item.dataset.categoryId;
            if (
              itemCategoryId === categoryId.toString() ||
              categoryId === "all"
            ) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        });
        btnCategories.appendChild(button);
      });
    })
    .catch((error) => {
      console.log("Une erreur s'est produite :", error);
    });
});
