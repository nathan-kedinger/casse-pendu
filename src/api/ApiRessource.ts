import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_URL_API ;
export async function handleResponseItem<T>(
  url: string
): Promise<T> {
    const response = await axios.get(baseUrl + url);
    return response.data;
}

export async function  handleResponseCollection<T>(
  url: string
): Promise<T[]> {
  const response = await axios.get(baseUrl + url);
  return response.data["hydra:member"];
      }
