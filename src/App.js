import React, { useRef, useState, useEffect } from "react";

function App() {
  const productName = useRef();
  const price = useRef();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    productName: "",
    price: "",
    index: -1
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  function addItem() {
    const newProduct = {
      productName: productName.current.value,
      price: price.current.value,
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  function deleteProduct(index) {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  function viewData(index) {
    const product = products[index];
    setCurrentProduct({ ...product, index });
  }

  function updateData() {
    const updatedProducts = [...products];
    updatedProducts[currentProduct.index] = {
      productName: currentProduct.productName,
      price: currentProduct.price
    };

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setCurrentProduct({ productName: "", price: "", index: -1 });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCurrentProduct(prevState => ({ ...prevState, [name]: value }));
  }

  return (
    <div className="App">
      <input type="text" ref={productName} placeholder="Product Name" />
      <input type="text" ref={price} placeholder="Price" />
      <button onClick={addItem}>Submit</button>

      {currentProduct.index !== -1 && (
        <div>
          <label>Name :</label>
          <input
            type="text"
            name="productName"
            value={currentProduct.productName}
            onChange={handleInputChange}
          />
          <label>Price :</label>
          <input
            type="number"
            name="price"
            value={currentProduct.price}
            onChange={handleInputChange}
          />
          <button onClick={updateData}>Update</button>
        </div>
      )}

      <table border={1}>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>delete</th>
            <th>update</th>
          </tr>
        </thead>
        <tbody>
          {products.map((val, index) => (
            <tr key={index}>
              <td>{val.productName}</td>
              <td>{val.price}</td>
              <td><button onClick={() => deleteProduct(index)}>delete</button></td>
              <td><button onClick={() => viewData(index)}>update</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
