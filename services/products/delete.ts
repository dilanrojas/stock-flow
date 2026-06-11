import { deleteJSON } from '../api';

const ENDPOINT = '/products';
export const deleteProduct = async (productResourceId: string): Promise<void> => {
  await deleteJSON(`${ENDPOINT}/${productResourceId}`);
};
