import * as icons from './icons'

function Socials({ socials }) {

    return (
        <div className="mx-auto inline-flex items-center space-x-2 text-sm sm:text-base">
            {socials.map((social) => {

                const Icon = icons[social.icon]

                return (
                    <a key={social.id} href={social.link.href} title={social.link.title} target="_blank" className="flex flex-nowrap items-center px-3 py-2 space-x-2 rounded-lg text-white hover:opacity-50 transition-opacity duration-50" style={{ background: social.color }}>
                        <Icon className="h-5" />
                    </a>
                )

            })}
        </div>
    )
}


export default function PageSocials({ socials }) {

    return (
        <>
            {socials && socials.length ? (
                <div className="flex justify-center">
                    <Socials socials={socials} />
                </div>
            ) : null}
        </>
    )
}