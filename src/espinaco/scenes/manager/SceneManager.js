
import Scene1Canvas from '../Scene1';


export default function SceneManager({ id='scene1', style={position: 'absolute', top: '0', width: '100%', height: '100vh'} }) {
    if( id === 'scene1' ) {
        return <Scene1Canvas style={style} />
    } 
    else {
        alert(' No se ha definido la Scene elegida, Scene: ' + id);
        return null;
    }
}