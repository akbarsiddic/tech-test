import * as React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function ChartCard({ props, title }) {
  return (
    <Card className="p-4 hover:border-indigo-600">
      <CardHeader className="p-0">
        <CardTitle className="text-center text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto p-0 text-center text-4xl">
        {props}
      </CardContent>
    </Card>
  );
}
