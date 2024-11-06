const requestCharURL = 'https://dragonball-api.com/api/characters?limit=100';

async function fetchCharactersJSON()
{
    try
    {
        const response = await fetch(requestCharURL);
        if(!response.ok)
        {
            throw new Error(`Error en la petición al JSON ${response.status}`)
        }
        return await response.json();
    }
    catch(error)
    {
        console.error('Error al obtener los personajes de la API :', error);
        return null;
    }
}

function createCharCard ({id, name, ki, maxKi, race, gender, description, image, affiliation})
{
  return `
    <div class="card mb-3 cardCharacter" style="max-width: 540px;">
    <div class="row g-0 cardFull">
      <div class="col-md-4">
        <img src="${image}" class="img-fluid rounded-start imgCharacter" alt="...">
      </div>
      <div class="col-md-8 cardText">
        <div class="card-body cardBody">
          <h5 class="card-title">${id} - ${name}</h5>
          <p class="card-text">KI: ${ki}</p>
          <p class="card-text"><small class="text-body-secondary">MaxKI: ${maxKi}</small></p>
        </div>
      </div>
    </div>
  </div>`;
}

async function displayCharacters()
{
    const characterSection = document.getElementById('characterSection');
    const characterData = await fetchCharactersJSON();
    
    if(characterData && characterData.items)
    {
        const characterCards = characterData.items.map(createCharCard);
        characterSection.innerHTML = characterCards;
    }
    else
    {
        characterSection.innerHTML = `<p>No se ha podido cargar el Json de los personajes</p>`
    }
}

displayCharacters();