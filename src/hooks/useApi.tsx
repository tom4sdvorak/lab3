import { useState, useEffect } from 'react';
// @ts-ignore
import XMLParser from 'react-xml-parser';

export interface MovieInfo {

}

export const useApi = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      const fetchPost = async () => {
         const response = await fetch(
            "https://www.finnkino.fi/xml/Events/"
         );
         const data = await response.text();
         const xml = new XMLParser().parseFromString(data); 
         console.log(xml.getElementsByTagName('Event'));
         setMovies(xml.getElementsByTagName('Event'));
         
         console.log(movies[1].children[1]);
         
      };
      fetchPost();
   }, []);
}

export default useApi