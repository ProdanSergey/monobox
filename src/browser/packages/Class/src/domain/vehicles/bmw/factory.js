import { M5Factory } from "./m5";

export const BMWFactory = (model) => {
  switch (model) {
    case "M5":
      return M5Factory();
    default:
      throw new Error("Unsupported model");
  }
};
