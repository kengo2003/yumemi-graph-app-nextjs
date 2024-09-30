"use client";
import { useState } from "react";
import GraphDisplayArea from "./components/GraphDisplayArea";
import GraphOptionArea from "./components/GraphOptionArea";
import PrefectureSelectionArea from "./components/PrefectureSelectionArea";

interface prefecturesType {
  prefCode: number;
  prefName: string;
}

export default function page() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<
    prefecturesType[]
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<number>(0);

  const handlePrefectureSelect = (checkedStates: prefecturesType[]) => {
    setSelectedPrefecture(checkedStates);
  };
  const handleOptionChange = (index: number) => {
    setSelectedOptions(index);
    console.log("選択されたオプション:", index);
  };

  return (
    <div>
      <PrefectureSelectionArea onSelectPrefecture={handlePrefectureSelect} />
      <GraphDisplayArea
        selectedPrefecture={selectedPrefecture}
        index={selectedOptions}
      />
      <GraphOptionArea onOptionChange={handleOptionChange} />
    </div>
  );
}
