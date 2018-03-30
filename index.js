const usernameField = document.getElementById('username')

function getRepositories() {
  let username = usernameField.value
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${ username }/repos`)
  req.send()
}

function showRepositories(event, data) {
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  let array = repos.map(r => {
    '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>'
  })
  let repostring = array.join('')
  const repoList = `<ul>${ repostring }</ul>`
  document.getElementById("repositories").innerHTML = repoList
}
