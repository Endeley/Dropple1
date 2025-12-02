import generateReact from "./react";

export default function generateNextjs(payload) {
  const component = generateReact(payload);
  return `${component}

export const metadata = {
  title: "Dropple Export",
};
`;
}
