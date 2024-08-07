function Versions(): JSX.Element {
  const showSmall = (event): void => {
    event.preventDefault()
    window.electron.ipcRenderer.send('resize-window', 'small')
  }

  const showBig = (event): void => {
    event.preventDefault()
    window.electron.ipcRenderer.send('resize-window', 'big')
  }

  return (
    <div className="content-center">
      <input className="text-black draggable"></input>
      <br />
      <ul className="versions">
        <li>
          <button onClick={showSmall}>Show small</button>
        </li>
        <li>
          <button onClick={showBig}>Show big</button>
        </li>
      </ul>
    </div>
  )
}

export default Versions
