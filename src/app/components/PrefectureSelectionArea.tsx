"use client";

import { useEffect, useState } from "react";

interface prefecturesType {
  prefCode: number;
  prefName: string;
}

const PrefectureSelectionArea = () => {
  const apikey = process.env.NEXT_PUBLIC_X_API_KEY;
  const [prefectures, setprefectures] = useState<prefecturesType[]>([]);
  const [checkedStates, setCheckedStates] = useState<{
    [key: number]: boolean;
  }>({});

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
        setprefectures(data.result);
      }
    };
    fetchData();
  }, [apikey]);

  const handleChange = (prefCode: number) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [prefCode]: !prevState[prefCode],
    }));
  };

  return (
    <div>
      <h1>都道府県表示</h1>
      {prefectures &&
        prefectures.map((prefecture: prefecturesType) => (
          <button
            key={prefecture.prefCode}
            className="p-2 border rounded-lg m-1"
          >
            <input
              type="checkbox"
              checked={checkedStates[prefecture.prefCode] || false}
              onChange={() => handleChange(prefecture.prefCode)}
              className="mr-2"
            />
            {prefecture.prefName}
          </button>
        ))}
    </div>
  );
};

export default PrefectureSelectionArea;
