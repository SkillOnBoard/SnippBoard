import Header from '@renderer/components/Header'
import { ActionType } from '@renderer/components/Footer/Action'
import Footer from '@renderer/components/Footer'
import { PropsWithChildren } from 'react'

type Props = {
  back?: () => void
  footerActions?: ActionType[]
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
