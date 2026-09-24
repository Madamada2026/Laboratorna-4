import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCatalog({ 
  products, 
  selectedCategory, 
  searchQuery, 
  sortBy, 
  viewMode 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // 1. Фільтрація за категорією та пошуковим запитом
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Всі' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. Сортування
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });

  // 3. Пагінація
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Каталог товарів</h2>

      {/* Повідомлення про відсутність результатів */}
      {sortedProducts.length === 0 ? (
        <div className="empty-catalog">
          <p>⚠️ Товарів не знайдено. Спробуйте змінити параметри пошуку або фільтри.</p>
        </div>
      ) : (
        <>
          {/* Рендеринг списку або сітки */}
          <div className={`product-list ${viewMode === 'grid' ? 'grid-mode' : 'list-mode'}`}>
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-img" />
                <div className="product-details">
                  <div className="product-category-tag">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-desc">{product.description}</p>
                  
                  <div className="product-meta">
                    <span className="product-price">{product.price} грн</span>
                    <span className="product-rating">⭐ {product.rating}</span>
                  </div>

                  <div className="product-status">
                    {product.inStock ? (
                      <span className="in-stock">В наявності</span>
                    ) : (
                      <span className="out-of-stock">Немає в наявності</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Пагінація */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                ◀ Назад
              </button>
              <span>Сторінка {currentPage} з {totalPages}</span>
              <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Вперед ▶
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

ProductCatalog.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      inStock: PropTypes.bool.isRequired,
      rating: PropTypes.number.isRequired
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
  searchQuery: PropTypes.string,
  sortBy: PropTypes.string,
  viewMode: PropTypes.oneOf(['grid', 'list'])
};

ProductCatalog.defaultProps = {
  selectedCategory: 'Всі',
  searchQuery: '',
  sortBy: 'name-asc',
  viewMode: 'grid'
};

export default ProductCatalog;
