const petContainer = document.querySelector('#pet-collection')
// const petButton = document.querySelector(".card")

function fetchPets() { 
fetch("http://localhost:3000/api/v1/pets")
.then(resp => resp.json())
.then(petArray => {
    petArray.forEach(pet => {
        renderPets(pet)
    })
})
}

// EVENT HANDLERS
const petPopUp = (e) => {
  console.log(e.target)
}



const renderPets = (pet) => {
    const petUl = document.createElement('ul')
    const petImg = document.createElement('img')
    const petName = document.createElement('h2')
    const petType = document.createElement('h4')

    petUl.className = "card"
    petName.textContent = pet.name
    petType.textContent = `Breed: ${pet.breed}`
    
    petImg.src = pet.img 
    petImg.alt = pet.name
    petImg.className = "pet-avatar"

    petUl.addEventListener("click", (e) => petPopUp(e))

    petUl.append(petImg, petName, petType)
    petContainer.append(petUl)

}

fetchPets()