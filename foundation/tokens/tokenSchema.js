import { TokenTypes } from "./tokenTypes";

export function createToken({
  id,
  name,
  type = TokenTypes.COLOR,
  value,
  aliasTo = null,
  description = "",
  group = "General",
}) {
  if (!id || !name) {
    throw new Error("Token requires id and name");
  }

  return {
    id,
    name,
    type,
    value,
    aliasTo,
    description,
    group,
  };
}
