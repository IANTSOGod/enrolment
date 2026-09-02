import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Dashboardstats } from "../services/Dashboardstats";
import ActivitiesTable from "../components/custom/Activitiestable";
import EnrolmentCard from "../components/custom/EnrolementCard";

export default function Dashboard() {
  const { data, isLoading, isError, error } = useQuery<Dashboardinterface>({
    queryKey: ["dashboardstats"],
    queryFn: Dashboardstats,
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-[#f8f9fb] p-6">
      <div className="mx-auto w-full max-w-300">
        {isLoading ? (
          <>Loading...</>
        ) : isError ? (
          <>{error.message}</>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-[40px] font-bold leading-none tracking-tight text-[#18181b]">
                Dashboard
              </h1>

              <p className="mt-2 text-[15px] text-[#52525b]">
                Overview of today's activities
              </p>
            </div>
            <EnrolmentCard
              data={data?.stats as StatOverview}
              proceed={() => {
                navigate("/admin/enrolment");
              }}
            ></EnrolmentCard>

            <div className="mt-9 mb-4 flex items-center justify-between">
              <h2 className="text-[22px] font-bold text-[#202124]">
                Recent Activity
              </h2>

              <Button
                variant="ghost"
                className="
              h-auto
              p-0
              text-[13px]
              font-medium
              text-primary
              hover:bg-transparent
              hover:text-[#000080]
            "
              >
                View All
              </Button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-[#dedede] bg-white">
              <ActivitiesTable
                data={data?.recentActivity as ActivityRow[]}
              ></ActivitiesTable>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
