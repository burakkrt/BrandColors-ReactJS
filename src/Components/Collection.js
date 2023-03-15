import React, { useContext } from "react";
import LazyLoad from "react-lazy-load";
import Brand from "./Brand";
import MainContext from "./MainContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Collection() {
  const { setSelectedBrands, selectedBrands, brands } = useContext(MainContext);

  const { slugs } = useParams();

  useEffect(() => {
    setSelectedBrands(slugs.split(","));
  }, []);

  return (
    <main className="content">
      <div className="header"></div>
      <section className="brands">
        {selectedBrands.map((slug, index) => {
          let brand = brands.find((brand) => brand.slug === slug);
          return (
            <LazyLoad key={index} offset={100} height={115}>
              <Brand brand={brand} key={index} />
            </LazyLoad>
          );
        })}
        <span></span>
      </section>
    </main>
  );
}
