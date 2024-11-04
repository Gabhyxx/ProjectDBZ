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