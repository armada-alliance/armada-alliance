import ImagesSection from './ImagesSection'
import HardwareSection from './HardwareSection'

const sectionTypes = {
    ImagesSection: props => <div className="px-4"><ImagesSection {...props} /></div>,
    HardwareSection
}

export default function ContentSections({ contentSections }) {

    if (!contentSections) {
        return null
    }

    return (
        <>
            {contentSections.map((section, index) => {

                const ContentSection = sectionTypes[section.type]

                if (!ContentSection) {
                    return null
                }

                return (
                    <ContentSection key={index} {...section} />
                )
            })}
        </>
    )
}