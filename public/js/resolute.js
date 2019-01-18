function main() {
    get('/api/whoami', {}).then(user => {
      renderNavbar(user);
    });

    // const user = {
    //   _id: undefined,
    //   name: 'Anonymous',
    // };
    // renderNavbar(user);    

  }
  
  main();  