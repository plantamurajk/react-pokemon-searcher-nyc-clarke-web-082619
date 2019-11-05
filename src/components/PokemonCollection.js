import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {

  renderCards = () => {
    return this.props.pokemons.map((poke, i) =>{
      return <PokemonCard pokemon={poke} key={i} />
    })

  }
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.renderCards()}
      </Card.Group>
    )
  }
}

export default PokemonCollection
