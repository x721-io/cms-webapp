import { Spinner } from "flowbite-react";

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
}
