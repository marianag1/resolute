function main() {
    get('/api/whoami', {}).then(user => {
      renderNavbar(user);
      renderGoals(user);
    });
  }
  
  main();  