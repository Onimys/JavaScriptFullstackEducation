import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/globals.scss"
import stylevar from "./styles/_variables.module.scss"
import App from "./pages/App"
import { ConfigProvider } from "antd"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: stylevar["primary-color"],
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
