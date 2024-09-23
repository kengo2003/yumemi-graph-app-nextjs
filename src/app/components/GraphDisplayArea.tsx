"use client";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

const GraphDisplayArea = (props: HighchartsReact.Props) => {
  const options: Highcharts.Options = {
    title: {
      text: "グラフ",
    },
    series: [
      {
        type: "line",
        data: [1, 2, 3, 5, 3, 10, 0, 1, 1.2, 3.4],
      },
    ],
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default GraphDisplayArea;
