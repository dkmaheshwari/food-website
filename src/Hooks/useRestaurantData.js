import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useRestaurantData = () => {
  const [resList, setResList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);

  async function getRestaurants() {
    try {
      const data = await fetch("http://localhost:5000/api/restaurants");
      const json = await data.json();
      setResList(json);
      setFilteredResList(json);
    } catch (err) {
      console.log("Error fetching restaurants: ", err);
    }
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  return [resList, filteredResList, setFilteredResList];
};

export default useRestaurantData;
