function main() {
    const profileId = window.location.search.substring(1);
    // get('/api/user', {'_id': profileId}, function(profileUser) {
    //   renderUserData(profileUser);
    // });
    // get('/api/whoami', {}, function(user) {
    //   renderNavbar(user);
    // });
    get('/api/user', {'_id': profileId}).then(profileUser => {
      renderUserData(profileUser);
    });
    get('/api/whoami', {}).then(user => {
      renderNavbar(user);
      renderGoals(user, true);
      renderProgress(user);
    });
  }
  
  function renderUserData(user) {
    // rendering name
    const nameContainer = document.getElementById('name-container');
    const nameHeader = document.createElement('h1');
    nameHeader.innerHTML = user.name;
    nameContainer.appendChild(nameHeader);
    // <h1>User Name</h1>
 
    // maybe we figure out how to add a profile image later
    // // rendering profile image
    // const profileImage = document.getElementById('profile-image');
    // profileImage.style = 'background-image:url(https://i.pinimg.com/736x/98/e0/7d/98e07decc7c1ca58236995de3567e46a--cat-shirts-kitties-cutest.jpg)';

  }
  
  main();
  