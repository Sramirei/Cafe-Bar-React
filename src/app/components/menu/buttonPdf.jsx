import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'

const Request =  () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default function LoadingButton() {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            Request().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <Button
            variant="ligth"
            className='btn-pdf'
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? 'Descargando…' : 'Descargar menú'}
        </Button>
    );
}
