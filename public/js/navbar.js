function newNavbarItem(text, url) {
    const itemLink = document.createElement('a');
    itemLink.innerHTML = text;
    itemLink.href = url;

    if (text === 'LOG IN' || text === 'LOG OUT') {
        itemLink.className = 'nav-item nav-link btn btn-danger';
        itemLink.role = 'button';
    }
    else {
        itemLink.className = 'nav-item nav-link';
    }
    return itemLink
  }
  
  function renderNavbar(user) {
    const navbarDivLeft = document.getElementById('nav-item-container-left');
    const navbarDivRight = document.getElementById('nav-item-container-right');
      
    // if user is signed in
    if (user._id !== undefined) {
      navbarDivLeft.appendChild(newNavbarItem('HOME', '/home'));
      navbarDivLeft.appendChild(newNavbarItem('PROFILE', '/u/profile?'+user._id));
      navbarDivLeft.appendChild(newNavbarItem('NEW GOAL', '/new-goal'));
      navbarDivRight.appendChild(newNavbarItem('LOG OUT', '/logout'));
    } else {
      navbarDivRight.appendChild(newNavbarItem('LOG IN', '/auth/google'));
    }
  }  