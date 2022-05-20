import { ModelXFactory } from "./model-x";

export const TeslaFactory = (model) => {
  switch (model) {
    case "ModelX":
      return ModelXFactory();
    default:
      throw new Error("Unsupported model");
  }
};
