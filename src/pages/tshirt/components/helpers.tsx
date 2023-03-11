import React, { useEffect } from "react";

type Props = {
  backImage: string;
  isPickingBackDesign: boolean;
  backDesignDialogueOpen: boolean;
  setBackImage: React.Dispatch<React.SetStateAction<string>>;
  productsDesignsData: any;
};

export function useBackImage({
  backImage,
  setBackImage,
  isPickingBackDesign,
  backDesignDialogueOpen,
  productsDesignsData,
}: Props) {
  useEffect(() => {
    if (productsDesignsData && backImage === "" && isPickingBackDesign) {
      setBackImage(
        productsDesignsData.collection.productVariants.items[0].product.name
      );
    }
    if (backDesignDialogueOpen) setBackImage(""); // on new modal open - reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPickingBackDesign, backDesignDialogueOpen]);
}

export const SetInitialScroll = (productLoading: boolean) => {
  useEffect(() => {
    console.log("set scroll");
    window.scrollTo(0, 240);
  }, [productLoading]);
};

export const ButtonComponent = (
  onClickFunction: React.MouseEventHandler<HTMLButtonElement>,
  text: string
) => {
  return (
    <button
      className="my-button mt-2 w-100 display-6"
      onClick={onClickFunction}
    >
      {text}
    </button>
  );
};
