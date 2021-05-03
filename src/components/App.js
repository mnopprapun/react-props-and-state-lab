import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all', 
      }
    }
  }


  // i consoled loged to i can see the information to use first
  // lab requires to select specific data to show such as cat and dog first when the option is selected
  onFindPetsClick = () => {
    let url = "/api/pets"
    if (this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`
    }

    fetch(url)
      .then(res => res.json())
      .then(pets => this.setState({ pets: pets}))
  }
  // .then(pets => console.log(pets))}

  // function for option change pet type
  onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } })
  }

onAdoptPet = petId => {
  let pets = this.state.pets.map(p => {
    return p.id === petId ? { ...p, isAdopted: true } : p;
  });
  this.setState({pets: pets});
}

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onFindPetsClick={this.onFindPetsClick}
                onChangeType={this.onChangeType} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
