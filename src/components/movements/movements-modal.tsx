import { type ChangeEvent, useState } from 'react';
import type { MovementRequest } from '../../../lib/types/movement';
import { useMovements } from '../../contexts/movements/movements-context';
import { useStockContext } from '../../contexts/stock/stock-context';
import Modal from '../modals/modal';
import Input from '../ui/input';
import Label from '../ui/label';

const TypeSelectButton = ({
  active,
  label,
  onClick,
}: {
  active?: boolean;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${active ? 'bg-(--accent) text-white' : ''} w-full h-full text-sm py-2 rounded-2xl transition-colors font-medium`}
    >
      {label}
    </button>
  );
};

export default function MovementsModal() {
  const { addMovement } = useMovements();
  const { stock } = useStockContext();

  const [stockId, setStockId] = useState<string>('');
  const [type, setType] = useState<'inflow' | 'outflow'>('inflow');
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  const handleAdd = (): boolean => {
    setError(null);

    if (!stockId) {
      setError('Select a product');
      return false;
    }

    if (!note) {
      setError('Write a note');
      return false;
    }

    if (quantity <= 0) {
      setError('Quantity must be greater than zero');
      return false;
    }

    const signedQuantity = type === 'inflow' ? quantity : -Math.abs(quantity);

    const newMovement: MovementRequest = {
      stockResourceId: stockId,
      note,
      quantity: signedQuantity,
    };

    addMovement(newMovement);

    return true;
  };

  return (
    <Modal
      title='New movement'
      action={handleAdd}
    >
      {/* TODO: Waiting for products fetching */}
      <Label htmlFor='product-select'>
        Inventory product
        {stock.length > 0 && (
          <select
            name='products'
            id='product-select'
            onChange={(e) => setStockId(e.target.value)}
            style={{
              border: '1px solid var(--border-input)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--rounded)',
            }}
          >
            <option value=''>--Please choose an option--</option>
            {stock.map((stock) => (
              <option
                key={stock.resourceId}
                value={stock.resourceId}
              >
                {stock.productResponseModel.name}
              </option>
            ))}
          </select>
        )}
      </Label>

      <div className='flex gap-6 items-center justify-between'>
        <div className='flex flex-col gap-2 w-full'>
          <h4
            className='uppercase text-(--text-secondary) font-medium'
            style={{ fontSize: 'var(--fs-xs)' }}
          >
            Movement type
          </h4>
          <div className='flex gap-2 rounded-2xl bg-(--bg-secondary)'>
            <TypeSelectButton
              label='Outflow'
              active={type === 'outflow'}
              onClick={() => setType('outflow')}
            />
            <TypeSelectButton
              label='Inflow'
              active={type === 'inflow'}
              onClick={() => setType('inflow')}
            />
          </div>
        </div>

        <div className='w-full'>
          <Label htmlFor='quantity-input'>
            Quantity
            <Input
              type='number'
              name='quantity'
              id='quantity-input'
              min={1}
              max={500}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
              value={quantity}
            />
          </Label>
        </div>
      </div>

      <Label htmlFor='note-input'>
        Notes
        <Input
          name='note'
          id='note-input'
          placeholder='Aditional details about this movement'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
          value={note}
        />
      </Label>

      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </Modal>
  );
}
