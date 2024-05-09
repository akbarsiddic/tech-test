import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";



export function OverviewCard({props, title}) {
  return (
    <Card className="w-[350px] hover:border-indigo-600">
      <CardHeader className="items-center text-gray-500">
        <CardTitle>{title}</CardTitle>
       
      </CardHeader>
      <CardContent className="text-4xl text-center mx-auto">
        {props}
      </CardContent>
      <CardFooter className="flex justify-between">
       
      </CardFooter>
    </Card>
  );
}
