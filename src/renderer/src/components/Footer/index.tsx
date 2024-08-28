function Footer({ tempText }: { tempText: string }): JSX.Element {
  return (
    <div className="fixed bottom-2 left-0 w-full px-4">
      <hr className="border-gray-600 pb-2" />
      <div className="px-4">{tempText}</div>
    </div>
  )
}

export default Footer
