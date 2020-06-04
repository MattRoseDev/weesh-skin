require('@babel/register')({
    presets: ['@babel/env', '@babel/react']
})

const router = require('./src/app/routes').default
const Sitemap = require('react-router-sitemap').default

function generateSitemap() {
    return (
        new Sitemap(router)
            .build('http://www.weesh.me')
            .save('./src/public/sitemap.xml')
    );
}

generateSitemap();