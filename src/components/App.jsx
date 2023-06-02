import { Component } from 'react';
import axios from 'axios';

//componenty:
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

axios.defaults.baseURL = 'https://pixabay.com/';
const API_KEY = "35000498-2935018b21b8b3d2f50cbcb0f"

export class App extends Component {
  state = {
    photos: [],
    submitedValue: '',
    numberOfPhotos: 0,
    page: 1,
    isLoading: false,
    selectedPhoto: null,
  };

  handleSubmitedValue = value => {
    this.setState({
      photos: [],
      submitedValue: value,
      numberOfPhotos: 0,
      page: 1,
    });
  };

  increasePageNumber = step => {
    this.setState(prevState => ({
      page: prevState.page + step,
    }));
  };

  manageSelectedPhoto = (selectedPhoto) => {
    this.setState({selectedPhoto: selectedPhoto})
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { submitedValue, page } = this.state;
    if (submitedValue !== prevState.submitedValue || page !== prevState.page) {
      this.setState({ isLoading: true });
      try {
        const response = await axios.get(
          `api/?q=${submitedValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState(prevState => ({
          photos: [...prevState.photos, ...response.data.hits],
        }));
        if (page === 1) {
          this.setState({
            numberOfPhotos: response.data.totalHits,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { photos, submitedValue, numberOfPhotos, page, isLoading, selectedPhoto } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmitedValue} />
        <main>
          <Loader isLoading={isLoading} />
        <ImageGallery>
            <ImageGalleryItem photos={photos} onClick={this.manageSelectedPhoto} />
        </ImageGallery>
        {submitedValue !== '' && page * 12 <= numberOfPhotos ? (
          <Button onClick={this.increasePageNumber} />
          ) : null}
          <Modal selectedPhoto={selectedPhoto} onClick={this.manageSelectedPhoto} />
          </main>
      </>
    );
  }
}
