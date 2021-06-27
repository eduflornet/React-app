import { useState, useEffect } from "react";
import logo from './logo.svg';
import './main-page.css';
import Header from './header';


function App() {
  const [allHouses, setAllHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      const rsp = await fetch("/houses.json");
      const houses = await rsp.json();
      setAllHouses(houses);
    };
    fetchHouses();
  }, []);

  let determineFeaturedHouse = () => {
  if (allHouses.length) {
    const randomIndex = Math.floor(Math.random() * allHouses.length);
    const featuredHouse = allHouses[randomIndex];
    this.setState({ featuredHouse })
  };
}

  return (
    <div className="container">
      <Header subtitle="Providing houses all over the world" />
    </div>
  );
}

export default App;
