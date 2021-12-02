import React, { lazy, Suspense } from "react";

const UsePagination = lazy(()=> import('../hooks/usePagination'))


function menucontainer() { 
    return (
        <Suspense fallback={<span>Loading...</span>}>
            <UsePagination/>
        </Suspense>
    )

}

export default menucontainer;