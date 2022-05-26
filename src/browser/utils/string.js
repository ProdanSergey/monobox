import { ObjectNamespace } from "./fn";

const INTERPOLATION_REGEXP = /{{([^}]*?)}}/g;

const join = (chunks) => chunks.join("");

export const interpolate = (str, values, mapper = join) => {
  const chunks = str
    .split(INTERPOLATION_REGEXP)
    .filter(Boolean)
    .map((chunk) => (ObjectNamespace.hasProperty(values, chunk) ? values[chunk] : chunk));

  return mapper(chunks);
};
