const usernameField = document.getElementById('username')
let curusername = ''

function getRepositories() {
  let username = usernameField.value
  curusername = username
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${ username }/repos`)
  req.send()
}

function showRepositories(event, data) {
  let repos = JSON.parse(this.responseText)

  let repostring = repos.map(r => {
    let attributes = [
      'href="#"',
      `data-repo="${r.name}"`,
      `data-username="${r.owner.login}"`,
      'onclick="getCommits(this)"'
    ]
    return `<li>${r.name}<br><a ${attributes.join(' ')}>Get Commits</a></li>`
  }).join('')

  const repoList = `<ul>${ repostring }</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const username = el.dataset.username
  console.log(el.dataset)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${ username }/${ name }/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitString = commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')
  const commitsList = `<ul>${ commitString }</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${ curusername }/${ name }/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitString = commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')
  const commitsList = `<ul>${ commitString }</ul>`
  document.getElementById("commits").innerHTML = commitsList
}
