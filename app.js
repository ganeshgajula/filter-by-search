const charactersList = document.querySelector("#charactersList");
const searchBar = document.querySelector("#searchBar");
let hpCharacters = [];

searchBar.addEventListener("keyup", (event) => {
  const searchString = event.target.value.toLowerCase();
  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const response = await fetch("http://hp-api.herokuapp.com/api/characters");
    hpCharacters = await response.json();
    displayCharacters(hpCharacters);
    // console.log(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
    <li class = "character">
      <h2>${character.name}</h2>
      <p>House: ${character.house}</p>
      <img src="${character.image}"></img>
    `;
    })
    .join("");

  charactersList.innerHTML = htmlString;
};

loadCharacters();
