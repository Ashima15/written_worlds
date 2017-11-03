Template.SignUp.onRendered(function() {
    let settings = 'settings.json';
    this.autorun(() => {
      if (particlesJS) {
        console.log(`loading particles.js config from "${settings}"...`)
        /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
        particlesJS.load('particles-js', settings, function () {
          console.log('callback - particles.js config loaded');
        });
      }
    });
  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });