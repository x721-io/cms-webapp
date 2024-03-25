import TableCollection from "./TableCollection";
import CollectionNavbar from "./CollectionNavbar";

export default function Collection() {
  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <CollectionNavbar />

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableCollection />
      </div>
    </div>
  );
}
