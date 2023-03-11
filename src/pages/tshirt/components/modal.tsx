import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";
import React from "react";
import ReactModal from "react-modal";
import { Carousel } from "react-responsive-carousel";
import { customStyles } from "./styles";

type Props = {
  isOpen: boolean;
  setBackDesignDialogueOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPickingBackDesign: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsConfirming: React.Dispatch<React.SetStateAction<boolean>>;
  backDesignDialogueOpen: boolean;
  loadingRedbubble: boolean;
  dataRedbubble: any;
  setBackImage: React.Dispatch<React.SetStateAction<string>>;
  isPickingBackDesign: boolean;
  productsDesignsData: any;
  handleChange: (item: React.ReactNode) => void;
  getProductFeaturedAsset: LazyQueryExecFunction<any, OperationVariables>;
  backImage: string;
  variant: number;
  isConfirming: boolean;
  backFeaturedAssetData: any;
  data: any;
  addItemToOrder: any;
};

export default function modal({
  isOpen,
  setBackDesignDialogueOpen,
  setIsPickingBackDesign,
  setIsOpen,
  setIsConfirming,
  backDesignDialogueOpen,
  loadingRedbubble,
  dataRedbubble,
  data,
  setBackImage,
  addItemToOrder,
  isPickingBackDesign,
  productsDesignsData,
  handleChange,
  getProductFeaturedAsset,
  backImage,
  variant,
  isConfirming,
  backFeaturedAssetData,
}: Props) {
  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => {
        setBackDesignDialogueOpen(false);
        setIsPickingBackDesign(false);
        setIsOpen(false);
        setIsConfirming(false);
      }}
    >
      {backDesignDialogueOpen && (
        <div>
          {!loadingRedbubble &&
          dataRedbubble.facet.values[0].name === "true" &&
          !(process.env.REACT_APP_REDBUBBLE_OFF === "false") ? (
            <>
              <h1 className="text-center">
                THIS ITEM IS CURRENTLY AVAILABLE ONLY AT OUR REDBUBBLE STORE
              </h1>
              <a
                href={data.product.customFields.redbubbleLink}
                className="my-button mt-2 w-100 display-6 text-center"
              >
                BUY ON REDBUBBLE
              </a>
            </>
          ) : (
            <>
              <h1 className="text-center">
                WANT TO ADD A DIFFERENT BACK DESIGN?
              </h1>
              <div className="d-flex justify-content-around">
                <button
                  className="my-button"
                  onClick={() => {
                    setBackDesignDialogueOpen(false);
                    setIsPickingBackDesign(true);
                  }}
                >
                  YES
                </button>
                <button
                  className="my-button"
                  onClick={() => {
                    setBackDesignDialogueOpen(false);
                    setIsPickingBackDesign(false);
                    setIsOpen(false);
                    setBackImage("");
                    addItemToOrder();
                  }}
                >
                  NO
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {isPickingBackDesign && (
        <div>
          <h1 className="text-center" style={{ fontSize: "6vh" }}>
            SELECT DESIRED DESIGN ON THE BACK
          </h1>

          <Carousel
            showIndicators={false}
            showArrows={false}
            showStatus={false}
            emulateTouch={true}
            infiniteLoop={true}
            onChange={(index, item) => handleChange(item)}
          >
            {productsDesignsData &&
              productsDesignsData.collection.productVariants.items.map(
                (
                  items: {
                    product: {
                      name: string | undefined;
                      featuredAsset: { preview: any };
                    };
                  },
                  i: any
                ) => {
                  // console.log(items.product)
                  return (
                    <div id={items.product.name}>
                      <img
                        className="animation"
                        alt="product"
                        src={`${items.product.featuredAsset.preview}?w=200&h=150&mode=crop`}
                      />
                    </div>
                  );
                }
              )}
          </Carousel>
          <div className="text-center">
            <button
              className="my-button"
              onClick={() => {
                setBackDesignDialogueOpen(false);
                setIsPickingBackDesign(false);
                setIsConfirming(true);
                getProductFeaturedAsset({
                  variables: {
                    term: backImage,
                    id: [data.product.variants[variant].facetValues[0].id],
                  },
                });
              }}
            >
              SELECT
            </button>
          </div>
        </div>
      )}
      {isConfirming && (
        <div>
          <h2 className="text-center">YOUR SHIRT DESIGN:</h2>
          <div className="d-flex">
            <div className="d-flex flex-column col-6 text-center">
              <h2>FRONT</h2>
              <img
                className="animation"
                alt="product"
                src={`${data.product.variants[variant].featuredAsset.preview}?preset=small&format=webp`}
              />
            </div>
            <div className="d-flex flex-column col-6 text-center">
              <h2>BACK</h2>
              {backFeaturedAssetData && (
                <img
                  className="animation"
                  alt="product"
                  src={`${backFeaturedAssetData.search.items[0].productVariantAsset.preview}?preset=small&format=webp`}
                />
              )}
            </div>
          </div>
          <div className="text-center">
            <button
              className="my-button"
              onClick={() => {
                setIsOpen(false);
                setIsConfirming(false);
                addItemToOrder();
                setBackImage("");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </ReactModal>
  );
}
