import React, { useState, useEffect } from 'react';
import './App.css';
import { searchImages } from 'api/API';
import Searchbar from 'components/search-bar/Searchbar';
import SearchForm from 'components/search-bar/searchForm/SearchForm';
import ImageGallery from 'components/image-gallery/ImageGallery';
import ImageGalleryItem from 'components/image-gallery/image-gallery-item/ImageGalleryItem';
import Button from 'components/button/Button';
import Loader from 'components/loader/Loader';
import Modal from 'components/modal/Modal';

const App = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [page, setPage] = useState(1);
  const [endOfList, setEndOfList] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');

  const dataCatcher = search => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };
  const pageUpdate = () => setPage(prevPage => prevPage + 1);
  const openModal = src => {
    setModalActive(true);
    setModalImageSrc(src);
  };
  const closeModal = () => {
    setModalActive(false);
    setModalImageSrc('');
  };
  useEffect(() => {
    if (!search) {
      return;
    }
    setLoading(true);
    searchImages(search, page)
      .then(({ hits }) => {
        setItems(prevItems => [...prevItems, ...hits]);
        if (hits.length < 12) {
          setEndOfList(true);
        }
      })
      .catch(erorr => console.log(erorr.message))
      .finally(() => setLoading(false));
  }, [search, page]);

  return (
    <div className="App">
    <Searchbar>
      <SearchForm submitFn={dataCatcher} />
    </Searchbar>
    <ImageGallery>
      <ImageGalleryItem hits={items} clicked={openModal} />
    </ImageGallery>
    {loading && <Loader />}
    {Boolean(items.length) && !endOfList && (
      <Button loadMore={pageUpdate} />
    )}
    {modalActive && <Modal url={modalImageSrc} close={closeModal} />}
  </div>
  );
};

export default App;