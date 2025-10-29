import products from '@/data/products.json'
import Navbar from '@/components/Navbar'
import Banner from '@/components/Banner'

async function fetchProductDetail(slug : string){
    try {
        console.log(slug)
        const res = await fetch(`${process.env.BACKEND_ROOT_API}/api/v1/user/products?slug=${slug}`)
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)        
        return {}
    }
}

export default async function Page({ params } : { 
    params : Promise<{ slug: string}>
}){
    const {slug} = await params
    const productDetail = await fetchProductDetail(slug)
    // const productDetail = products.filter((item) => item.slug === slug) 
    const product = productDetail.product

    return(
        <div className='min-h-screen max-w-screen bg-linear-to-r from-orange-100 via-white to-orange-100 m-0 pt-4'>
            <Navbar />
            <Banner />

            <div className="max-w-4xl mx-auto p-6">
                {product ? (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <p className="text-sm text-gray-500 mb-4">Category: <span className="font-medium text-gray-800">{product.category}</span></p>

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="w-full h-64 bg-linear-to-br from-orange-200 via-red-200 to-rose-200 rounded-lg flex items-center justify-center mb-4">
                                        {/* Placeholder image / illustration */}
                                        <div className="w-40 h-40 bg-white/30 rounded-full flex items-center justify-center">
                                            <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                </div>

                                <aside className="w-full md:w-64 bg-gray-50 p-4 rounded-lg flex flex-col gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Price</p>
                                        <p className="text-2xl font-bold text-orange-600">${product.price}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">Availability</p>
                                        <p className="text-lg font-semibold text-gray-800">{product.inventory} units</p>
                                    </div>

                                    <button className="mt-2 w-full px-4 py-2 bg-linear-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity">
                                        Add to Cart
                                    </button>
                                </aside>
                            </div>

                            <div className="mt-6 text-xs text-gray-400">
                                Last updated: {new Date(product.lastUpdated).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow"> 
                        <h2 className="text-xl font-semibold">Product not found</h2>
                        <p className="text-sm text-gray-500">We couldn't find the product you're looking for.</p>
                    </div>
                )}
            </div>
        </div>
    )
}    
