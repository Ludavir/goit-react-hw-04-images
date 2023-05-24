import React from 'react';
import '../../styles/image-gallery.css';

const ImageGallery = ({ children }) => {
  return <ul className="gallery">{children}</ul>;
};

export default ImageGallery;
