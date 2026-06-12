import { deleteJSON } from '../api';

const ENDPOINT = '/categories';
export const deleteCategory = async (categoryResourceId: string): Promise<void> => {
  await deleteJSON(`${ENDPOINT}/${categoryResourceId}`);
};
