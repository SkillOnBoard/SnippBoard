function Footer({
  tempText,
  topBorder = true
}: {
  tempText: string
  topBorder?: boolean
}): JSX.Element {
  return (
    <div className="fixed bottom-2 left-0 w-full px-4">
      {topBorder && <hr className="border-gray-700 pb-2" />}
      <div className="px-4 text-gray-400">{tempText}</div>
    </div>
  )
}

export default Footer
