import { createContext, useContext, useState } from "react";
import type { ProductResponse } from "../../../lib/types/product";
import { getProducts } from "../../../services/products/get";

type ProductListContextType = {
    products: ProductResponse[];
    refreshProducts : () => Promise<void>
}


const ProductListContext = createContext<ProductListContextType | null>(null)

export default function ProductListProvider({ initialProducts, children }: { initialProducts: ProductResponse[], children: React.ReactNode }) {
    const [products, setProducts] = useState<ProductResponse[]>(initialProducts)

     const refreshProducts = async () => {
        const updatedList = await getProducts()
        setProducts(updatedList)
    }

    return (
        <ProductListContext.Provider value={{ products, refreshProducts}}>
            {children}
        </ProductListContext.Provider>
    )

}

export function useProductContext() {
    const context = useContext(ProductListContext)
    if (!context) {
        throw new Error('useProductList must be used within ProductListProvider')
    }

    return context

}