import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchData = () => {
  const [menu, getMenu] = useState(``);
  const url = `http://localhost:8000/api/`;

  const getMenuData = () => {
    axios
      .get(`${url}menus`)
      .then((res) => {
        const menuItems = res.data[0];
        getMenu(menuItems);
      })
      .catch((err) => console.log(`Error: ${err}`));
  };
  getMenuData();
  console.log(menu);
};

export { FetchData };
