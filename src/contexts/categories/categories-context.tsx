import { createContext, useContext, useState } from 'react';
import type { CategoryRequest, CategoryResponse } from '../../../lib/types/category';
import type { ProductRequest } from '../../../lib/types/product';
import { deleteCategory } from '../../../services/categories/delete';
import { createCategory } from '../../../services/categories/post';
import { updateCategory } from '../../../services/categories/put';

type CategoryContextType = {
  categories: CategoryResponse[];
  error: string | null;
  addCategory: (category: CategoryRequest) => Promise<void>;
  updateCategory: (categoryResourceId: string, product: ProductRequest) => Promise<void>;
  deleteCategory: (categoryResourceId: string) => Promise<void>;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export default function CategoryListProvider({
  initialCategories,
  children,
}: {
  initialCategories: CategoryResponse[];
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<CategoryResponse[]>(initialCategories);
  const [error, setError] = useState<string | null>(null);

  const handleAddCategory = async (category: CategoryRequest) => {
    const optimisticResponse: CategoryResponse = {
      name: category.name,
      resourceId: `temp-${Date.now()}-${Math.random()}`,
    };

    setCategories((prev) => [...prev, optimisticResponse]);
    setError(null);

    try {
      const response = await createCategory(category);
      setCategories((prev) =>
        prev.map((category) =>
          category.resourceId === optimisticResponse.resourceId ? response : category,
        ),
      );
    } catch (fetchError) {
      setCategories((prev) =>
        prev.filter((category) => category.resourceId !== optimisticResponse.resourceId),
      );
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to create category');
      throw fetchError;
    }
  };

  const handleUpdateCategory = async (resourceId: string, category: CategoryRequest) => {
    const currentCategory = categories.find((category) => category.resourceId === resourceId)!;

    const optimisticResponse: CategoryResponse = {
      name: category.name,
      resourceId: resourceId,
    };

    setCategories((prev) =>
      prev.map((category) => (category.resourceId === resourceId ? optimisticResponse : category)),
    );
    setError(null);

    try {
      const response = await updateCategory(category, resourceId);
      setCategories((prev) =>
        prev.map((category) =>
          category.resourceId === optimisticResponse.resourceId ? response : category,
        ),
      );
    } catch (fetchError) {
      setCategories((prev) =>
        prev.map((category) => (category.resourceId === resourceId ? currentCategory : category)),
      );
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to update category');
      throw fetchError;
    }
  };

  const handleDeleteCategory = async (resourceId: string) => {
    const currentCategory = categories.find((category) => category.resourceId === resourceId)!;
    const currentCategoryIndex = categories.findIndex(
      (category) => category.resourceId === resourceId,
    );

    setCategories((prev) => prev.filter((category) => category.resourceId !== resourceId));
    setError(null);

    try {
      await deleteCategory(resourceId);
    } catch (fetchError) {
      setCategories((prev) => [
        ...prev.slice(0, currentCategoryIndex),
        currentCategory,
        ...prev.slice(currentCategoryIndex),
      ]);
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to delete category');
      throw fetchError;
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        error,
        addCategory: handleAddCategory,
        updateCategory: handleUpdateCategory,
        deleteCategory: handleDeleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryList must be used within a CategoryListProvider');
  }
  return context;
}
