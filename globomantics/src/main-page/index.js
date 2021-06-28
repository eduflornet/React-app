import {
  Component
} from "react";
import './main-page.css';
import Header from './header';
import FeatureHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from '../search-results';
import HouseDetail from '../house';

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

  filterHouses = (country) => {
    this.setState({activeHouse: null});
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({filteredHouses});
    this.setState({country});
  }

  setActiveHouse = (house) => {
    this.setState({activeHouse: house});
  }



  render() {
    let activeComponent = null;
    if(this.state.country)
      activeComponent = <SearchResults country={this.state.country}
      filteredHouses = {this.state.filteredHouses} setActiveHouse={this.setActiveHouse} />;
    if(this.state.activeHouse)
      activeComponent = <HouseDetail house={this.state.activeHouse} />;
    if(!activeComponent)
      activeComponent = <FeatureHouse house={this.state.featuredHouse} />;

    if(this.state.hasError) {
      return <h1> Whoops! Sorry! </h1>;
    }
    return ( 
      <div className = "container" >
      <Header subtitle = "Providing houses all over the world" />
      <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses}/>
      <FeatureHouse house={this.state.featuredHouse}/>
    </div>
    );
  }
}

export default App;