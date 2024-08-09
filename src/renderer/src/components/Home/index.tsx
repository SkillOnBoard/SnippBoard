import { useNavigate } from "react-router-dom";

function Home(): JSX.Element {
    const navigate = useNavigate();
    window.electron.ipcRenderer.send('resize-window', 'small')

  return (
    <div>
      Home
      <button onClick={()=> navigate("/other")}>Nav to other</button>
    </div>
  )
}

export default Home