import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor (){
    super();

    this.state = {
      pokemons: [],
      searchResults: [],
      searchTerm: ''
    }
  }

  setSearchTerm = (query) => {
    this.setState({searchTerm: query})
  }

  getPokemon = () => {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(data => { this.setState({pokemons: data})})
  }

  componentDidMount(){
    this.getPokemon()
  }

  submitPokemon = (pokemon) => {
    fetch('http://localhost:3000/pokemon/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
    .then(res => res.json())
    .then(newPoke => {
     let newPokemons = this.state.pokemons.concat(newPoke);
     this.setState({pokemons: newPokemons})
    })
  }

  filterByName = (event) => {
    console.log(event.target.value)
    let searchTerm = event.target.value;

  

    let filteredPokemons = this.state.pokemons.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()))
    this.setState({searchResults: filteredPokemons, searchTerm: searchTerm})
    console.log(filteredPokemons)
  }

  render() {
    let displayPokemon = this.state.pokemons
    if (this.state.searchTerm.length > 0){
      displayPokemon = this.state.searchResults
    }
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm submitPokemon={this.submitPokemon}/>
        <br />
        <input type='text' onChange={this.filterByName}/>
        {/* <Search options={this.state.pokemons} onSearchChange={_.debounce((results) => {this.filterByName(results)}, 500)} children={this.state.pokemons}showNoResults={false} /> */}
        <br />
        <PokemonCollection pokemons={displayPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
