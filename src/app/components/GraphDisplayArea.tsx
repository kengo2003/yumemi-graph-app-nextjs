"use client";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";

interface prefecturesType {
  prefCode: number;
  prefName: string;
}

interface GraphDisplayProps {
  selectedPrefecture: prefecturesType[];
  index: number;
}

const GraphDisplayArea = ({ selectedPrefecture, index }: GraphDisplayProps) => {
  const [seriesData, setSeriesData] = useState<Highcharts.SeriesOptionsType[]>(
    [],
  );
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const fetchPopulationData = async (prefCode: number) => {
      const apikey = process.env.NEXT_PUBLIC_X_API_KEY;
      if (apikey && prefCode) {
        const response = await fetch(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": apikey,
            },
          },
        );

        if (!response.ok) {
          console.error("log:", response.status);
          return null;
        }

        const data = await response.json();
        if (
          data &&
          data.result &&
          data.result.data &&
          data.result.data[index]
        ) {
          const values = data.result.data[index].data.map(
            (item: { value: number }) => item.value,
          );
          const prefecture = selectedPrefecture.find(
            (p) => p.prefCode === prefCode,
          );
          setLabel(data.result.data[index].label);

          return {
            name: prefecture?.prefName,
            type: "line",
            data: values,
          };
        } else {
          console.error("log:", data);
          return null;
        }
      }
      return null;
    };

    const updateSeriesData = async () => {
      if (!selectedPrefecture || selectedPrefecture.length === 0) {
        setSeriesData([]);
        return;
      }

      const newSeriesData = await Promise.all(
        selectedPrefecture.map((pref) => fetchPopulationData(pref.prefCode)),
      );

      setSeriesData(
        newSeriesData.filter(Boolean) as Highcharts.SeriesOptionsType[],
      );
    };

    updateSeriesData();
  }, [selectedPrefecture, index]);

  const options: Highcharts.Options = {
    title: {
      text: `${label}グラフ`,
    },
    xAxis: {
      categories: [
        "1960年",
        "1965年",
        "1970年",
        "1975年",
        "1980年",
        "1985年",
        "1990年",
        "1995年",
        "2000年",
        "2005年",
        "2010年",
        "2015年",
        "2020年",
        "2025年",
        "2030年",
        "2035年",
        "2040年",
        "2045年",
      ],
    },
    yAxis: {
      title: {
        text: "人口",
      },
    },
    tooltip: {
      formatter: function () {
        return `${this.x}年<br/>${this.series.name}: ${this.y}人`;
      },
    },
    series: seriesData,
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
};

export default GraphDisplayArea;
