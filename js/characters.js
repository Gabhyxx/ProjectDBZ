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

function createCharCard ({id, name, race, gender, image})
{
  return `<div class="card charCard" style="width: 20rem;">
            <img src="${image}" class="card-img-top charImg" alt="...">
            <div class="card-body charCardBody">
                <h5 class="card-title">${id} - ${name}</h5>
                <p class="card-text">${gender} - ${race}</p>
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