export default class BikeService {
  static async getStolenBike(id) {
    try {
      const response = await fetch(`https://bikeindex.org/api/v3/bikes/${id}?api_key=${process.env.API_KEY}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      return error.message;
    }
  }
}