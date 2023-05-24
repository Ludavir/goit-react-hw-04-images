import React, { Component } from 'react';
import './App.css';
import { searchImages } from 'api/API';
import Searchbar from 'components/search-bar/Searchbar';
import SearchForm from 'components/search-bar/searchForm/SearchForm';
import ImageGallery from 'components/image-gallery/ImageGallery';
import ImageGalleryItem from 'components/image-gallery/image-gallery-item/ImageGalleryItem';
import Button from 'components/button/Button';
import Loader from 'components/loader/Loader';
import Modal from 'components/modal/Modal';

class App extends Component {
  state = {
    items: [],
    search: null,
    loading: false,
    modalActive: false,
    page: 1,
    endOfList: false,
    error: '',
    modalImageSrc: '',
  };
  dataCatcher = search => {
    this.setState({
      search,
      items: [],
      page: 1,
    });
  };
  pageUpdate = () =>
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  openModal = src => {
    this.setState({
      modalActive: true,
      modalImageSrc: src,
    });
  };
  closeModal = () => {
    this.setState({ modalActive: false, modalImageSrc: '' });
  };
  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });
      searchImages(search, page)
        .then(({ hits }) => {
          this.setState(({ items }) => ({ items: [...items, ...hits] }));
          if (hits.length < 12) {
            this.setState({ endOfList: true });
          }
        })
        .catch(erorr => this.setState({ erorr: erorr.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { items, loading, endOfList, modalActive, modalImageSrc } =
      this.state;
    const { dataCatcher, pageUpdate, openModal, closeModal } = this;
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
  }
}
export default App;