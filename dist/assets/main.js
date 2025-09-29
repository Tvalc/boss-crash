(function () {
  // Boot using globals exposed by game.js and ui.js
  function boot() {
    var Controller = window.GameController;
    var initUI = window.initGameUI;
    if (!Controller || !initUI) return;
    var controller = new Controller();
    initUI(controller);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
