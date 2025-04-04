import { useEffect, useState } from 'react';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
  setPageNum,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  setPageNum: (pageNum: number) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://mission-13-backend-atbkb0h8epg7b5f8.eastus-01.azurewebsites.net/Bookstore/GetBookCategories'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };
    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
    setPageNum(1); // Reset to first page when categories change
  }

  return (
    <>
      <div className="border p-3 rounded">
        <h5 className="mb-3">Book Categories:</h5>
        <div className="d-flex flex-column">
          {categories?.map((c) => (
            <div key={c} className="form-check">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="form-check-input"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={c} className="form-check-label ms-2">
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
