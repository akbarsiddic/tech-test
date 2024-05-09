import { OverviewCard } from "~/components/overview-card";
import { ChartCard } from "~/components/chart-card"; 
import { LineChart } from "~/components/line-chart";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

export default function HomePage() {
  
  return (
    <>
    <div className="space-y-6">
      <div className="flex flex-shrink flex-col justify-between gap-6 sm:flex-row">
        <OverviewCard props="1" title="Unresolved" />
        <OverviewCard props="2" title="Overdue" />
        <OverviewCard props="3" title="Open" />
        <OverviewCard props="5" title="On Hold" />
      </div>
      <Card className="container-fluid  flex flex-col md:flex-row justify-between bg-white">
        <div className="w-full h-full md:w-2/3">
          <LineChart />
        </div>
        <div className="flex-col w-sm md:w-[350px]   mt-4 md:mt-0">
          <ChartCard props="449" title="Receive" />
          <ChartCard props="426" title="Resolved" />
          <ChartCard props="33m" title="Average First Response Time" />
          <ChartCard props="3h 8m" title="Average Response Time" />
          <ChartCard props="94%" title="Resolution Withing SLA" />
        </div>
      </Card>
    </div>
    </>
  );
}
