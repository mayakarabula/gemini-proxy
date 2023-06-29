const style = `
 @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

html {
  font-family: 'Roboto Mono', monospace;
  color: #4c566a;
  background-color: #fcfdff;
  font-size: 14px;
}

a {
  color: #18758f;
  text-decoration: none;
}

a:visited {
  color: #18758f;
}

h1,
h2,
h3,
h4 {
  color: #5e81ac;
}

h3 {
  margin-top: 1.5em;
}

body {
  max-width: 800px;
  padding: 1em;
  margin: 1em auto;
}

blockquote {
  background: #ffffff;
  padding: 0.5em 2em;
}

.cover-image {
  max-height: 250px;
  object-fit: cover;
}

img {
  width: 100%;
  margin-bottom: 1em;
}

footer {
  display: flex;
  align-items: center;
}

hr {
  margin-top: 3em;
}
`

exports.default = style
