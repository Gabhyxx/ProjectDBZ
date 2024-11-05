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
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="..." class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
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