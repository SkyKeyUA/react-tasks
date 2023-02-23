/** @format */

import React from 'react';
import './index.scss';
import { Collection } from './components/Collection';
function App() {
  const categories = [
    { name: 'Все' },
    { name: 'Море' },
    { name: 'Горы' },
    { name: 'Архитектура' },
    { name: 'Города' },
  ];
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const category = categoryId ? `category=${categoryId}` : '';
        await fetch(
          `https://63b2b99f5e490925c51fc1ea.mockapi.io/task-photos?page=${page}&limit=3&${category}`,
        )
          .then((res) => res.json())
          .then((json) => setCollections(json));
      } catch (error) {
        alert('error when requesting data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [categoryId, page]);
  //   const onChangeSearchInput = (event) => {
  // 	setSearchValue(event.target.value);
  //   }
  console.log(collections);
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              key={obj.name}
              className={categoryId === i ? 'active' : ''}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li key={i} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
