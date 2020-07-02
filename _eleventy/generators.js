const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it')()
const random = require('lodash/random')

const minify = (content) =>
    htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true
    })

const generateSpinner = () => {
    const layer = (
        index
    ) => `<div class="spinner__layer spinner__layer--${index}">
        <div class="spinner__circle-clipper spinner__left">
            <div class="spinner__circle"></div>
        </div>
        <div class="spinner__gap-patch">
            <div class="spinner__circle"></div>
        </div>
        <div class="spinner__circle-clipper spinner__right">
            <div class="spinner__circle"></div>
        </div>
    </div>`

    const layers = []
    for (let i = 1; i <= 4; i++) {
        layers.push(layer(i))
    }
    const output = `<div class="spinner">
        <div class="spinner__layercontainer">${layers.join('')}</div>
    </div>`

    return minify(output)
}

const generateIcon = (iconName, useInline) => {
    const spriteUrl = '/assets/icons/icons.sprite.svg'
    const iconId = `#icon-${iconName}`
    const href = useInline ? iconId : spriteUrl + iconId

    const output = `<svg class="icon icon--${iconName}" role="img" aria-hidden="true" width="24" height="24">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${href}"></use>
    </svg>`

    return minify(output)
}

const generateCallout = (content, type) => {
    let icon

    switch (type) {
        case 'action':
            icon = 'check'
            break

        case 'warning':
            icon = 'warning'
            break

        case 'tip':
            icon = 'lightbulb'
            break

        case 'info':
        default:
            icon = 'info'
            break
    }

    const output = `<div class="callout callout--${type}">
        <span class="callout__icon">${generateIcon(icon)}</span>
        <div class="callout__content">${markdownIt.render(content)}</div>
    </div>`

    return minify(output)
}

module.exports = {
    icon: generateIcon,
    callout: generateCallout
}
