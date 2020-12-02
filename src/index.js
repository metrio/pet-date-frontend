const petContainer = document.querySelector('#pet-collection')

function fetchPets() { 
fetch("http://localhost:3000/api/v1/pets")
.then(resp => resp.json())
.then(petArray => {
    petArray.forEach(pet => {
        renderPets(pet)
    })
})
}


const renderPets = (pet) => {
    const petUl = document.createElement('ul')
    const petImg = document.createElement('img')

    petUl.className = "card"
    
    petImg.src = pet.img 
    petImg.alt = pet.name
    petImg.className = "pet-avatar"

    petUl.append(petImg)
    petContainer.append(petUl)

}

fetchPets()