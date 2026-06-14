import SalesHeader from "../components/sales/sales-header"
import SalesTable from "../components/sales/sales-table"
import AppSection from "../components/ui/app-section"

export default function Sales() {
  return (
    <AppSection>
          <SalesHeader />
          <SalesTable />
    </AppSection>
  );
}
