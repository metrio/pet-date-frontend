//Original variables
const petContainer = document.querySelector("#pet-collection");
const uRL = "http://localhost:3000/api/v1/pets";

function fetchPets() {
  fetch(uRL)
    .then((resp) => resp.json())
    .then((petArray) => {
      petArray.forEach((pet) => {
        renderPets(pet);
      });
    });
}

// EVENT HANDLERS
const petDetails = (e) => {
  if (e.target.matches(".deets")) {
    const id = e.target.dataset.id;
    console.log(id);
    fetch(`${uRL}/${id}`)
      .then((resp) => resp.json())
      .then((petObj) => {
        renderPet(petObj);
        console.log(petObj);
      });
  }
};

const renderPet = (petObj) => {
  showPet = document.querySelector("#show-pet");
  showPet.innerHTML = ""

  showPetText = document.createElement("p")

  const petName = document.createElement("h2");
  petName.textContent = petObj.name;

  const petBreed = document.createElement("h3");
  petBreed.textContent = petObj.breed;

  const petAge = document.createElement("h3");
  if (petObj.age > 1) {
    petAge.textContent = `${petObj.age} years`;
  } else {
    petAge.textContent = `${petObj.age} year`;
  }

  

  const petImg = document.createElement("img")
  petImg.src = petObj.img

  const petPersonality = document.createElement("h4");
  petPersonality.textContent = petObj.temper;

  showPetText.append( petName, petBreed, petAge, petPersonality);
  showPet.append(petImg, showPetText)
};

// EVENT LISTENERS

petContainer.addEventListener("click", petDetails);

const renderPets = (pet) => {
  const petDiv = document.createElement("div");
  const petImg = document.createElement("img");
  const petName = document.createElement("h2");
  const petType = document.createElement("h4");
  const petButton = document.createElement("button");

  petDiv.className = "card";

  petName.textContent = pet.name;
  petType.textContent = `Breed: ${pet.breed}`;

  petButton.classList.add("deets");

  petButton.textContent = "Pet Deets";
  petButton.dataset.id = pet.id;

  petImg.src = pet.img;
  petImg.alt = pet.name;
  petImg.className = "pet-avatar";

  // petUl.addEventListener("click", (e) => petPopUp(e.target["data-id"]))

  petDiv.append(petImg, petName, petButton, petType);

  petContainer.append(petDiv);
};

fetchPets();
