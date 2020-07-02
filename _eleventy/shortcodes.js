const generators = require('./generators.js')

module.exports = {
    icon: function (iconName, useInline) {
        return generators.icon(iconName, useInline)
    },

    callout: function (content, type = 'info') {
        return generators.callout(content, type)
    }
}
