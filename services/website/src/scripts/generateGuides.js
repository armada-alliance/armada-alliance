const fs = require('fs')
const YAML = require('yaml')
const dashify = require('./dashify')

const guides = [
    {
        title: 'Launch a Cardano Stake Pool',
        description: 'A full guide to creating a stake pool in which we set up a Block Producer Node & Relay Node.',
        labels: [
            'Stake Pool Operation',
            'Raspberry Pi',
            'ARM',
        ],
        href: '#',
        icon: '🚀',
        iconForeground: 'text-gray-700',
        iconBackground: 'bg-gray-50',
    },
    {
        title: 'Monitor your stake pool using Grafana',
        description: 'Configure your nodes to export metrics to be displayed on Grafana dashboards.',
        labels: [
            'Stake Pool Operation',
            'Raspberry Pi',
            'ARM',
        ],
        href: '#',
        icon: '📊',
        iconForeground: 'text-gray-700',
        iconBackground: 'bg-gray-50',
    },
    {
        title: 'Run a Cardano Node',
        description: 'Set up and run a Cardano Node on Raspberry Pi OS.',
        labels: [
            'Stake Pool Operation',
            'Raspberry Pi',
            'ARM',
        ],
        href: '#',
        icon: '🍓',
        iconForeground: 'text-red-700',
        iconBackground: 'bg-red-50',
    },
    {
        title: 'Run a Cardano Node using a prebuilt image',
        description: 'Download a preconfigured image with everything installed to run a Cardano Node on a Raspberry Pi out of the box.',
        labels: [
            'Stake Pool Operation',
            'Raspberry Pi',
            'ARM',
        ],
        href: '#',
        icon: '🍓',
        iconForeground: 'text-red-700',
        iconBackground: 'bg-red-50',
    },
    {
        title: 'Run a Cardano Node on Alpine Linux OS',
        description: 'Set up and run a Cardano Node on a very lightweight 🪶 Linux OS',
        labels: [
            'Stake Pool Operation',
            'Raspberry Pi',
            'ARM'
        ],
        href: '#',
        icon: '🗻',
        iconForeground: 'text-blue-700',
        iconBackground: 'bg-blue-50',
    },
    {
        title: 'Create Single Non-Fungible Token',
        description: 'How to create a Non-Fungible on Cardano with JavaScript.',
        labels: [
            'NFT',
            'JavaScript'
        ],
        href: '#',
        icon: '💰',
        iconForeground: 'text-yellow-700',
        iconBackground: 'bg-yellow-50'
    },
    {
        title: 'Create Collection of Non-Fungible Tokens',
        description: 'A guide to creating a NFT collection on Cardano with JavaScript.',
        labels: [
            'NFT',
            'JavaScript'
        ],
        href: '#',
        icon: '💰',
        iconForeground: 'text-yellow-700',
        iconBackground: 'bg-yellow-50'
    },
    {
        title: 'Run a Cardano Node on a Mac Mini M1',
        description: 'Get more performance out of your stake pool by setting up and run a Cardano Node on Apple Silicon',
        labels: [
            'Coming Soon',
            'Apple SOC',
        ],
        href: '#',
        icon: '🍎',
        iconForeground: 'text-red-700',
        iconBackground: 'bg-red-50'
    },
]

guides.forEach(guide => {

    guide = {
        template: "GuideDetailPage",
        ...guide
    }
    delete guide.iconForeground
    delete guide.iconBackground
    delete guide.href

    const content = `---
${YAML.stringify(guide)}---`

    fs.writeFileSync(__dirname + `/../../content/en/guides/${dashify(guide.title)}.yaml`, content)

})

