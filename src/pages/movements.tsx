import MovementsHeader from '../components/movements/movements-header';
import MovementsStatus from '../components/movements/movements-status';
import MovementsTable from '../components/movements/movements-table';
import AppSection from '../components/ui/app-section';

export default function Movements() {
  return (
    <AppSection>
      <MovementsHeader />
      <MovementsStatus />
      <MovementsTable />
    </AppSection>
  );
}
