import { OverviewCard } from "~/components/overview-card";
import { ChartCard } from "~/components/chart-card"; 
import { LineChart } from "~/components/line-chart";
import { Card } from "~/components/ui/card";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

function Content(){
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-shrink flex-col justify-between gap-6 sm:flex-row">
          <OverviewCard props="1" title="Unresolved" />
          <OverviewCard props="2" title="Overdue" />
          <OverviewCard props="3" title="Open" />
          <OverviewCard props="5" title="On Hold" />
        </div>
        <Card className="container-fluid  flex flex-col justify-between bg-white md:flex-row">
          <div className="h-full w-full md:w-2/3">
            <LineChart />
          </div>
          <div className="w-sm mt-4 flex-col   md:mt-0 md:w-[350px]">
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

export default function HomePage() {
  
  return (
    <>
      <SignedOut>
        <div className="flex flex-col gap-4 justify-center items-center ">
          <div>
          <h1 className="text-2xl">Please sign in to continue</h1>
          </div>
          <SignInButton >
          <Button>
            Sign in
          </Button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <Content />
      </SignedIn>

    </>
  );
}
