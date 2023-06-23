import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Lista from './components/Lista';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Obtener los productos almacenados en localStorage al cargar la página
    const existingProducts = localStorage.getItem('productos');

    if (existingProducts) {
      setProductos(JSON.parse(existingProducts));
    }
  }, []);

  const onDelete = (index) => {
    // Eliminar el producto correspondiente al índice
    const updatedProductos = [...productos];
    updatedProductos.splice(index, 1);
    setProductos(updatedProductos);

    // Actualizar los productos en localStorage
    localStorage.setItem('productos', JSON.stringify(updatedProductos));
  };
  
  // Función para buscar productos
  const searchProducts = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ height: '100vh' }}>
      <div className="container">
        <Formulario setProductos={setProductos} searchProducts={searchProducts} /> 
        <Lista productos={productos} onDelete={onDelete} searchQuery={searchQuery} />
      </div>
    </div>
  );
}; 
export default App;