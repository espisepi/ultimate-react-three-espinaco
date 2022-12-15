// Nipple ==================
import ReactNipple from 'react-nipple';
// optional: include the stylesheet somewhere in your app
import 'react-nipple/lib/styles.css';

export function NippleJoystick() {


    const handleJoystick = (evt, data)=>{
        const angle = data?.direction?.angle || "undefined"; // angle = "down" || "left" || "right" || "up"
        // console.log( angle)
        if(angle === "up") {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'w'}));
        } else {
            window.dispatchEvent(new KeyboardEvent('keyup', {'key': 'w'}));
        }
        if(angle === "down") {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
        } else {
            window.dispatchEvent(new KeyboardEvent('keyup', {'key': 's'}));
        }
        if(angle === "left") {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}));
        } else {
            window.dispatchEvent(new KeyboardEvent('keyup', {'key': 'a'}));
        }
        if(angle === "right") {
            window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'd'}));
        }
        else {
            window.dispatchEvent(new KeyboardEvent('keyup', {'key': 'd'}));
        }
    };

    return (
                <ReactNipple
                    // supports all nipplejs options
                    // see https://github.com/yoannmoinet/nipplejs#options
                    options={{ mode: 'static', position: { bottom: '50%', left: '50%' } }}
                    // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                    style={{
                        outline: '1px dashed #ff00ff',
                        width: 150,
                        height: 150,
                        position: "absolute",
                        bottom: "50px",
                        left: '50vw',
                        opacity: 0.5,
                        // if you pass position: 'relative', you don't need to import the stylesheet
                    }}
                    // all events supported by nipplejs are available as callbacks
                    // see https://github.com/yoannmoinet/nipplejs#start
                    onStart={(evt, data) => handleJoystick(evt, data)}
                    onEnd={(evt, data) => handleJoystick(evt, data)}
                    onMove={(evt, data) => handleJoystick(evt, data)}
                    onDir={(evt, data) => handleJoystick(evt, data)}
                    onPlain={(evt, data) => handleJoystick(evt, data)}
                    onShown={(evt, data) => handleJoystick(evt, data)}
                    onHidden={(evt, data) => handleJoystick(evt, data)}
                    onPressure={(evt, data) => handleJoystick(evt, data)}
                />
    )
}