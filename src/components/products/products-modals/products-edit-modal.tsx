import { type ChangeEvent, useState } from 'react';
import type { ProductRequest } from '../../../../lib/types/product';
import { useCategoryContext } from '../../../contexts/categories/categories-context';
import { useStockContext } from '../../../contexts/stock/stock-context';
import Modal from '../../modals/modal';
import Input from '../../ui/input';
import Label from '../../ui/label';
import styles from './products-modal.module.css';

type EditModalProps = {
  resourceId: string;
};

export default function EditProductModal({ resourceId }: EditModalProps) {
  const { updateProduct, stock } = useStockContext();
  const { categories } = useCategoryContext();

  const currentStock = stock.find((stock) => stock.productResponseModel.resourceId === resourceId);
  const productToEdit = currentStock?.productResponseModel;

  const [name, setName] = useState(productToEdit?.name);
  const [description, setDescription] = useState(productToEdit?.description);
  const [price, setPrice] = useState<string>(String(productToEdit?.price));
  const [categoryResourceId, setCategoryResourceId] = useState(
    productToEdit?.categoryResponseModel.resourceId,
  );
  const [minimumQuantity, setMinimumQuantity] = useState<string>(
    String(currentStock?.minimumQuantity),
  );
  const [imageURL, setImageURL] = useState(productToEdit?.imageURL ?? '');
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (): boolean => {
    setError(null);

    const priceNumber = Number(price);
    const minimumQuantityNumber = Number(minimumQuantity);

    if (!name) {
      setError('Product name is required');
      return false;
    }

    if (!categoryResourceId) {
      setError('Select a category');
      return false;
    }

    if (!price || priceNumber <= 0) {
      setError('Price must be higher than 0');
      return false;
    }

    const newProduct: ProductRequest = {
      name,
      description,
      price: priceNumber,
      categoryResourceId,
      minimumQuantity: minimumQuantityNumber,
      imageURL,
    };

    updateProduct(resourceId, newProduct);
    return true;
  };

  return (
    <Modal
      title='Edit Product'
      action={handleEdit}
    >
      <Label htmlFor='name'>
        Name
        <Input
          name='name'
          id='name'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </Label>

      <Label htmlFor='description'>
        Description
        <Input
          name='description'
          id='description'
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
      </Label>

      <Label htmlFor='price'>
        Price
        <Input
          type='number'
          name='price'
          id='price'
          min={0}
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
        />
      </Label>

      <Label htmlFor='minimumQuantity'>
        Minimum Quantity
        <Input
          type='number'
          name='minimumQuantity'
          id='minimumQuantity'
          min={0}
          value={minimumQuantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMinimumQuantity(e.target.value)}
        />
      </Label>

      {categories.length === 0 ? (
        <p className={styles.warning}>
          There are no categories listed. Create a category before adding products.
        </p>
      ) : (
        <Label htmlFor='categoryResourceId'>
          Category
          <select
            className={styles.select}
            name='categoryResourceId'
            id='categoryResourceId'
            value={categoryResourceId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoryResourceId(e.target.value)}
          >
            <option value=''>--Selecct a category--</option>
            {categories.map((category) => (
              <option
                key={category.resourceId}
                value={category.resourceId}
              >
                {category.name}
              </option>
            ))}
          </select>
        </Label>
      )}
      <Label htmlFor='imageURL'>
        Image URL
        <Input
          name='imageURL'
          id='imageURL'
          value={imageURL}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setImageURL(e.target.value)}
        />
      </Label>

      {error && <p className={styles.error}>{error}</p>}
    </Modal>
  );
}
