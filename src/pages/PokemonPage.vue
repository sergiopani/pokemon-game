<template>
    <div>
        <!--Si no hay pokemon se va a mostrar el div de cargando-->
        <div v-if="!pokemon">Espere por favor.....</div>
        <div v-else>
            <h1>¿Quien es este pokémon?</h1>
            <!--IMG-->
            <PokemonPicture :pokemon-id="pokemon.id" :showPokemon="showPokemon" />
            <!--OPCIONES-->
            <PokemonOptions :pokemons="pokemonArr" @selection-pokemon="checkAnswer($event)" />
            <template v-if="showAnswer">
                <h2 class="fade-in">{{ message }}</h2>
                <button @click="newGame()">Nuevo Juego</button>
            </template>
        </div>

    </div>
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '@/components/PokemonPicture.vue';

import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
    name: 'PokemonPage',
    components: {
        PokemonOptions,
        PokemonPicture,

    },
    data () {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPodemonArray () {
            this.pokemonArr = await getPokemonOptions();

            const rndInt = Math.floor(Math.random() * 4)

            this.pokemon = this.pokemonArr[rndInt];
        },
        checkAnswer (pokemonId) {
            this.showPokemon = true;
            this.showAnswer = true;
            if (this.pokemon.id === pokemonId) {

                this.message = `Correcto, ${this.pokemon.name}`
            } else {
                this.message = `Oops era...., ${this.pokemon.name}`
            }
        },
        newGame () {
            this.showPokemon = false;
            this.showAnswer = false;
            this.pokemonArr = [];
            this.pokemon = null;
            this.mixPodemonArray();
        }

    },
    mounted () {
        this.mixPodemonArray()
    },

}
</script>

<style>
</style>