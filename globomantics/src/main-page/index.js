import {
  Component
} from "react";
import './main-page.css';
import Header from './header';
import FeatureHouse from './featured-house';
import HouseFilter from './house-filter';
class App extends Component {

  // state = {} // another way to initialize the state

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.fetchHouses();
  }

  componentDidCatch(error, info){
    this.setState({hasError: true});
    console.error(error, info);
  }

  fetchHouses = () => {
    fetch('/houses.json')
    .then(rsp => rsp.json())
    .then(allHouses => {
      this.allHouses = allHouses;
      this.determineFeaturedHouse();
      this.determineUniqueConstries();
    })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses.length) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse })
    };
  }

  determineUniqueConstries = () => {
    const countries = this.allHouses 
    ? Array.from(new Set(this.allHouses.map(h=> h.country))) 
    : [];
    countries.unshift(null);
    this.setState({ countries });
  }



  render() {
    if(this.state.hasError) {
      return <h1> Whoops! Sorry! </h1>;
    }
    return ( 
      <div className = "container" >
      <Header subtitle = "Providing houses all over the world" />
      <HouseFilter countries={this.state.countries}/>
      <FeatureHouse house={this.state.featuredHouse}/>
    </div>
    );
  }
}

export default App;