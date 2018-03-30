const usernameField = document.getElementByID('username')

function getRepositories() {
  let username = usernameField.value
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${ username }/repos`)
  req.send()
}
