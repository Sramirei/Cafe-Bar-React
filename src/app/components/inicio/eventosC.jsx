import Carousel from 'react-bootstrap/Carousel'

function eventosC() {
    return (
        <>
            <section id="events" className="events">
                <div className=" container ">
                    <div className=" section-title ">
                        <div className=" titulo-seccion ">
                            <h2>EVENTOS</h2>
                        </div>
                        <p>Organiza tus eventos en nuestro restaurante</p>
                    </div>
                </div>
                <Carousel>

                    <Carousel.Item>
                        <div className="pad row slider slider-eventos">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <img className="img-fluid mb-3 mb-lg-0 imgss" src="https://stevenedev.github.io/Cafe-Bar/img/event-birthday.jpg" alt="" /></div>
                                <div className="col-md-6">
                                    <div className="text-lg-left">
                                        <h4>Eventos de Cumpleaños</h4>
                                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="pad row slider slider-eventos">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <img className="img-fluid mb-3 mb-lg-0 imgss" src="https://stevenedev.github.io/Cafe-Bar/img/event-private.jpg" alt="" /></div>
                                <div className="col-md-6">
                                    <div >
                                        <h3>Eventos</h3>
                                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="pad row slider slider-eventos">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <img className="img-fluid mb-3 mb-lg-0 imgss" src="https://stevenedev.github.io/Cafe-Bar/img/event-custom.jpg" alt="" /></div>
                                <div className="col-md-6">
                                    <div className="text-lg-left">
                                        <h4>Actividades grupales</h4>
                                        <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>


                </Carousel>
            </section>
        </>
    );
}

export default eventosC;