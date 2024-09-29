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
}

const GraphDisplayArea = ({ selectedPrefecture }: GraphDisplayProps) => {
  const [seriesData, setSeriesData] = useState<Highcharts.SeriesOptionsType[]>(
    [],
  );

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
        if (data && data.result && data.result.data && data.result.data[0]) {
          const values = data.result.data[0].data.map(
            (item: { value: number }) => item.value,
          );
          const prefecture = selectedPrefecture.find(
            (p) => p.prefCode === prefCode,
          );

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
  }, [selectedPrefecture]);

  const options: Highcharts.Options = {
    title: {
      text: "グラフ",
    },
    xAxis: {
      categories: [
        "1960",
        "1965",
        "1970",
        "1975",
        "1980",
        "1985",
        "1990",
        "1995",
        "2000",
        "2005",
        "2010",
        "2015",
        "2020",
        "2025",
        "2030",
        "2035",
        "2040",
        "2045",
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
