import { Footer } from 'antd/es/layout/layout'
import React from 'react'

const AppFooter = () => {

  return (
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        DocLean ©{new Date().getFullYear()}
      </Footer>
  )
}

export default AppFooter