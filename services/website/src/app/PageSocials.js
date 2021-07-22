import * as icons from './icons'

function Socials({ socials, badges }) {

    return (
        <div className="mx-auto inline-flex items-center space-x-2 text-sm sm:text-base">
            {(socials || []).map((social) => {

                const Icon = icons[social.icon]

                return (
                    <a key={social.id} href={social.link.href} title={social.link.title} target="_blank" className="flex flex-nowrap items-center px-3 h-8 justify-center space-x-2 rounded-lg text-white hover:opacity-50 transition-opacity duration-50" style={{ background: social.color }}>
                        <Icon className="h-5" />
                    </a>
                )

            })}
            {(badges || []).map((badge) => {

                return (
                    <div key={badge.name} className="flex flex-nowrap items-center px-3 h-8 justify-center text-sm space-x-2 rounded-lg text-white" style={{ background: badge.color }}>
                        {badge.name}
                    </div>
                )

            })}
        </div>
    )
}


export default function PageSocials({ socials, badges }) {

    return (
        <>
            {(socials && socials.length) || (badges && badges.length) ? (
                <div className="flex justify-center">
                    <Socials socials={socials} badges={badges} />
                </div>
            ) : null}
        </>
    )
}