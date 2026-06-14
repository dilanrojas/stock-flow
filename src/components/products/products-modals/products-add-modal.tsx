import { type ChangeEvent, useState } from 'react';
import type { ProductRequest } from '../../../../lib/types/product';
import { useStockContext } from '../../../contexts/stock/stock-context';
import { useCategoryContext } from '../../../contexts/categories/categories-context';
import Modal from '../../modals/modal';
import Input from '../../ui/input';
import Label from '../../ui/label';
import styles from './products-modal.module.css'

export default function AddProductModal() {
  const { addProduct } = useStockContext();
  const { categories } = useCategoryContext();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [categoryResourceId, setCategoryResourceId] = useState<string>('');
  const [minimumQuantity, setMinimumQuantity] = useState<string>('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (): boolean => {
    setError(null);
    const priceNumber = Number(price)
    const minimumQuantityNumber = Number(minimumQuantity)
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

    addProduct(newProduct);
    return true;
  };

  return (
    <Modal title='Add Product' action={handleAdd}>
      <Label htmlFor='name'>
        Name
        <Input
          placeholder='Product name'
          name='name'
          id='name'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </Label>

      <Label htmlFor='description'>
        Description
        <Input
          placeholder='Optional description for the product'
          name='description'
          id='description'
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
      </Label>

      <Label htmlFor='price'>
        Price
        <Input
          placeholder='0'
          type='number'
          name='price'
          id='price'
          min={0}
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice((e.target.value))}
        />
      </Label>

      <Label htmlFor='minimumQuantity'>
        Minimum Quantity
        <Input
          placeholder='0'
          type='number'
          name='minimumQuantity'
          id='minimumQuantity'
          min={0}
          value={minimumQuantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMinimumQuantity((e.target.value))}
        />
      </Label>

      {categories.length === 0 ? (
        <p className={styles.warning}>There are no categories listed. Create a category before adding products.</p>
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
              <option key={category.resourceId} value={category.resourceId}>
                {category.name}
              </option>
            ))}
          </select>
        </Label>


      )}



      <Label htmlFor='imageURL'>
        Image URL
        <Input
          placeholder='http://image-example'
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