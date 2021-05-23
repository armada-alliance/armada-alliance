import Header from "./Header"
import FooterSection from "./FooterSection"

export default function Layout({ children }) {

    return (
        <div className="">
            <Header />
            {children}
            <FooterSection />
        </div>
    )
}