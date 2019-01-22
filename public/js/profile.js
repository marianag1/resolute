function main() {
    const profileId = window.location.search.substring(1);
    get('/api/user', {'_id': profileId}).then(profileUser => {
      renderUserData(profileUser);
      renderGoals(profileUser, true);
      renderProgress(profileUser);
    });
    get('/api/whoami', {}).then(user => {
      renderNavbar(user);
    });
  }
  
  function renderUserData(user) {
    // rendering name
    const nameContainer = document.getElementById('name-container');
    const nameHeader = document.createElement('h1');
    nameHeader.innerHTML = user.name;
    nameContainer.appendChild(nameHeader);
  }
  
  main();
  