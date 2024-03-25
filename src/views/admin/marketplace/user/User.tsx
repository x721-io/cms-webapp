import TableUser from "./TableUser";
import UserNavbar from "./UserNavbar";

export default function User() {
  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <UserNavbar />

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableUser />
      </div>
    </div>
  );
}
