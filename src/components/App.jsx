import { useEffect, useState } from 'react';
import axios from 'axios';

//componenty:
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/';
const API_KEY = '35000498-2935018b21b8b3d2f50cbcb0f';

export const App = () => {

  const [photos, setPhotos] = useState([]);
  const [submitedValue, setSubmitedValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [numberOfPhotos, setNumberOfPhotos] = useState(0);

  const handleSubmitedValue = value => {
    setPhotos([]);
    setSubmitedValue(value);
    setNumberOfPhotos(0);
    setPage(1);
  };

  const increasePageNumber = step => {
    setPage(prevState => prevState + step,
    );
  };

  const manageSelectedPhoto = selectedPhoto => {
    setSelectedPhoto(selectedPhoto);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `api/?q=${submitedValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        setPhotos(prevState => [...prevState, ...response.data.hits]);
        if (page === 1) {
          setNumberOfPhotos(response.data.totalHits);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (submitedValue !== '') {
      setIsLoading(true);
      fetchPhotos();
    }
  }, [submitedValue, page]);

  return (
    <>
      <Searchbar onSubmit={handleSubmitedValue} />
      <main>
        <Loader isLoading={isLoading} />
        <ImageGallery>
          <ImageGalleryItem photos={photos} onClick={manageSelectedPhoto} />
        </ImageGallery>
        {submitedValue !== '' && page * 12 <= numberOfPhotos ? (
          <Button onClick={increasePageNumber} />
          ) : null}
          <Modal selectedPhoto={selectedPhoto} onClick={manageSelectedPhoto} />
      </main>
    </>
  );
};
