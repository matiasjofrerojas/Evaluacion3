import React, { useState } from 'react';
//importamos los iconos
import { MdDriveFileRenameOutline, MdComputer } from 'react-icons/md';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';

const Formulario = ({ setProductos, searchProducts }) => {
  // Definición de los estados iniciales utilizando useState
  const [categoria, setCategoria] = useState('');
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [precio, setPrecio] = useState('');
  const [errors, setErrors] = useState({
    categoria: '',
    nombre: '',
    marca: '',
    precio: '',
  });
  // Estado para mostrar la alerta
  const [showAlert, setShowAlert] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;
    // Validar los campos del formulario
    if (categoria === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        categoria: 'Por favor, seleccione una categoría',
      }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, categoria: '' }));
    }

    if (nombre === '' || !/^[a-zA-Z0-9\s.]+$/.test(nombre)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nombre: 'Por favor, ingrese un nombre o modelo válido de producto',
      }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, nombre: '' }));
    }

    if (marca === '' || !/^[a-zA-Z\s]+$/.test(marca)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        marca: 'Por favor, ingrese una marca válida para el producto',
      }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, marca: '' }));
    }

    const formattedPrecio = parseFloat(precio.replace(/[.,]/g, ''));

    if (isNaN(formattedPrecio)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        precio: 'Por favor, ingrese un precio válido para el producto',
      }));
      formIsValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, precio: '' }));
    }
    // Si el formulario es válido, se agrega el producto
    if (formIsValid) {
      const existingProducts = localStorage.getItem('productos');
      let updatedProducts = [];

      if (existingProducts) {
        updatedProducts = JSON.parse(existingProducts);
      }
      // Agregar el nuevo producto al array de productos
      const newProduct = { categoria, nombre, marca, precio: formattedPrecio };
      updatedProducts.push(newProduct);
      // Actualizar los productos en localStorage
      setProductos(updatedProducts);
      localStorage.setItem('productos', JSON.stringify(updatedProducts));
      // Limpiar el formulario
      setCategoria('');
      setNombre('');
      setMarca('');
      setPrecio('');
      setErrors({
        categoria: '',
        nombre: '',
        marca: '',
        precio: '',
      });
      // Mostrar la alerta por 3 segundos
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };
  
  const handlePrecioChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = inputValue.replace(/[^\d]/g, ''); // Eliminar cualquier caracter que no sea un dígito

    setPrecio(formattedValue);
  };
  
  return (
    // Formulario para agregar productos
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-lg-6 mt-5">
        <h2 className="text-center title">ELECTRONICA BITORES</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos"
            onChange={(e) => searchProducts(e.target.value)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="categoria" className="form-label">
              <BiCategory className="form-icon" />
              Categoría del producto:
            </label>
            <select
              id="categoria"
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Teléfonos">Teléfonos</option>
              <option value="Computadoras portátiles">Computadoras portátiles</option>
              <option value="Tablets">Tablets</option>
              <option value="Monitores">Monitores</option>
              <option value="Cámaras digitales">Cámaras digitales</option>
              <option value="Impresoras">Impresoras</option>
            </select>
            {errors.categoria && <div className="error-message">{errors.categoria}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              <MdDriveFileRenameOutline className="form-icon" />
              Nombre o modelo del producto:
            </label>
            <input
              type="text"
              id="nombre"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa el nombre del producto"
            />
            {errors.nombre && <div className="error-message">{errors.nombre}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="marca" className="form-label">
              <MdComputer className="form-icon" />
              Marca del producto:
            </label>
            <input
              type="text"
              id="marca"
              className="form-control"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Ingresa la marca del producto"
            />
            {errors.marca && <div className="error-message">{errors.marca}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="precio" className="form-label">
              <RiMoneyDollarCircleFill className="form-icon" />
              Precio del producto:
            </label>
            <input
              type="text"
              id="precio"
              className="form-control"
              value={precio}
              onChange={handlePrecioChange}
              placeholder="Ingresa el precio del producto (CLP)"
            />
            {errors.precio && <div className="error-message">{errors.precio}</div>}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Agregar
            </button>
          </div>
        </form>
        {showAlert && (
          <div className="alert alert-success mt-3 text-center" role="alert">
            ¡Producto agregado exitosamente!
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulario;