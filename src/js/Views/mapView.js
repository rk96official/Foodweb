import {elements} from './base';
import {key2} from '../config';
export const renderCity = (query) => {
    
    const markup = `
    <iframe width="350" height="400" frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?q=${query}&key=${key2}" allowfullscreen></iframe>
    `;
    elements.map.insertAdjacentHTML('beforeend', markup);
}
 export const clearMap = () => {
    elements.map.innerHTML = '';
  
 }
 export const rendertop = (city) =>{
     const markup = `
     <center><h1><b>${city.name.toUpperCase()}, ${city.sys.country}</b></h1></center>
     <br />
     `
     elements.topic.insertAdjacentHTML('beforeend', markup);
 }
 export const cleartop = () => {
    elements.topic.innerHTML = '';
  
 }