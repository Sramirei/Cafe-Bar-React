import SliderC from '../../components/inicio/sliderC';
import AcercadeC from '../../components/inicio/acercadeC';
import EspecialesC from '../../components/inicio/especialesC';
import EventosC from '../../components/inicio/eventosC';
import TestimoniosC from '../../components/nosotros/testimonios/testimoniosC';

import "../../components/inicio/inicio.css"
import "../../components/nosotros/nosotros.css"

import "bootstrap/dist/css/bootstrap.min.css";

function inicio() {
  return (
    <div>
      <SliderC/>
      <AcercadeC/>
      <EspecialesC/>
      <EventosC />
      <TestimoniosC />
    </div>
  );
}

export default inicio;
