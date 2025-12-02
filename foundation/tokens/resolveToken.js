export function resolveTokenValue(tokenId, tokens, themeValues) {
  if (!tokenId || !tokens) return null;
  const token = tokens[tokenId];
  if (!token) return null;

  if (themeValues && Object.prototype.hasOwnProperty.call(themeValues, tokenId)) {
    return themeValues[tokenId];
  }

  if (token.aliasTo) {
    return resolveTokenValue(token.aliasTo, tokens, themeValues);
  }

  return token.value;
}
