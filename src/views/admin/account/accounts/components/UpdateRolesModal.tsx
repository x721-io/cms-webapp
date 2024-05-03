import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import React from "react";
import UpdatePermission from "../../../../../components/permission/Permission";

interface Props extends ModalProps {
  roles: string[];
  accountId: string;
}

const modalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col h-auto max-h-[600px] desktop:max-h-[800px] tablet:max-h-[800px] w-[500px] ",
    base: "relative w-full desktop:p-10 tablet:p-6 p-4 flex items-center justify-center",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

export default function UpdateRolesModal({
  onClose,
  show,
  roles,
  accountId,
}: Props) {
  return (
    <Modal
      theme={modalTheme}
      position="center"
      onClose={onClose}
      show={show}
      size="md"
      className=" bg-black bg-opacity-50"
    >
      <Modal.Header className="p-4">Update Roles</Modal.Header>
      <Modal.Body className="p-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <UpdatePermission
            accountRoles={roles}
            accountId={accountId}
            onClose={onClose}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
