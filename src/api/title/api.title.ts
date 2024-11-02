import api from "../index";

export interface ITitleData {
  createdAt?: string;
  deletedAt?: string;
  title: string;
  updatedAt?: string;
  uuid?: string;
}

export const addTitle = async (titleRequest: { title: string }) => {
  try {
    const response = await api.post("/title", titleRequest);
    return response.data;
  } catch (error) {}
};

export const getTitles = async (): Promise<ITitleData[] | []> => {
  try {
    const response = await api.get("/title");
    return response.data;
  } catch (error) {
    return [];
  }
};
