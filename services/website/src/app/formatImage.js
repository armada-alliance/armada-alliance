export default function formatImage(src) {
    return src.charAt(0) === '/' ? `https://armada-alliance.com/assets${src}` : src
}