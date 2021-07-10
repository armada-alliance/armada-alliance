import Header from "./Header"
import FooterSection from "./FooterSection"
import Component from "./Component"

export default function Layout({ components, children }) {

    return (
        <div className="">
            <Component use={Header} data={components.Header} />
            {children}
            <Component use={FooterSection} data={components.Footer} />
        </div>
    )
}