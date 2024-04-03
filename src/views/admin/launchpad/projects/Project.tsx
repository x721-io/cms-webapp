import ProjectNavbar from "./ProjectNavbar";
import TableProject from "./TableProject";

export default function Project() {
  return (
    <div className="flex flex-col gap-8">
      {/* Search */}
      <ProjectNavbar />

      {/* Table */}
      <div className="">
        <TableProject />
      </div>
    </div>
  );
}
