const BASE_URL = 'http://localhost:8080';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callApi(endpoint, options = {}) {
  //await simulateNetworkLatency();

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

const api = {
  products: {
    list() {
      return callApi('/products');
    },
    getOne(pId) {
      return callApi(`/products/${pId}`);
    },
    createOrEdit(product) {
      if(product.pName === '' || product.pBrand === '') {
        throw new Error('400: Empty forms')
      }
      //throw new Error('400: Empty forms')
      return callApi(`/products`, {
        method: 'POST',
        body: JSON.stringify(product),
      });
    },
    remove(pId) {
      return callApi(`/products/${pId}`, {
        method: 'DELETE',
      });
    }
  },
};

export default api;