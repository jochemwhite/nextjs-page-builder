import * as basicElements from './basicElements';
import * as Layout from './layout';
import * as Hero from './Hero';
import * as Discord from './discord';



const allElements = {
  ...basicElements,
  ...Layout,
  ...Hero,
  ...Discord
};


const elements = Object.values(allElements).map((element) => {
  return element
});







export { elements };




