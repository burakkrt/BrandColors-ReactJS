import React, { useEffect, useState } from "react";
import MainContext from "./Components/MainContext";
import Sidebar from "./Components/Sidebar";
import Content from "./Components/Content";
import BrandsData from "./Components/brands.json";
import Copied from "./Components/Copied";
import Collection from "./Components/Collection";
// Router
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  const brandsArray = [];
  Object.keys(BrandsData).map((key) => {
    return brandsArray.push(BrandsData[key]);
  });

  const [brands, setBrands] = useState(brandsArray);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [colorCopied, setColorCopied] = useState({
    value: "",
    copied: false,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (colorCopied.copied === true) {
      const copiedMessageTimeout = setTimeout(() => {
        setColorCopied({ value: colorCopied.value, copied: false });
      }, 1000);

      return () => {
        clearTimeout(copiedMessageTimeout);
      };
    }
  });

  useEffect(() => {
    const filterBrands = brandsArray.filter((brand) =>
      brand.title.toLowerCase().includes(search.toLowerCase())
    );
    setBrands(filterBrands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const data = {
    brands,
    selectedBrands,
    setSelectedBrands,
    colorCopied,
    setColorCopied,
    setSearch,
  };

  return (
    <React.Fragment>
      <MainContext.Provider value={data}>
        {colorCopied.copied && <Copied color={colorCopied.value} />}
        <Sidebar />
        <Router>
          <Routes>
            <Route path="/" exact element={<Content />}></Route>
            <Route path="/collection/:slugs" element={<Collection />}></Route>
          </Routes>
        </Router>
      </MainContext.Provider>
    </React.Fragment>
  );
}

export default App;
