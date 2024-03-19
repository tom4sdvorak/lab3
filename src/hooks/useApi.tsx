import { useState, useEffect } from 'react';
// @ts-ignore
import XMLParser from 'react-xml-parser';

export const useApi = () => {
   const url = "https://www.finnkino.fi/xml/";

   const getMovies = async () => {
      const result = await fetch(url + "Events/");
      const xml = new XMLParser().parseFromString(await result.text());
      return xml.getElementsByTagName("OriginalTitle");
   }

   const getSchedule = async(cinID: string) => {
      const result = await fetch(url + "Schedule/?area=" + cinID);
      const xml = new XMLParser().parseFromString(await result.text());
      let dates = xml.getElementsByTagName("dttmShowStart");
      dates = dates.map((element) => (element.value));
      let titles = xml.getElementsByTagName("OriginalTitle");
      titles = titles.map((element) => (element.value));
      const shows = [];
      for (let i = 0; i < dates.length; i++){
         shows.push({
            start: dates[i].split("T")[1],
            title: titles[i]
         });
      }
      return shows;
   }

   return { getMovies, getSchedule }
}

export default useApi