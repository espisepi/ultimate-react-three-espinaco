import { UIPage1 } from "../pages/page1/UIPage1";
import { UIPage2 } from "../pages/page2/UIPage2";
import { UIPage3 } from "../pages/page3/UIPage3";
import { useUIStore } from "../store/UIStore";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const UIRouter = () => {
  // Ver el estado de las pantallas
  const { screen1, screen2, screen3 } = useUIStore((state) => state.screens);

  return (
    <>
      {/* Aquí agregamos las transiciones */}
      <TransitionGroup>
        <CSSTransition timeout={300} classNames="fade">
          <div>
            {<UIPage1 />}

            {screen2 && <UIPage2 />}

            {screen3 && <UIPage3 />}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};
