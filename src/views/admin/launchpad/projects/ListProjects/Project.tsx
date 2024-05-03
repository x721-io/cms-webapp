import TableProject from "../UpdateProjects/TableProject";
import ProjectNavbar from "./ProjectNavbar";

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
