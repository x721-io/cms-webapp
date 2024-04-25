import { signMessage } from "@wagmi/core";
import {
  CustomFlowbiteTheme,
  Modal,
  ModalProps,
  Spinner,
  Tooltip,
} from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { SIGN_MESSAGE } from "../../config/contanst";
import Text from "../Text";
import Button from "../button";

const modalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col h-auto max-h-[600px] desktop:max-h-[800px] tablet:max-h-[800px]",
    base: "relative w-full desktop:p-10 tablet:p-6 p-4 ",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

export default function SignConnectMessageModal({
  show,
  onClose,
}: ModalProps) {
  const { address } = useAccount();
  const { isError, isLoading, error } = useSignMessage();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleSignMessage = useCallback(async () => {
    setAuthError("");

    if (!address) return;
    const date = new Date().toISOString();

    try {
      setIsAuthenticating(true);

      // @ts-ignore
      window.ReactNativeWebView
        ? await (window as any).ethereum.request({
            method: "personal_sign",
            params: [SIGN_MESSAGE.CONNECT(date), address],
          })
        : await signMessage({ message: SIGN_MESSAGE.CONNECT(date) });
        
      onClose?.();
    } catch (e: any) {
      setAuthError(e.message);
      setIsAuthenticating(false);
      console.error("Error signing connect message:", e);
    } finally {
      setIsAuthenticating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const renderContent = () => {
    switch (true) {
      case isAuthenticating:
        return (
          <>
            <Text className="text-primary text-heading-sm text-center font-semibold">
              Authenticating...
            </Text>
            <Text className="text-secondary text-center" variant="body-18">
              Connecting your wallet to U2U NFT Market
            </Text>
            <Spinner size="xl" />
          </>
        );
      case isError || !!authError:
        return (
          <>
            <Text className="text-error text-heading-sm text-center font-semibold">
              Error report
            </Text>
            <Tooltip content={error?.message || authError} placement="bottom">
              <Text
                className="text-secondary max-w-full text-ellipsis text-center"
                variant="body-18"
              >
                {error?.message || authError}
              </Text>
            </Tooltip>

            <div>
              <Button
                className="mb-5 w-full"
                variant="primary"
                onClick={handleSignMessage}
              >
                Try again
              </Button>
              <Button className="w-full" variant="secondary" onClick={onClose}>
                Close and Continue
              </Button>
            </div>
          </>
        );
      case isLoading:
      default:
        return (
          <>
            <Text className="text-primary text-heading-sm text-center font-semibold">
              Loading...
            </Text>
            <Text className="text-secondary text-center" variant="body-18">
              Sign the message in your wallet MetaMask to sign in safely
            </Text>
            <Spinner size="xl" />
            <Button className="w-full" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </>
        );
    }
  };

  useEffect(() => {
    if (show) {
      handleSignMessage();
    } else {
      setAuthError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <Modal
      theme={modalTheme}
      dismissible
      show={show}
      onClose={onClose}
      size="md"
    >
      <Modal.Body>
        <div className="mx-auto flex flex-col items-center gap-8 overflow-ellipsis p-8">
          {renderContent()}
        </div>
      </Modal.Body>
    </Modal>
  );
}
