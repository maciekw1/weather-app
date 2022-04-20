export const getUserLocation = async () => {
  const { coords: { longitude, latitude } } = await new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });

  return { longitude, latitude }
}
