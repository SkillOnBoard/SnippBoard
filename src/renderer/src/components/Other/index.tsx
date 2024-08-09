import { useNavigate } from 'react-router-dom';

function Other(): JSX.Element {
    const navigate = useNavigate();
    window.electron.ipcRenderer.send('resize-window', 'big')

  return (
    <div>
      Other
      <button onClick={()=> navigate("/")}>Nav to home</button>
    </div>
  )
}

export default Other