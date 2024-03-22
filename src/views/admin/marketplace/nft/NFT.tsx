import TableNFT from "./TableNFT";
import NFTNavbar from "./NFTNavbar";

export default function NFT() {


  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <NFTNavbar />

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableNFT />
      </div>
    </div>
  );
}
