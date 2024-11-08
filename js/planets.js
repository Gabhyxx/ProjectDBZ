const requestPlanetURL = "https://dragonball-api.com/api/planets?limit=100";

async function fetchPlanetJSON()
{
    try
    {
        const response = await fetch(requestPlanetURL);
        if(!response.ok)
        {
            throw new Error(`Error en la petición al JSON ${response.status}`)
        }
        return await response.json();
    }
    catch(error)
    {
        console.error('Error al obtener los planetas de la API :', error);
        return null;
    }
}

function createPlanetCard({id, name, description, image})
{
    return `<div class="card" style="width: 35rem;">
            <img src="${image}" class="card-img-top planetImg" alt="...">
            <div class="card-body cardBody">
                <h5 class="card-title">${id} - ${name}</h5>
                <p class="card-text">${description}</p>
            </div>
        </div>`;
}

async function displayPlanets()
{
    const planetSection = document.getElementById("planetSection");
    const planetData = await fetchPlanetJSON();

    if (planetData && planetData.items)
    {
        const planetCards = planetData.items.map(createPlanetCard).join("");
        planetSection.innerHTML = planetCards;
    }
    else
    {
        planetSection.innerHTML = `<p>No se ha podido cargar el JSON de los planetas</p>`;
    }
}

displayPlanets();