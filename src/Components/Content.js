import React, { useContext } from "react";
import Search from "./Search";
import Brand from "./Brand";
import MainContext from "./MainContext";
import LazyLoad from "react-lazy-load";

export default function Content() {
  const { brands } = useContext(MainContext);

  return (
    <main className="content">
      <div className="header">
        <Search />
      </div>
      <section className="brands">
        {brands.map((brand, index) => (
          <LazyLoad key={index} offset={100} height={115}>
            <Brand brand={brand} key={index} />
          </LazyLoad>
        ))}
        <span></span>
      </section>
    </main>
  );
}
