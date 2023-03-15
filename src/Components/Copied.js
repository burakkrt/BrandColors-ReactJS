import React from "react";
import { getContrastYIQ, getCopiedMessageColor } from "./helpers";

export default function Copied({ color }) {
  const contrastConvert = getContrastYIQ(color);
  const messageBackgroundColorContrast = getCopiedMessageColor(color);

  return (
    <React.Fragment>
      <div
        className="copied"
        style={{
          "--bgCopied": `${contrastConvert}`,
          "--textColor": `${messageBackgroundColorContrast}`,
        }}
      >
        Copied{" "}
        <b className="copied-hex" style={{ "--copiedHex": `#${color}` }}>
          #{color}
        </b>{" "}
        to clipboard{" "}
      </div>
    </React.Fragment>
  );
}
