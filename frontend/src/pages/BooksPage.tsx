import { useState } from 'react';
import CartSummary from '../components/CartSummary';
import Banner from '../components/Banner';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);

  return (
    <>
      <div className="container mt-4">
        <CartSummary />
        <Banner />
        <div className="row">
          <div className="col-lg-4">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              setPageNum={setPageNum}
            />
          </div>
          <div className="col-lg-8">
            <BookList
              selectedCategories={selectedCategories}
              pageNum={pageNum}
              setPageNum={setPageNum}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;
