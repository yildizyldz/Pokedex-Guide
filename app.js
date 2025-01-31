const poke_container = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");

const pokemon_count = 20; // Kaç Pokémon verisi çekileceğini burada belirleyebilirsiniz

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

// Arama butonuna tıklanıldığında arama kısmını gösterme veya gizleme
searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

searchInput.addEventListener("input", (e) => {
  //console.log(searchInput.value);
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");

  //console.log(pokemonNames);

  pokemonNames.forEach((pokemonName) => {
    pokemonName.parentElement.parentElement.style.display = "black";

    if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = "none";
    }
  });
});

// Pokémon verilerini çekmek için fonksiyon
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i); // Pokémon verisini her bir id için çekiyoruz
  }
};

// Pokémon verilerini çekme ve işleme
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`; // API URL'si
  const res = await fetch(url); // Fetch ile API'den veri çekiyoruz
  const data = await res.json();
  console.log(data); // Gelen veriyi JSON formatına çeviriyoruz

  createPokemonCard(data); // Pokémon'u ekrana basıyoruz
};
const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");
  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name;
  const pokemonBg = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;
  const pokemonDivInnerHTML = `  
        <div class="image-container">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
              alt="Pokemon 1 image"
            />
        </div>
        <div class="poke-info">
          <span class="poke-id"># ${pokemonId}</span>
          <h3 class="poke-name"> ${pokemon.name}</h3>
          <div class="small">
            <small class="poke-exp"
              ><i class="fa-solid fa-flask"></i> <span> ${pokemon.base_experience}</span></small
            >
            <small class="poke-weight"
              ><i class="fa-solid fa-weight-scale"></i> <span> ${pokemon.weight}</span></small
            >
          </div>
          <div class="poke-type"></d>
            <i class="fa-brands fa-uncharted"></i> ${pokemonType} <span></span>
          </h5>
        </div>
      </div>
  `;
  pokemonDiv.innerHTML = pokemonDivInnerHTML;
  poke_container.appendChild(pokemonDiv);
};
fetchPokemons();
