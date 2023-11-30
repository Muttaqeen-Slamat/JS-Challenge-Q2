// let cardContainer = document.querySelector('[data-cards]') 
// fetch('https://randomuser.me/api?results=20')
// .then(data=> data.json())
// .then(result=> {
//     let {results} = result 
//     results.forEach( people =>{
//         console.log(people);
//         cardContainer.innerHTML += 
//         `
//         <div class="card" style="width: 18rem;">
//             <img src="${people.picture.large}" class="card-img-top img-fluid" alt="${people.name.first}">
//             <div class="card-body">
//             <h5 class="card-title">${people.name.title}. ${people.name.first} ${people.name.last}</h5>
//             <p class="card-text">Age: ${people.registered.age}</p>
//         </div>
//         `
//     })
// })


let cardContainer = document.querySelector('[data-cards]');
let nameInput = document.getElementById('nameInput');
let sortToggle = document.getElementById('sortToggle');
let peopleData = [];

// Fetch initial data
fetch('https://randomuser.me/api?results=20')
  .then(data => data.json())
  .then(result => {
    peopleData = result.results;
    displayPeople(peopleData);
  });

// Event listener for name input
nameInput.addEventListener('input', handleNameSearch);

// Event listener for sorting button
sortToggle.addEventListener('click', toggleSort);

function displayPeople(people) {
  cardContainer.innerHTML = '';

  if (people.length === 0) {
    cardContainer.innerHTML = '<p>No results found</p>';
  }

  people.forEach(people => {
    cardContainer.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${people.picture.large}" class="card-img-top img-fluid" alt="${people.name.first}">
            <div class="card-body">
            <h5 class="card-title">${people.name.title}. ${people.name.first} ${people.name.last}</h5>
            <p class="card-text">Age: ${people.registered.age}</p>
        </div>
    `;
  });
}

function handleNameSearch() {
  let searchTerm = nameInput.value.toLowerCase();

  let filteredPeople = peopleData.filter(person =>
    person.name.first.toLowerCase().includes(searchTerm)
  );

  if (searchTerm === '') {
    displayPeople(peopleData);
  } else {
    displayPeople(filteredPeople);
  }
}

function toggleSort() {
  let sortedPeople = [...peopleData];
  sortedPeople.reverse();
  displayPeople(sortedPeople);
}