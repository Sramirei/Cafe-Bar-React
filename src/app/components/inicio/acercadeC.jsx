import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

function acercadeC() {
    return (
        <>
            <section id="about" className="about">
                <div className="container" >

                    <div className="row">
                        <div className="col-lg-6 order-1 order-lg-2">
                            <div className="about-img">
                                <img src="https://www.hosteleria.site/wp-content/uploads/2019/07/restaurantes-1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                            <h3 style={{ textAlign: 'left' }}>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
                            <p className="fst-italic" style={{ textAlign: 'left' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <ul>
                                <li style={{ textAlign: 'left'}}><i className="bi bi-check-circle-fill" style={{ fontSize: "1.5em", color: '#cda45e'}}></i>  Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                                <li style={{ textAlign: 'left'}}><i className="bi bi-check-circle-fill" style={{ fontSize: "1.5em", color: '#cda45e'}}></i>  Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                                <li style={{ textAlign: 'left'}}><i className="bi bi-check-circle-fill" style={{ fontSize: "1.5em", color: '#cda45e'}}></i>  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
                            </ul>
                            <p>
                                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default acercadeC;
