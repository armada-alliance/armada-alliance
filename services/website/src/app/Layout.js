import Navigation from "./Navigation"
import FooterSection from "./FooterSection"

export default function Layout({ children }) {

    return (
        <div className="relative">
            <Navigation />
            {children}
            <FooterSection />
        </div>
    )
}