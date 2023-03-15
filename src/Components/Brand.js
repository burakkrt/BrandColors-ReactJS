import { useContext } from "react";
import { getContrastYIQ } from "./helpers";
import MainContext from "./MainContext";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Brand({ brand }) {
  const { selectedBrands, setSelectedBrands, colorCopied, setColorCopied } =
    useContext(MainContext);

  const toggleSelected = () => {
    if (selectedBrands.includes(brand.slug)) {
      setSelectedBrands(selectedBrands.filter((slug) => slug !== brand.slug));
    } else {
      setSelectedBrands([...selectedBrands, brand.slug]);
    }

    if (colorCopied.copied === true) {
      setColorCopied({ value: colorCopied.value, copied: false });
    }
  };

  return (
    <div
      className={`brand ${
        selectedBrands.includes(brand.slug) ? "selected" : ""
      }`}
    >
      <h5 onClick={toggleSelected}>{brand.title}</h5>
      <div className="brand-colors">
        {brand.colors.map((color, index) => (
          <CopyToClipboard
            text={color}
            onCopy={() => {
              setColorCopied({ value: color, copied: true });
            }}
            style={{
              "--bgColor": `#${color}`,
              "--textColor": `${getContrastYIQ(color)}`,
            }}
            key={index}
          >
            <span>{color}</span>
          </CopyToClipboard>
        ))}
      </div>
    </div>
  );
}
