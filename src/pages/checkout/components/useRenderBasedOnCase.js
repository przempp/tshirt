function useRenderBasedOnCase({
  customerDetails, setCustomerDetails,
  setCustomerForOrder,cancelButton,
  , setCurrentOrderStage,
  setShippingAddress,countriesDataFormated,
  shippingType, setShippingType,
  setShippingMethod, shippingMethodsFormated,
  customStyles, setSelectedCrypto, selectedCrypto,
  activeOrderData, transitionToPayment,
  editButton, secondsSinceOrderPlaced,
  storeCryptoAddresses, setTransactionID, addPayment,
  CustomerDetails, ShippingDetails, ShippingMethod, PaymentMethod, ReviewDetails, CustomerPays
}) {

  function renderBasedOnCase(currentOrderStage) {
    switch (currentOrderStage) {
      case 'customerDetailsStage':
        return CustomerDetails(
          customerDetails, setCustomerDetails,
          setCustomerForOrder,
          cancelButton, setCurrentOrderStage
        );
      case 'shippingDetailsStage':
        return ShippingDetails(
          setShippingAddress,
          customerDetails, setCustomerDetails,
          countriesDataFormated,
          cancelButton,
          currentOrderStage, setCurrentOrderStage
        );
      case 'shippingMethodStage':
        return ShippingMethod(
            shippingType, setShippingType,
            setShippingMethod, shippingMethodsFormated,
            customStyles,
            cancelButton,
            currentOrderStage, setCurrentOrderStage
        );
        case 'paymentMethodStage':
            return PaymentMethod(
                setSelectedCrypto, selectedCrypto,
                setShippingAddress, shippingType,
                cancelButton,
                currentOrderStage, setCurrentOrderStage
            );
        case 'paymentStage':
            return ReviewDetails(
                activeOrderData, transitionToPayment,
                setShippingAddress,
                cancelButton, editButton,
                currentOrderStage, setCurrentOrderStage
            );
        case 'customerPaysStage':
            return CustomerPays(
                activeOrderData,
                secondsSinceOrderPlaced,
                selectedCrypto,
                storeCryptoAddresses,
                setTransactionID,
                addPayment,
                editButton, cancelButton,
                currentOrderStage, setCurrentOrderStage)
      default:
        return;
    }
  }


  return { renderBasedOnCase };
}

export default useRenderBasedOnCase;