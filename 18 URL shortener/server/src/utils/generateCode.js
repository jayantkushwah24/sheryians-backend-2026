export function generateCode() {
  const mainString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortCode = "";

  for (let i = 0; i < 6; i++) {
    const pickChar = Math.floor(Math.random() * mainString.length);

    shortCode = shortCode + mainString.charAt(pickChar);
  }

  return shortCode;
}
