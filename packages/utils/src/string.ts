export const capitalize = (target: string): string => {
  return target
    .split(" ")
    .map((t) => t[0].toUpperCase() + t.slice(1))
    .join(" ");
};
