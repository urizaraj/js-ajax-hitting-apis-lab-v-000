const usernameField = document.getElementById('username')
let curusername = ''

function getRepositories() {
  let username = usernameField.value
  curusername = username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${ username }/repos`)
  req.send()
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)

  let repostring = repos.map(r => {
    let attributes = [
      'href="#"',
      `data-repo="${r.name}"`,
      `data-username="${r.owner.login}"`,
      'onclick="getCommits(this)"'
    ]
    return [
      '<li>',
      '<a href="',
      r.url,
      '" >',
      r.name,
      '</a>',
      '<br>',
      '<a ',
      attributes.join(' '),
      '>',
      'Get Commits',
      '</a>',
      '</li>'
    ]
  }).join('')

  const repoList = `<ul>${ repostring }</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${ username }/${ name }/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitString = commits.map(commit => {
    return [
      '<li>',
      '<strong>',
      commit.author.login,
      '</strong><br>',
      commit.commit.author.name,
      '<br>',
      commit.commit.message,
      '</li>'
    ].join('')
  }).join('')
  const commitsList = `<ul>${ commitString }</ul>`
  document.getElementById("details").innerHTML = commitsList
}
