import { Tooltip } from "antd";
import React from "react";

interface PropTypes {
  text: string;
  wordLimit?: number;
  className?: string;
  nobg?: boolean;
}
const CropTitle = ({
  wordLimit = 89,
  text = "",
  className,
  nobg = false,
}: PropTypes) => {
  const limitedText = text ? `${text.substring(0, wordLimit)}... ` : "";

  if (text?.length <= wordLimit) {
    return <p className={className}>{text}</p>;
  } else {
    return (
      <Tooltip title={text} placement="top" className={nobg ? "" : "bg-white"}>
        <p className={className}>{limitedText}</p>
      </Tooltip>
    );
  }
};

export default CropTitle;