export default class BikeService {
  static async getBikeDetails(id) {
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
  static async getStolenBike(location) {
    try {
      const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=5&location=${location}&distance=10&stolenness=proximity&?api_key=${process.env.API_KEY}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      return error.message;
    }
  }
}