"use client";

import { useState } from "react";

export const buttonDatas = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

interface GraphOptionAreaProps {
  onOptionChange: (index: number) => void;
}

const GraphOptionArea = ({ onOptionChange }: GraphOptionAreaProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handleChange = (index: number) => {
    setSelectedIndex(index);
    onOptionChange(index);
  };
  return (
    <div className="text-center">
      <h2>オプション選択</h2>
      <div className="grid grid-cols-2 md:block m-3">
        {buttonDatas.map((buttonData: string, index: number) => (
          <button
            key={index}
            className="p-1 lg:p-2 border rounded-lg m-1"
            onClick={() => handleChange(index)}
          >
            <input
              type="radio"
              name="option"
              className="mr-2"
              checked={selectedIndex === index}
              onChange={() => handleChange(index)}
            />
            {buttonData}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GraphOptionArea;
