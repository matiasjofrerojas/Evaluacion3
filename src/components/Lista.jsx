import React from 'react';
//importamos imagen predeterminada segun categoria
import imagenTelefonos from '../images/telefono.png';
import imagenComputadoras from '../images/computadora.png';
import imagenTablets from '../images/tablet.png';
import imagenMonitores from '../images/monitor.png';
import imagenCamaras from '../images/camara.png';
import imagenImpresoras from '../images/impresora.png';

const Lista = ({ productos, onDelete, searchQuery }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-5">
      {productos
        .filter((producto) => {
          const query = searchQuery.toLowerCase();
          return (
            producto.nombre.toLowerCase().includes(query) || //Filtra por nombre del producto
            producto.categoria.toLowerCase().includes(query) || //Filtra por categoria del producto
            producto.marca.toLowerCase().includes(query) || //Filtra por marca del producto
            producto.precio.toString().includes(query) //Filtra por precio del producto
          );
        })
        .map((producto, index) => (
          <div className="col mb-4 content" key={index}>
            <div className="card rounded-5 h-100" >
              <div className="position-relative" style={{marginTop:10}}>
                {/* Mostramos la imagen correspodiente segun categoria */}
                {producto.categoria === 'Teléfonos' && (
                  <img
                    src={imagenTelefonos}
                    className="card-img-top mx-auto card-image card-image-small"
                    alt="Teléfonos"
                  />
                )}
                {producto.categoria === 'Computadoras portátiles' && (
                  <img
                    src={imagenComputadoras}
                    className="card-img-top mx-auto card-image card-image-small"
                    alt="Computadoras portátiles"
                  />
                )}
                {producto.categoria === 'Tablets' && (
                  <img
                    src={imagenTablets}
                    className="card-img-top mx-auto card-image card-image-small"
                    alt="Tablets"
                  />
                )}
                {producto.categoria === 'Monitores' && (
                  <img
                    src={imagenMonitores}
                    className="card-img-top mx-auto card-image card-image-small"
                    alt="Monitores"
                  />
                )}
                {producto.categoria === 'Cámaras digitales' && (
                  <img
                    src={imagenCamaras}
                    className="card-img-top mx-auto card-image card-image-small"
                    alt="Cámaras digitales"
                  />
                )}
                {producto.categoria === 'Impresoras' && (
                  <img
                    src={imagenImpresoras}
                    className="card-img-top mx-auto card-image card-image-small"
                    alt="Impresoras"
                  />
                )}
                <button
                  className="btn btn-danger btn-sm delete-button position-absolute top-0 end-0"
                  onClick={() => onDelete(index)} //Elimina el producto
                >
                  &times;
                </button>
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">Marca: {producto.marca}</p>
                <p className="card-text">Precio: ${producto.precio}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Lista;