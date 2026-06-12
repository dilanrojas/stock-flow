import PurchasesHeader from '../components/purchases/purchases-header';
import PurchasesTable from '../components/purchases/purchases-table';
import AppSection from '../components/ui/app-section';

export default function Purchases() {
  return (
    <AppSection>
      <PurchasesHeader />
      <PurchasesTable />
    </AppSection>
  );
}
