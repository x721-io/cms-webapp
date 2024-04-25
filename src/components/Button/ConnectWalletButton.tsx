import { useState } from "react";
import Button from ".";
import { useAuth } from "../../hooks/useAuth";
import SignConnectMessageModal from "../modal/SignConnectMessageModal";
import WalletConnectModal from "../modal/WalletConnectModal";


interface Props {
  className?: string;
  children?: React.ReactNode;
  action?: (accessToken?: string) => void;
  showConnectButton?: boolean;
}

export default function ConnectWalletButton({
  action,
  className,
  showConnectButton,
  children,
}: Props) {
  const [showWalletConnect, setShowWalletConnect] = useState(false);
  const [showSignMessage, setShowSignMessage] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const { isValidSession } = useAuth();  

  const handleConnectWallet = () => {
    if (typeof localStorage !== "undefined") {
      if (!isValidSession) {
        localStorage.removeItem("auth-storage");
        setShowWalletConnect(true);
      } else {
        // Access Token has been saved in auth store
        action?.();
      }
    }
  };

  return (
    <>
      <div className={className} onClick={handleConnectWallet}>
        {showConnectButton && showSignature  ? (
          <Button
            type="button"
            className="w-full"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </Button>
        ) : (
          children
        )}
      </div>

      <WalletConnectModal
        show={showWalletConnect}
        onSignMessage={() => setShowSignMessage(true)}
        onClose={() => setShowWalletConnect(false)}
      />

      <SignConnectMessageModal
        show={showSignMessage}
        onClose={() => (setShowSignMessage(false), setShowSignature(false))}
      />
    </>
  );
}
 