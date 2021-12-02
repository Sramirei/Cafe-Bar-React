import Carousel from 'react-bootstrap/Carousel'

export default function slider() {
  return (
    <>
            <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd7240cadcfe.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://raw.githubusercontent.com/StevenEdev/Cafe-Bar/main/BG1-01.png"
            alt="Second slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://raw.githubusercontent.com/StevenEdev/Cafe-Bar/main/BG2-01.png"
            alt="Third slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
