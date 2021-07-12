import Header from "./Header"
import FooterSection from "./FooterSection"
import Component from "./Component"

export default function Layout({ components, children }) {

    return (
        <div className="pt-16 sm:pt-24">
            {children}
            <Component use={FooterSection} data={components.Footer} />
            <Component use={Header} data={components.Header} />
        </div>
    )
}