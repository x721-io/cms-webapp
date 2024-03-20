import React from 'react';
import Widget from "../../components/widget/Widget";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";


const AdminDashboard: React.FC = () => {
  return (
      <div>
        {/* Card widget */}

        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Earnings"}
              subtitle={"$340.5"}
          />
          <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Spend this month"}
              subtitle={"$642.39"}
          />
          <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Sales"}
              subtitle={"$574.34"}
          />
          <Widget
              icon={<MdDashboard className="h-6 w-6" />}
              title={"Your Balance"}
              subtitle={"$1,000"}
          />
          <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"New Tasks"}
              subtitle={"145"}
          />
          <Widget
              icon={<IoMdHome className="h-6 w-6" />}
              title={"Total Projects"}
              subtitle={"$2433"}
          />
        </div>

        {/* Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>AAA</div>
          <div>AAA</div>
        </div>

        {/* Tables & Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Check Table */}
          <div>
            <div>AAA</div>
          </div>

          {/* Traffic chart & Pie Chart */}

          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <div>AAA</div>
            <div>AAA</div>
          </div>

          {/* Complex Table , Task & Calendar */}

          <div>AAA</div>

          {/* Task chart & Calendar */}

          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <div>1111</div>
            <div className="grid grid-cols-1 rounded-[20px]">
              <div>2222</div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;
