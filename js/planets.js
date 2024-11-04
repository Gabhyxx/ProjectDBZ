const requestPlanetURL = 'https://dragonball-api.com/api/planets?limit=100';

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