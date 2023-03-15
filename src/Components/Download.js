/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect } from "react";
import MainContext from "./MainContext";

//İcons
import {
  FcClearFilters,
  FcLink,
  FcDownload,
  FcBinoculars,
} from "react-icons/fc";

export default function Download() {
  const { selectedBrands, setSelectedBrands, brands } = useContext(MainContext);
  const [downloadURL, setDownloadURL] = useState();

  useEffect(() => {
    if (selectedBrands.length > 0) {
      let output = "";
      output +=
        "/* Visit us for the colors of the best brands.\nhttps://burakkrt-brand-colors.netlify.app*/\n\nroot{\n";
      // eslint-disable-next-line array-callback-return
      selectedBrands.map((slug) => {
        let brand = brands.find((brand) => brand.slug === slug);
        // eslint-disable-next-line array-callback-return
        brand.colors.map((color, key) => {
          output += `--${slug}-${key}: #${color};\n`;
        });
      });
      output += "}";
      const blob = new Blob([output]);
      const url = URL.createObjectURL(blob);
      setDownloadURL(url);
      return () => {
        URL.revokeObjectURL(url);
        setDownloadURL("");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrands]);

  const getLink = () => {
    if (selectedBrands.length > 0) {
      prompt(
        "Here's the URL to share",
        `https://burakkrt-brand-colors.netlify.app/collection/${selectedBrands.join(
          ","
        )}`
      );
    } else {
      alert("Please choose brand");
    }
  };

  return (
    <div className="download">
      <div className="download-item">
        <button
          type="button"
          className="action-button"
          onClick={() => {
            setSelectedBrands([]);
          }}
        >
          <FcClearFilters />
        </button>
        <p
          onClick={() => {
            setSelectedBrands([]);
          }}
        >
          Clear <strong>{selectedBrands.length}</strong> selected brands.
        </p>
      </div>
      <div className="download-item">
        <a
          href={selectedBrands.length > 0 ? downloadURL : null}
          download="brand-colors.css"
        >
          <FcDownload style={{ marginRight: "5px" }} /> Selected brands download
        </a>
      </div>
      <div className="download-item">
        <a
          href={selectedBrands.length > 0 ? downloadURL : null}
          target="_blank"
          rel="noreferrer"
          style={{ display: "block" }}
        >
          <FcBinoculars style={{ marginRight: "10px" }} />
          Show colors of selected brands
        </a>
      </div>
      <div className="download-item">
        <button type="button" className="action-button" onClick={getLink}>
          <FcLink />
        </button>
        <p onClick={getLink}>Create link for brands</p>
      </div>
    </div>
  );
}
