import { useState } from 'react';
import type { PurchaseDetailRequestModel, PurchaseRequestModel } from '../../../lib/types/purchase';
import { usePurchaseContext } from '../../contexts/purchases/purchases-context';
import Modal from '../modals/modal';
import Input from '../ui/input';
import Label from '../ui/label';

export default function PurchasesModal() {
  const { addPurchase } = usePurchaseContext();

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState<string>('');
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetailRequestModel[]>([
    { stockResourceId: '', quantity: 1 },
  ]);

  const [error, setError] = useState<string | null>(null);

  const handleAddDetail = () => {
    setPurchaseDetails((prev) => [...prev, { stockResourceId: '', quantity: 1 }]);
  };

  const handleRemoveDetail = (index: number) => {
    if (purchaseDetails.length > 1) {
      setPurchaseDetails((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleDetailChange = (index: number, field: keyof PurchaseDetailRequestModel, value: string | number) => {
    setPurchaseDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAdd = (): boolean => {
    setError(null);

    if (!date) {
      setError('Select a date');
      return false;
    }

    if (!reason) {
      setError('Write a reason');
      return false;
    }

    if (purchaseDetails.some((detail) => !detail.stockResourceId)) {
      setError('All products must be selected');
      return false;
    }

    if (purchaseDetails.some((detail) => detail.quantity <= 0)) {
      setError('All quantities must be greater than zero');
      return false;
    }

    const newPurchase: PurchaseRequestModel = {
      date,
      reason,
      purchaseDetails,
    };

    addPurchase(newPurchase);

    return true;
  };

  return (
    <Modal
      title='New purchase'
      action={handleAdd}
    >
      <Label htmlFor='date-input'>
        Date
        <Input
          type='date'
          name='date'
          id='date-input'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </Label>

      <Label htmlFor='reason-input'>
        Reason
        <Input
          name='reason'
          id='reason-input'
          placeholder='Purchase reason or notes'
          onChange={(e) => setReason(e.target.value)}
          value={reason}
        />
      </Label>

      <div className='space-y-4'>
        <h4 className='uppercase text-(--text-secondary) font-medium' style={{ fontSize: 'var(--fs-xs)' }}>
          Purchase Details
        </h4>

        {purchaseDetails.map((detail, index) => (
          <div key={index} className='flex gap-3 items-end'>
            <div className='flex-1'>
              <Label htmlFor={`product-select-${index}`}>
                Product
                <select
                  name='products'
                  id={`product-select-${index}`}
                  onChange={(e) => handleDetailChange(index, 'stockResourceId', e.target.value)}
                  value={detail.stockResourceId}
                  style={{
                    border: '1px solid var(--border-input)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: 'var(--rounded)',
                    width: '100%',
                  }}
                >
                  <option value=''>--Please choose an option--</option>
                  <option value='598f808d-6ae2-4472-a5af-3deef90c2e56'>Mousepad</option>
                </select>
              </Label>
            </div>

            <div className='w-24'>
              <Label htmlFor={`quantity-input-${index}`}>
                Qty
                <Input
                  type='number'
                  name='quantity'
                  id={`quantity-input-${index}`}
                  min={1}
                  max={500}
                  onChange={(e) => handleDetailChange(index, 'quantity', Number(e.target.value))}
                  value={detail.quantity}
                />
              </Label>
            </div>

            {purchaseDetails.length > 1 && (
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
