"use client";

import { useEffect, useState } from "react";

interface prefecturesType {
  prefCode: number;
  prefName: string;
}

interface selectProps {
  onSelectPrefecture: (checkedStates: prefecturesType[]) => void;
}

const PrefectureSelectionArea = ({ onSelectPrefecture }: selectProps) => {
  const apikey = process.env.NEXT_PUBLIC_X_API_KEY;
  const [prefectures, setPrefectures] = useState<prefecturesType[]>([]);
  const [checkedStates, setCheckedStates] = useState<prefecturesType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (apikey) {
        const response = await fetch(
          "https://opendata.resas-portal.go.jp/api/v1/prefectures",
          {
            method: "GET",
            headers: {
              "X-API-KEY": apikey,
            },
          },
        );
        const data = await response.json();
        setPrefectures(data.result);
      }
    };
    fetchData();
  }, [apikey]);

  const handleChange = (prefecture: prefecturesType) => {
    setCheckedStates((prevState) => {
      const updatedStates = prevState.some(
        (p) => p.prefCode === prefecture.prefCode,
      )
        ? prevState.filter((p) => p.prefCode !== prefecture.prefCode)
        : [...prevState, prefecture];

      onSelectPrefecture(updatedStates);
      return updatedStates;
    });
  };

  return (
    <div>
      <h1 className="text-2xl text-center lg:text-3xl py-5 ">
        都道府県ごとの人口推移グラフ
      </h1>
      {prefectures.map((prefecture) => (
        <button key={prefecture.prefCode} className="p-1 lg:p-2 border rounded-lg m-1">
          <input
            type="checkbox"
            checked={checkedStates.some(
              (p) => p.prefCode === prefecture.prefCode,
            )}
            onChange={() => handleChange(prefecture)}
            className="mr-2"
          />
          {prefecture.prefName}
        </button>
      ))}
    </div>
  );
};

export default PrefectureSelectionArea;
