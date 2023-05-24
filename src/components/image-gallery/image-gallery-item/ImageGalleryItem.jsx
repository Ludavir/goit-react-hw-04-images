import React from 'react';
import '../../../styles/imageGalleryItem.css' ;
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ hits, clicked }) => {
  if (hits.length) {
    const items = hits.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <li
          onClick={() => clicked(largeImageURL)}
          className="item"
          key={id}
        >
          <img
            className="itemImage"
            alt="img"
            src={webformatURL}
            srcbig={largeImageURL}
          />
        </li>
      );
    });
    return items;
  }
};
export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  hits: PropTypes.array,
  clicked: PropTypes.func,
};
