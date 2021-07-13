module.exports = {
    id: 'PageContent',
    name: 'PageContent',
    type: 'Component',
    resolve: (ctx, props) => {

        return {
            ...props,
            editOnGitHubLink: {
                href: `https://github.com/armada-alliance/armada-alliance/tree/main/services/website/content/${props.filePath}`
            }
        }
    }
}