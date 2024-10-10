import { useEffect, useState } from "react";

export const ProductsApi = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [productNumber, setProductNumber] = useState(10); 

    const fetchData = async (loadMore = false) => {
        try {
            const data = [];
            const limit = 10; 
            let currentProductNumber = productNumber;

            for (let i = 0; i < limit; i++) {
                console.log("Fetching product:", currentProductNumber);
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${currentProductNumber}`);
                const product = await response.json();
                data.push(product);
                currentProductNumber++; 
            }
            const uniqueProducts = data.filter(newProduct => 
                !products.some(existingProduct => existingProduct.id === newProduct.id)
            );

            setProducts(prevProducts => [...prevProducts, ...uniqueProducts]);
            setProductNumber(currentProductNumber);  

        } catch (error) {
            console.log('Error al realizar la solicitud', error);
            setError('Error al realizar la solicitud');
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    const loadMoreProducts = () => {
        fetchData(true); 
    };

    if (error) {
        return (
            <div className="alert alert-danger text-center" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className='container mt-5'>
            <h2 className='text-center text-white mb-4'>Products Gallery</h2>
            <div className='row overflow-auto vh-80 scrollable-container'>
                {products.map((product, index) => (
                    <div className='col-md-4 mb-4' key={index}>
                        <div className='card h-100 d-flex flex-column'>
                            {product.images && product.images.length > 0 ? (
                                <img 
                                    src={product.images[0]} 
                                    className='fixed-img' 
                                    alt={product.title} 
                                    style={{ maxHeight: '300px', objectFit: 'cover' }} 
                                />
                            ) : (
                                <div className="placeholder">No image available</div>
                            )}
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={loadMoreProducts}>
                    Load more products
                </button>
            </div>
        </div>
    );
}
