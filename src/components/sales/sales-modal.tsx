import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { SaleDetailRequest, SaleRequest } from '../../../lib/types/sale';
import { useSalesContext } from '../../contexts/sales/sales-context';
import { useStockContext } from '../../contexts/stock/stock-context';
import Modal from '../modals/modal';
import Input from '../ui/input';
import Label from '../ui/label';

export default function SalesModal() {
  const { addSale } = useSalesContext();
  const { stock } = useStockContext();

  const [saleDetails, setSaleDetails] = useState<SaleDetailRequest[]>([
    { stockResourceId: '', quantity: 1 },
  ]);

  const [error, setError] = useState<string | null>(null);

  const handleAddDetail = () => {
    setSaleDetails((prev) => [...prev, { stockResourceId: '', quantity: 1 }]);
  };

  const handleRemoveDetail = (index: number) => {
    if (saleDetails.length > 1) {
      setSaleDetails((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleDetailChange = (
    index: number,
    field: keyof SaleDetailRequest,
    value: string | number,
  ) => {
    setSaleDetails((prev) => {
      const updated = [...prev];

      if (field === 'quantity') {
        updated[index] = { ...updated[index], quantity: Number(value) };
      } else {
        updated[index] = { ...updated[index], stockResourceId: String(value) };
      }

      return updated;
    });
  };

  const handleAdd = (): boolean => {
    setError(null);
    const date = new Date().toISOString().split('T')[0];

    if (saleDetails.some((detail) => !detail.stockResourceId)) {
      setError('All products must be selected');
      return false;
    }

    if (saleDetails.some((detail) => detail.quantity <= 0)) {
      setError('All quantities must be greater than zero');
      return false;
    }

    const newSale: SaleRequest = {
      date,
      saleDetails,
    };

    addSale(newSale);

    return true;
  };

  return (
    <Modal
      title='New sale'
      action={handleAdd}
    >
      <div className='space-y-4'>
        {saleDetails.map((detail, index) => (
          <div
            key={detail.stockResourceId}
            className='flex gap-3 items-end'
          >
            <div className='flex-1'>
              <Label htmlFor={`product-select-${detail.stockResourceId}`}>
                Product
                {stock.length > 0 && (
                  <select
                    name='products'
                    id={`product-select-${detail.stockResourceId}`}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleDetailChange(index, 'stockResourceId', e.target.value)
                    }
                    value={detail.stockResourceId}
                    style={{
                      border: '1px solid var(--border-input)',
                      padding: '0.6rem 1.2rem',
                      borderRadius: 'var(--rounded)',
                      width: '100%',
                    }}
                  >
                    <option value=''>--Please choose an option--</option>
                    {stock.map((stock) => (
                      <option
                        value={stock.resourceId}
                        key={stock.resourceId}
                      >
                        {stock.productResponseModel.name}
                      </option>
                    ))}
                  </select>
                )}
              </Label>
            </div>

            <div className='w-24'>
              <Label htmlFor={`quantity-input-${index}`}>
                Quantity
                <Input
                  type='number'
                  name='quantity'
                  id={`quantity-input-${index}`}
                  min={1}
                  max={500}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleDetailChange(index, 'quantity', Number(e.target.value))
                  }
                  value={detail.quantity}
                />
              </Label>
            </div>

            {saleDetails.length > 1 && (
              <button
                type='button'
                onClick={() => handleRemoveDetail(index)}
                className='px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type='button'
          onClick={handleAddDetail}
          className='w-full px-3 py-2 text-sm border border-dashed border-(--border-input) rounded-lg hover:bg-(--bg-secondary) transition-colors'
        >
          + Add Product
        </button>
      </div>

      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </Modal>
  );
}
