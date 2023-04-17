import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";
import { Toast, useNavigate } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate()


  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products/create");

    if (response.ok) {
      await refetchProductCount();
      setToastProps({ content: "5 products created!" });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/products/create");
    setIsLoading(false)

    console.log(await response.json())
  }

  return (
    <>
      {toastMarkup}
      <Card
        title="Product Counter"
        sectioned
        primaryFooterAction={{
          content: "Populate 5 Products",
          onAction: fetchProducts,
          loading: isLoading,
        }}
        secondaryFooterActions={[{content: 'view all products', onAction: () => navigate({name: 'Product'}, {target: 'new'})}]}
      >
        <TextContainer spacing="loose">
         <p>Use this nifty tool to create and update products</p>
        </TextContainer>
      </Card>
    </>
  );
}
