"use client";
import { useState } from "react";
import GraphDisplayArea from "./components/GraphDisplayArea";
import GraphOptionArea from "./components/GraphOptionArea";
import PrefectureSelectionArea from "./components/PrefectureSelectionArea";

interface prefecturesType {
  prefCode: number;
  prefName: string;
}

export default function Home() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<
    prefecturesType[]
  >([]);

  const handlePrefectureSelect = (checkedStates: prefecturesType[]) => {
    setSelectedPrefecture(checkedStates);
  };

  return (
    <div>
      <PrefectureSelectionArea onSelectPrefecture={handlePrefectureSelect} />
      <GraphDisplayArea selectedPrefecture={selectedPrefecture} />
      <GraphOptionArea />
    </div>
  );
}
