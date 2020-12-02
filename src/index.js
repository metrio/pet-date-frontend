//Original variables
const petContainer = document.querySelector("#pet-collection")
const showPet = document.querySelector("#show-pet")

const uRL = "http://localhost:3000/api/v1/pets"

// INITIAL RENDER
function fetchPets() {
  fetch(uRL)
    .then((resp) => resp.json())
    .then((petArray) => {
      petArray.forEach((pet) => {
        renderPets(pet)
      })
    })
}

// EVENT HANDLERS
// fetch sends details of petObj so we can render to top div
const petDetails = (e) => {
  if (e.target.matches(".deets")) {
    const id = e.target.dataset.id
    // console.log(id);
    fetch(`${uRL}/${id}`)
      .then((resp) => resp.json())
      .then((petObj) => {
        renderPet(petObj)
        // console.log(petObj)
      });
  }
};

// renderPet renders inside top div to make edit/PATCH, possibly delete
const renderPet = (petObj) => {
  const showPet = document.querySelector("#show-pet")
  const petName = document.createElement("h2")
  const petBreed = document.createElement("h3")
  const petAge = document.createElement("h3")
  const showPetText = document.createElement("p")
  const petImg = document.createElement("img")
  const petPersonality = document.createElement("h4")
  // variable created so we can append playdates
  const allDates = document.createElement("ul")
  const makePlaydateBtn = document.createElement("button")

  showPet.innerHTML = ""
  petName.textContent = `Name: ${petObj.name}`
  petBreed.textContent = `Breed: ${petObj.breed}`
  petImg.src = petObj.img
  petPersonality.textContent = `Personality: ${petObj.temper}`
  allDates.textContent = "Playdates"
  makePlaydateBtn.textContent = "Wanna Play?"
  makePlaydateBtn.dataset.id = petObj.id


  if (petObj.age > 1) {
    petAge.textContent = `Age: ${petObj.age} years old`
  } else {
    petAge.textContent = `Age; ${petObj.age} year old`
  }


  // iterates thru to render playdate info
  function playDates(petObj) {
    petObj.playdates.forEach(playdate => {
      const date = document.createElement("li")
      // if (playdate !== [{}]) {

      date.textContent = `Date: ${playdate.date}, Location: ${playdate.location}`
      allDates.append(date)
      // }
      // else {
      //   date.textContent = "I don't have any playdates scheduled."
      //   allDates.append(date)
      // }
      // console.log(playdate)

    })
  }

  playDates(petObj)

  showPetText.append(petName, petBreed, petAge, petPersonality)
  showPet.append(petImg, showPetText, allDates, makePlaydateBtn)
};

// EVENT LISTENERS
petContainer.addEventListener("click", petDetails)
// update button
showPet.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    const id = event.target.dataset.id
    console.log(id)

    const newPlaydate = {
      petId: id,


    }

    fetch('http://localhost:3000/api/v1/playdates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newPlaydate),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })

  }
})


// render all pets to page
const renderPets = (pet) => {
  const petDiv = document.createElement("div")
  const petImg = document.createElement("img")
  const petName = document.createElement("h2")
  const petType = document.createElement("h4")
  const petButton = document.createElement("button")

  petDiv.className = "card"

  petName.textContent = pet.name
  petType.textContent = `Breed: ${pet.breed}`

  petButton.classList.add("deets")

  petButton.textContent = "Pet Deets"
  petButton.dataset.id = pet.id

  petImg.src = pet.img
  petImg.alt = pet.name
  petImg.className = "pet-avatar"

  petDiv.append(petImg, petName, petButton, petType)

  petContainer.append(petDiv)
}

fetchPets()
