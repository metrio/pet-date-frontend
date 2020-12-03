//Original variables
const petContainer = document.querySelector("#pet-collection")
const modal = document.querySelector(".modal-container")
const modalContent = document.querySelector(".modal-content")

let allDates;
let toggle = "hide"
toggleModal(toggle)

/** URL variables */
const petUrl = "http://localhost:3000/api/v1/pets"
const pdUrl = "http://localhost:3000/api/v1/playdates"

// INITIAL 
/** All Database Fetches */
function fetchPets() {
  fetch(petUrl)
    .then((resp) => resp.json())
    .then((petArray) => {
      petArray.forEach((pet) => {
        renderPets(pet)
      })
    })
}

// Fetch Data to render onto Modal
const petDetails = (id) => {
  fetch(`${petUrl}/${id}`)
    .then((resp) => resp.json())
    .then((petObj) => {
      renderPet(petObj)
    });
};

//fetch Delete Playdate
function deletePlaydate(id) {
 fetch(`${pdUrl}/${id}`, {
   method: `DELETE`,
   headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
   }
 })
 .then(resp => resp.json())
 .then(data => {
   
   li = document.querySelector(`li[data-id="${data.id}"]`)
   console.log(li)
 })
}


/** Buttons */
// Add Playdates button
modalContent.addEventListener("click", (event) => {
  if (event.target.matches("#pd-button")) {
    const id = event.target.dataset.id
    console.log(id)

    const newPlaydate = {
      pet_id: id,
      pet2_id: 121,
      date: "4.20.21",
      location: "Dumbo Park"
    }

    fetch(`${pdUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newPlaydate)
    })
      .then(response => response.json())
      .then(pdObj => {   //pd stands for playdate
          const li = document.createElement("li")
          li.textContent = `Date: ${pdObj.date}, Location: ${pdObj.location}`
          allDates.append(li)
      })        
  }
})

//delete button
modalContent.addEventListener("click", event => {
   if(event.target.matches(".pd-delete")) {
   const id = event.target.dataset.id
  deletePlaydate(id)}
})

/** Rendering Functions */

// Rendering Preliminary Data of all pets onto cards
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

  petButton.addEventListener("click", () => {
    toggleModal()  
    petDetails(pet.id)
    })

  petImg.src = pet.img
  petImg.alt = pet.name
  petImg.className = "pet-avatar"

  petDiv.append(petImg, petName, petButton, petType)

  petContainer.append(petDiv)
}


// renderPet renders inside top div to make edit/PATCH, possibly delete
const renderPet = (petObj) => {
    
  const petName = document.createElement("h2")
  const petBreed = document.createElement("h3")
  const petAge = document.createElement("h3")
  const showPetText = document.createElement("p")
  const petImg = document.createElement("img")
  const petPersonality = document.createElement("h4")
  const makePlaydateBtn = document.createElement("button")
  
  
  modalContent.innerHTML = ""
  petName.textContent = `Name: ${petObj.name}`
  petBreed.textContent = `Breed: ${petObj.breed}`
  petImg.src = petObj.img
  petPersonality.textContent = `Personality: ${petObj.temper}`
  
  // variable created so we can append playdates
  allDates = document.createElement("ul")
  allDates.textContent = "Playdates"

  makePlaydateBtn.textContent = "Wanna Play?"
  makePlaydateBtn.dataset.id = petObj.id
  makePlaydateBtn.id = ("pd-button")
  

  if (petObj.age > 1) {
    petAge.textContent = `Age: ${petObj.age} years old`
  } else {
    petAge.textContent = `Age; ${petObj.age} year old`
  }
  
  playDates(petObj)

  showPetText.append(petName, petBreed, petAge, petPersonality)
  modalContent.append(petImg, showPetText, allDates, makePlaydateBtn)
};


 // Iterates thru to render playdate info onto Modal
 function playDates(petObj) {
  petObj.playdates.forEach(playdate => {
    const date = document.createElement("li")
    const deleteBtn = document.createElement("button")

    deleteBtn.textContent = "Cancel Playdate"
    deleteBtn.dataset.id = playdate.id
    deleteBtn.className = "pd-delete"
    

    date.textContent = `Date: ${playdate.date}, Location: ${playdate.location}`
    date.append(deleteBtn)
    allDates.append(date)
  })
 
}

/** Modal Functions */
//Toggle modal
function toggleModal() {
  modal.classList.toggle(`${toggle}`)
  modalContent.classList.toggle(".show")
}

fetchPets()
