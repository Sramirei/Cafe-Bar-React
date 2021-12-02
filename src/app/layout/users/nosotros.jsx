import "../../components/nosotros/nosotros.css"

import NosotrosC from '../../components/nosotros/acerca/nosotrosC'
import HistoriaC from '../../components/nosotros/historia/historiaC';
import ChefsC from '../../components/nosotros/chefs/chefsC';
import TestimoniosC from "../../components/nosotros/testimonios/testimoniosC";

function nosotros() {
  return (
    <>
      <HistoriaC />
      <NosotrosC />
      <ChefsC />
      <TestimoniosC />
    </>
  );
}

export default nosotros;