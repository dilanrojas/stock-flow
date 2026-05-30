const API_URL = import.meta.env.VITE_API_URL;

export const fetchAPI = async (endpoint: string): Promise<[]> => {
  if (!API_URL) {
    throw new Error('No API URL provided');
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Error while fetching ${endpoint}`);
    }

    const data = response.json();
    return data;

  } catch (error) {
    console.log(`Error: ${error}`);
    return [];
  }
}
