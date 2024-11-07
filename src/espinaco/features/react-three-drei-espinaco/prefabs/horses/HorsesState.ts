import { Signal, signal } from '@preact/signals-react';

export const showSceneHorses = signal<boolean>(true);

// TODO: Try to use this methods to work with my custom signals
// export const getShowSceneHorsesSignal = (): Signal<boolean> => {
//     return showSceneHorses;
// }

// export const getShowSceneHorses = (): boolean => {
//     console.log("GET: ", showSceneHorses.value );
//     return showSceneHorses.value;
// }
// export const setShowSceneHorses = (value: boolean): void => {
//     showSceneHorses.value = value;
// }