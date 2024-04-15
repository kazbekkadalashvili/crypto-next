'use client'

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchCryptoPrice} from "@/lib/features/priceSlice";
import {useAppDispatch} from "@/lib/hooks";

function CryptoPrice() {
  console.log('Store available in CryptoPrice');
  const dispatch = useAppDispatch;
  const { selectedCrypto, prices, loading, error } = useSelector(
    (state) => state.price
  );

  useEffect(() => {
    dispatch(fetchCryptoPrice()); 
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading Price...</p>}
      {error && <p>Error fetching price: {error}</p>}

      {prices[selectedCrypto] && ( 
        <p>Current price of {selectedCrypto}: {prices[selectedCrypto]}</p>
      )}
    </div>
  );
}

export default CryptoPrice;