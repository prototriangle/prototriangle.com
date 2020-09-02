// vue.config.js
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Alex Roy"
                args[0].meta = {description: "Alex is a computer science graduate aspiring to make a positive social impact through technology."}
                return args
            })
    }
}