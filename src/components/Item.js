import React, { useContext, useEffect, useState } from "react";
import { MENU_ITEM_CDN_URL } from "../helpers/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { PiShootingStarFill } from "react-icons/pi";
import { MdLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import MyContext from "../Utils/MyContext";
import { addItems, removeItems } from "../Utils/cartSlice";

const Item = ({
  name,
  description,
  price,
  finalPrice,
  defaultPrice,
  id,
  imageId,
  itemAttribute,
  offerTags,
  ratings,
  ribbon,
  resDetailsData,
  isVeg,
}) => {
  const dispatch = useDispatch();
  const cartDetails = useSelector((store) => store.cart.cartItems);
  const context = useContext(MyContext);
  const [isPresent, setIsPresent] = useState(-1);
  const [quantity, setQuantity] = useState(0);
  const handleAddItem = () => {
    dispatch(
      addItems({ id, name, isVeg, price, defaultPrice, resDetailsData })
    );
  };
  const handleRemoveItem = () => {
    dispatch(
      removeItems({ id, name, isVeg, price, defaultPrice, resDetailsData })
    );
  };
  const handleResCartChange = () => {
    context.showResCartAlert();
  };
  const handleExistingItem = () => {
    const existingItemIndex = cartDetails.findIndex((item) => {
      return item.id === id;
    });
    setIsPresent(existingItemIndex >= 0);
    setQuantity(cartDetails[existingItemIndex]?.quantity);
  };
  useEffect(() => {
    handleExistingItem();
  }, [cartDetails]);
  return (
    <div className="px-6 py-8 border-b border-slate-200 last:border-b-0 group hover:bg-slate-50/50 transition-colors duration-300">
      <div className="flex justify-between items-start">
        <div className="flex flex-col flex-1 pr-6">
          {itemAttribute && (
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {itemAttribute.vegClassifier === "NONVEG" ? (
                  <div className="w-5 h-5 border-2 border-red-500 bg-red-50 rounded-lg flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-emerald-500 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                  </div>
                )}
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    itemAttribute.vegClassifier === "NONVEG"
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {itemAttribute.vegClassifier === "NONVEG"
                    ? "NON-VEG"
                    : "VEGETARIAN"}
                </span>
              </div>

              <div className="flex items-center">
                {ribbon?.text && (
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-100 to-red-100 px-3 py-1 rounded-full">
                    <PiShootingStarFill className="text-orange-500" />
                    <p className="text-orange-700 text-sm font-semibold">
                      {ribbon.text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <h1 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
            {name}
          </h1>

          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-2xl font-bold text-emerald-600">
              ₹{(price || finalPrice || defaultPrice) / 100}
            </h2>

            {offerTags && offerTags.length > 0 && (
              <div className="flex items-center space-x-2">
                <MdLocalOffer className="text-orange-500" />
                <div className="flex flex-wrap gap-2">
                  {offerTags.map((tag) => (
                    <span
                      key={tag.title}
                      className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {ratings?.aggregatedRating?.ratingCountV2 && (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-emerald-600 text-sm"
                />
                <h3 className="font-bold text-emerald-700">
                  {ratings.aggregatedRating.rating}
                </h3>
                <h3 className="text-sm text-slate-500 font-medium">
                  ({ratings.aggregatedRating.ratingCountV2})
                </h3>
              </div>
            </div>
          )}

          <p className="text-slate-600 leading-relaxed text-base">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center flex-shrink-0">
          {imageId && (
            <div className="relative mb-4">
              <img
                src={MENU_ITEM_CDN_URL + imageId}
                alt={name}
                className="w-40 h-36 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          )}

          {!isPresent || quantity <= 0 ? (
            <button
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold w-32 h-12 rounded-2xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-0.5"
              onClick={() => {
                if (cartDetails.length === 0) {
                  handleAddItem();
                } else if (
                  cartDetails[0]?.resDetailsData?.id !== resDetailsData?.id
                ) {
                  handleResCartChange();
                } else {
                  handleAddItem();
                }
              }}
            >
              ADD TO CART
            </button>
          ) : (
            <div className="flex items-center bg-white border-2 border-emerald-500 rounded-2xl shadow-lg overflow-hidden">
              <button
                className="flex items-center justify-center w-12 h-12 text-emerald-600 hover:bg-emerald-50 transition-colors font-bold text-xl"
                onClick={handleRemoveItem}
              >
                −
              </button>
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-500 text-white font-bold">
                {quantity}
              </div>
              <button
                className="flex items-center justify-center w-12 h-12 text-emerald-600 hover:bg-emerald-50 transition-colors font-bold text-xl"
                onClick={handleAddItem}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
