import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  constructor(){
    super();

    this.state = {
      frontView: true
    }
  }

  findHP = () =>{
    let hpObject = this.props.pokemon.stats.find(stat => stat.name == 'hp');
    return hpObject.value
  }

  toggleView = () => {
    this.setState({frontView: !this.state.frontView})
  }

  render() {
    return (
      <Card>
        <div>
          <div className="image" onClick={this.toggleView}>
            <img src={this.state.frontView ? this.props.pokemon.sprites.front : this.props.pokemon.sprites.back} 
            alt="oh no!" 
            />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.findHP()}
            </span>
          </div>
        </div>

      </Card>
    )
  }
}

export default PokemonCard
