import Markdown from './Markdown'
import Layout from './Layout'
import Container from './Container'

function TermItem({ term }) {

    return (
        <div>
            <div className="font-bold">{term.name}</div>
            <Markdown children={term.description} />
        </div>
    )
}

export default function TermsMainPage({ terms }) {
    return (
        <Layout>
            <div className="bg-white">
                <Container>
                    <div className="mx-auto max-w-md space-y-4">
                        {terms.sort((a, b) => a.name.localeCompare(b.name)).map(term => {

                            return (
                                <TermItem key={term.name} term={term} />
                            )
                        })}
                    </div>
                </Container>
            </div>
        </Layout>
    );
}