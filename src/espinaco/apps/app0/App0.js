import useAppStore from "../../../AppStore";


export default function App0() {

    const setAppId = useAppStore(state => state.setAppId);

    return (
        <>
            <h1>Bienvenidos a Sepinaco World</h1>
            <button
            onClick={()=>setAppId(1)}
            style={{
                width: "10rem",
                height: "10rem",
                backgroundColor: "red"
            }}>App 1</button>
            <button
            onClick={()=>setAppId(2)}
            style={{
                width: "10rem",
                height: "10rem",
                backgroundColor: "red"
            }}>App 2</button>
        </>
    )
}