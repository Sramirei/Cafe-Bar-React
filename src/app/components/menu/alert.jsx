import Swal from "sweetalert2";

const alertamsg = () => {

    Swal.fire({
        icon: "success",
        title: "Agregado al carrito",                
        timer: 1000,
        showConfirmButton: false,
    });
};

export default alertamsg;