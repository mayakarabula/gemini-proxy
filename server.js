const { spawnSync } = require('node:child_process');
const parse = require('gemini-to-html/parse')
const render = require('gemini-to-html/render')
const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()
const port = 2345

const fetchGem = (url) => {
    const gemget = spawnSync('gemget', [url, '-oout'])

    if (gemget.status === 0) {
        const data = fs.readFileSync(path.join(__dirname, 'out'), {encoding: 'utf-8'})
    
        const html = body + githubCss + render(parse(proxyLinks(data, url)))

        return html
    } else {
        console.log('!! error fetching ', url)
        return ''
    }
}

const proxyLinks = (gem, baseUrl) => {
    const newGem = gem.replaceAll(/=>.*/g, (link) => {
        let [marker, url, ...description] = link.split(/\s/)

        if (url.startsWith('gemini')) {
            url = 'http://localhost:' + port + '?gemUrl=' + url
        } else if (url.startsWith('http')) {
            url = url
        } else {
            url = 'http://localhost:' + port + '?gemUrl=' + baseUrl + '/' + url
        }
        
        return [marker, url, description.join(' ')].join(' ')
    })

    return newGem
}

const githubCss = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.css" integrity="sha512-q0UqxA0Ka1VxVBMFJoNfTVBYFWXqkNeF1N6WZPyLNULkF9YdpAuS/dqsN3/ClxBUzHJGrrkgLJFUlzFgXunXDQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />'

const body = '<body class="markdown-body" style="margin: 2em auto; max-width: 800px">'

app.get('/', (req, res) => {
    const gemUrl = req.query.gemUrl

    console.log('== fetching ', gemUrl)

    const gemHtml = fetchGem(gemUrl)

    res.send(gemHtml)
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })