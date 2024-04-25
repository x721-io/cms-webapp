import { Flowbite } from "flowbite-react";
import React from "react";
import { SWRConfig } from "swr/_internal";
import { WagmiConfig } from "wagmi";
import appTheme from "../../config/flowbite";
import { wagmiConfig } from "../../config/wagmi";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          refreshInterval: 0,
        }}
      >
        <Flowbite theme={{ theme: appTheme }}>{children}</Flowbite>
      </SWRConfig>
    </WagmiConfig>
  );
}
