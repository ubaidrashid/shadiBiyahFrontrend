import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import weddingHall from '../../assets/images/homeCarouselImages/weddinghall.jpg';
import rentcar from '../../assets/images/homeCarouselImages/rentcar.jpg';
import photographer from '../../assets/images/homeCarouselImages/photographer.jpg';

export function ControlledCarousel({user}) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const imageStyle = {
        height: '100vh',
        width: '100%',
        objectFit: 'cover'
    };
    return (
        <Carousel className='w-100' activeIndex={index} onSelect={handleSelect} interval={1000}>
            <Carousel.Item>
                <img
                    // className="d-block w-100"
                    src={weddingHall}
                    style={imageStyle}
                    alt="Wedding Hall"
                />
                <Carousel.Caption>
                    <h3>Wedding Hall</h3>
                    <p>Perfect for weddings and large gatherings.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={rentcar}
                    style={imageStyle}
                    alt="Birthday Celebration"
                />
                <Carousel.Caption>
                    <h3>Rent a car Services</h3>
                    <p>Celebrate your birthdays in style.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={imageStyle}
                    src={photographer}
                    alt="Conference Room"
                />
                <Carousel.Caption>
                    <h3>PhotoGraphers</h3>
                    <p>Ideal for meetings and corporate events.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
