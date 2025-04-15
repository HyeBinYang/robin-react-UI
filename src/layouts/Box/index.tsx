import React from "react";
import createPolymorphicComponent from "@/utils/createPolymorphicComponent";

type Props = {};

const Box = createPolymorphicComponent<Props, "div">(({ as: Wrapper = "div", ...restProps }) => {
  return <Wrapper {...restProps} />;
});

export default Box;
