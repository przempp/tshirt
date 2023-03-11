import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ADD_ITEM_TO_ORDER,
  GET_ACTIVE_ORDER,
  GET_FACET_REDBUBBLE,
  GET_PRODUCT,
  GET_PRODUCT_FEATURED_ASSET,
  GET_PRODUCTS_DESIGNS,
} from "../../data/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import convertHtmlToReact from "@hedgedoc/html-to-react";
import { Carousel } from "react-responsive-carousel";
import Spinner from "../../components/spinner/spinner";
import Modal from "./components/modal";
import {
  useBackImage,
  ButtonComponent,
  SetInitialScroll,
} from "./components/helpers";

function TshirtPage() {
  const { id } = useParams();
  const [variant, setVariant] = useState(0);

  const [backDesignDialogueOpen, setBackDesignDialogueOpen] = useState(true);
  const [isPickingBackDesign, setIsPickingBackDesign] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [backImage, setBackImage] = useState("");

  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT, {
    variables: { slug: id },
  });

  const { data: dataRedbubble, loading: loadingRedbubble } =
    useQuery(GET_FACET_REDBUBBLE);
  const [getProductFeaturedAsset, { data: backFeaturedAssetData }] =
    useLazyQuery(GET_PRODUCT_FEATURED_ASSET);
  const { data: productsDesignsData } = useQuery(GET_PRODUCTS_DESIGNS);
  const [addItemToOrder] = useMutation(ADD_ITEM_TO_ORDER, {
    variables: {
      productVariantId: productData && productData.product.variants[variant].id, 
      quantity: 1, 
      backDesign: backImage, 
    },
    refetchQueries: [{ query: GET_ACTIVE_ORDER }, "GetActiveOrder"],
  });

  SetInitialScroll(productLoading);

  useBackImage({
    backImage,
    setBackImage,
    isPickingBackDesign,
    backDesignDialogueOpen,
    productsDesignsData,
  });

  const handleChange = (item: React.ReactNode) => {
    // @ts-ignore
    setBackImage(item.props.id);
  };

  if (productLoading)
    return (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
 

  if (productError)
    return (
      <div className="d-flex justify-content-center">
        <h2 className="loading-status">
          ERROR, try refreshing or contact us through our{" "}
          <a href="https://t.me/ETDsupportbot">Telegram bot</a>
        </h2>
      </div>
    );

  let clean = DOMPurify.sanitize(productData.product.description, {
    USE_PROFILES: { html: true },
  });

  const modalProps = {
    isOpen,
    setIsOpen,
    backDesignDialogueOpen,
    setBackDesignDialogueOpen,
    isPickingBackDesign,
    setIsPickingBackDesign,
    isConfirming,
    setIsConfirming,
    backImage,
    setBackImage,
    dataRedbubble,
    loadingRedbubble,
    data: productData,
    addItemToOrder,
    productsDesignsData,
    handleChange,
    getProductFeaturedAsset,
    variant,
    backFeaturedAssetData,
  };

  return (
    <div className="row justify-content-center">
      {Modal(modalProps)}
      <div className="col-lg-5 col-md-7 col-xl-6 align-self-center ">
        <Carousel
          preventMovementUntilSwipeScrollTolerance={true}
          showIndicators={false}
          swipeScrollTolerance={30}
          showArrows={false}
          showStatus={false}
          emulateTouch={true}
          infiniteLoop={true}
          onChange={(e) => setVariant(e)}
        >
          <div>
            <img
              className="animation tshirt-shadow"
              alt="product"
              onLoad={() => {}}
              src={`${productData.product.variants[0].featuredAsset.preview}?preset=large&format=webp`}
            />
          </div>
          <div>
            <img
              className="animation tshirt-shadow"
              alt="product"
              src={`${productData.product.variants[1].featuredAsset.preview}?preset=large&format=webp`}
            />
          </div>
        </Carousel>
      </div>

      <div className="col-lg-7 col-md-5 col-xl-6 tshirt-product-info justify-content-center align-self-center ">
        <div className=" mb-2">
          <h1 className="mb-0">{productData.product.variants[variant].name}</h1>
        </div>
        <div className="description">
          <h2 className="text-justify">{convertHtmlToReact(clean)}</h2>
          <hr className=" border-top border-bottom border-dark    " />
          {!loadingRedbubble &&
          dataRedbubble.facet.values[0].name === "true" &&
          !(process.env.REACT_APP_REDBUBBLE_OFF === "false") ? (
            <h2>
              <>
                Due to homoglobo shortages, we are currently handling the
                shipping and payment processing through{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.redbubble.com/people/enjoythedecline/shop"
                >
                  REDBUBBLE
                </a>
                .
                <br />
                Hand printing will return shortly.
              </>
            </h2>
          ) : (
            <>
              <h2 className="text-justify">
                PRICE: {productData.product.variants[0].price / 100}$
              </h2>
              <h2 className="text-justify ">
                EU SHIPPING + 10$, WORLD WIDE SHIPPING +20$
              </h2>{" "}
              <br />
            </>
          )}
        </div>
      </div>
      <div
        className="w-100"
        style={{ paddingLeft: "15px", paddingRight: "15px" }}
      >
        {ButtonComponent(
          () => {
            if (
              !loadingRedbubble &&
              dataRedbubble.facet.values[0].name === "true" &&
              !(process.env.REACT_APP_REDBUBBLE_OFF === "false")
            )
              window.open(
                productData.product.customFields.redbubbleLink,
                "_blank"
              );
            else {
              setIsOpen(true);
              setBackDesignDialogueOpen(true);
            }
          },
          !loadingRedbubble &&
            dataRedbubble.facet.values[0].name === "true" &&
            !(process.env.REACT_APP_REDBUBBLE_OFF === "false")
            ? "BUY ON REDBUBBLE"
            : "ADD TO CART"
        )}
      </div>
      <div className="col-sm-12 description">
        <hr className=" border-top border-bottom border-dark mb-4" />
        <h3>Can be supplied as t-shirt or tank top.</h3>
        <h3>
          Select sizes S, M, L, or XL, but no bigger since we don't want
          morbidly obese people to reflect badly on the brand. Go do some
          pushups lmao.
        </h3>
      </div>
    </div>
  );
}

export default TshirtPage;
