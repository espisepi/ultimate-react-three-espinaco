import { FollowCubePrefab } from "../follow-cube/FollowCubePrefab";
import { showSceneHorses } from "./HorsesState";

export function HorsesUI() {
  const toggleShowSceneHorses = () => {
    showSceneHorses.value = !showSceneHorses.value;
  };
  return (
    <>
      <FollowCubePrefab onClick={() => toggleShowSceneHorses()} />
    </>
  );
}
