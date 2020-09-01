interface IApi {
    request: (url: string, params: {} | any) => Promise<any>,
};

const API_URL = `http://localhost:4000/api`; // change me before deploy to heroku

export default class Api implements IApi {
    request = async (url: string, params = {}) => {  
      const defaultParams = {
        headers: {
          'Content-Type': "application/json",
        }
      }
  
      const response = await fetch(
        `${API_URL}/${url}`,
        Object.assign(defaultParams, params),
      );
  
      const json = await response.json();
      
      if (!response.ok) {
        throw new Error(`Failed to fetch, ${JSON.stringify(json)}`);
      }
      
      return json;
    }
  }