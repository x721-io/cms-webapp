import Upload from "../components/Upload";
import AccountInfo from "../components/AccountInfo";
import Permission from "../components/Permission";


export default function TableCreate() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        {/*<div className="col-span-4 lg:!mb-0">*/}
        {/*  <Banner />*/}
        {/*</div>*/}
        <div className="col-span-5 lg:col-span-5 lg:mb-0 3xl:col-span-6">
          <AccountInfo />
        </div>

        <div className="col-span-3 lg:!mb-0">
          <Permission />
        </div>

        <div className="z-0 col-span-3 lg:!mb-0">
          <Upload />
        </div>
      </div>
    </div>
  );
}
