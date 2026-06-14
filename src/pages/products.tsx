import ProductsHeader from '../components/products/products-header';
import { ProductsTable } from '../components/products/products-table/products-table';
import AppSection from '../components/ui/app-section';

export default function Products() {
  return (
    <AppSection>
      <ProductsHeader></ProductsHeader>
      <ProductsTable></ProductsTable>
    </AppSection>
  );
}
