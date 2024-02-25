import * as basicElements from './basicElements';
import * as Layout from './layout';
import * as Hero from './Hero';



const allElements = {
  ...basicElements,
  ...Layout,
  ...Hero
};


const elements = Object.values(allElements).map((element) => {
  return element
});







export { elements };




