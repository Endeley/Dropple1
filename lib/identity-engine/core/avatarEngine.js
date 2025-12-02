export function createAvatar(style = "2d") {
  return { id: `avatar_${Math.random().toString(36).slice(2, 8)}`, style };
}

export function bindAvatar(identity, avatar) {
  identity.avatar = avatar;
  return identity;
}
