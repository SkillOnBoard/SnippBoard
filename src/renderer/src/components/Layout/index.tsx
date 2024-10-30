import Header from '@renderer/components/Header'
import Footer, { Action } from '@renderer/components/Footer'
import { PropsWithChildren } from 'react'

type Props = {
  back?: () => void
  footerActions?: Action[]
}

const Layout = ({ back, footerActions, children }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <div className="fixed w-full h-full left-0 top-0 bg-gray-800 border border-gray-700">
      {back && <Header tempText={'Save code'} />}
      {children}
      {footerActions && <Footer actions={footerActions} />}
    </div>
  )
}

export default Layout
