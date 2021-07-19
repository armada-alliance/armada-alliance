import ImagesSection from './ImagesSection'

const sectionTypes = {
    ImagesSection
}

export default function ContentSections({ contentSections }) {

    if (!contentSections) {
        return null
    }



    return (
        <>
            {contentSections.map((section, index) => {

                const ContentSection = sectionTypes[section.type]

                return (
                    <ContentSection key={index} {...section} />
                )
            })}
        </>
    )
}