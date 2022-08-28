import pokemonApi from "@/api/pokemonApi";

const getPokemons = () => {
    const pokemonsArr = Array.from( Array(650) );
    
    return pokemonsArr.map((_, index) => {
        return index + 1
    })
}

const getPokemonOptions = async () => {

    //Mezclar el array de pokemons
    const mixedPokemons = getPokemons()
                            .sort(() => Math.random() - 0.5);
    return await getPokemonNames(mixedPokemons.splice(0,4))

    
}

//PArameters defines ids of our pokemons
const getPokemonNames = async ([a,b,c,d] = []) => {
    //Disparar las cuatro peticiones de manera simultanea
    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]
    const [p1,p2,p3,p4] = await Promise.all(promiseArr)

    return [
        {name:p1.data.name,id:p1.data.id},
        {name:p2.data.name,id:p2.data.id},
        {name:p3.data.name,id:p3.data.id},
        {name:p4.data.name,id:p4.data.id},
    ]
    /* console.log(a,b,c,d)
    const resp = await pokemonApi.get(`/1`)

    console.log(resp); */
}

export default getPokemonOptions;