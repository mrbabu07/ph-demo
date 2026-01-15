import Link from 'next/link'
import React from 'react'

function products() {
    return (
        <div>
            this is products page
            <Link href="products/1">product 2</Link>
            <Link href="products/2">product 3</Link>
            <Link href="products/3">product 1</Link>
        </div>
    )
}

export default products
