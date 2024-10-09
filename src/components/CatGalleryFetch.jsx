import { useEffect, useState } from "react";

export const CatGalleryFetch = () => {

  const [cats, setCats] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async (loadMore = false) => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=DESC`);

      const data = await response.json();

      if (loadMore) {
        setCats(prevCats => [...prevCats, ...data]);
      } else {
        setCats(data);
      }

    } catch (error) {
      console.log('Error al realizar la solicitud', error);
      setError('Error al realizar la solicitud');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const loadMoreCats = () => {
    setPage(prevPage => prevPage + 1);
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
      <h2 className='text-center text-white mb-4'>Galería de Gatitos con Fetch</h2>
      <div className='row overflow-auto vh-80 scrollable-container'>
        {cats.map((cat, index) => (
          <div className='col-md-4 mb-4' key={index}>
            <div className='card h-100 d-flex flex-column'>
              <img src={cat.url} className='fixed-img' alt="Cat" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={loadMoreCats}>
          Cargar más gatos
        </button>
      </div>
    </div>
  );
}
