import React, { useState } from "react";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MenuCategory = ({ title, itemCards, resDetailsData }) => {
  const menuData = itemCards.map((x) => {
    return x.card.info;
  });
  const [isOpen, setIsOpen] = useState(true);
  const toggleCategory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-8">
      <div
        className="flex justify-between items-center cursor-pointer py-6 px-8 bg-gradient-to-r from-slate-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-100"
        onClick={toggleCategory}
      >
        <div className="flex items-center space-x-4">
          <h3 className="font-bold text-2xl text-slate-800 group-hover:text-emerald-600 transition-colors">
            {title}
          </h3>
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
            {itemCards.length} items
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 text-sm font-medium">
            {isOpen ? "Hide" : "Show"} items
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-slate-600 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            } group-hover:text-emerald-600`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="mt-6 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {menuData.map((item, index) => (
            <Item
              {...item}
              key={item.id || index}
              resDetailsData={resDetailsData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategory;
