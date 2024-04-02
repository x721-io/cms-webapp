import Banner from "./components/Banner";
import AccountInfo from "./components/AccountInfo";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-12 lg:!mb-0">
          <Banner />
        </div>
        {/*<div className="z-0 col-span-5 lg:!mb-0">*/}
        {/*  <Upload />*/}
        {/*</div>*/}
      </div>
      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-12 lg:!mb-0">
          <AccountInfo />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
