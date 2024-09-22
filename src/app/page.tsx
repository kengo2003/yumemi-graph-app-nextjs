import GraphDisplayArea from "./components/GraphDisplayArea";
import GraphOptionArea from "./components/GraphOptionArea";
import PrefectureSelectionArea from "./components/PrefectureSelectionArea";

export default function Home() {
  return (
    <div>
      <PrefectureSelectionArea />
      <GraphDisplayArea />
      <GraphOptionArea />
    </div>
  );
}
