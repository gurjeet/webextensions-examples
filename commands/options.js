const commandCount = 2;

// TODO: Remove this unused variable
const commandNames = (function(){
  var ret = [];
  for (var i = 1; i <= commandCount; ++i)
    ret.push('Command ' + i);

  return ret;
})();

/**
 * Update the UI: set the value of the shortcut textbox.
 */
async function updateUI() {
  let commands = await browser.commands.getAll();
  for (command of commands) {
    for (var i = 1; i <= commandCount; ++i) {
      var commandName = 'Command ' + i;
      if (command.name === commandName) {
        document.querySelector('#shortcut' + i).value = command.shortcut;
        document.querySelector('#description' + i).value = command.description;
        break;
      }
    }
  }
}

/**
 * Update the shortcut based on the value in the textbox.
 */
async function updateShortcuts() {
  for (var i = 1; i <= commandCount; ++i) {
    var commandName = 'Command ' + i;
    await browser.commands.update({
      name: commandName,
      shortcut: document.querySelector('#shortcut' + i).value,
      description: document.querySelector('#description' + i).value
    });
  }
}

/**
 * Reset the shortcut and update the textbox.
 */
async function resetShortcuts() {
  for (var i = 1; i <= commandCount; ++i) {
    var commandName = 'Command ' + i;
    await browser.commands.reset(commandName);
  }

  // Refresh the UI
  updateUI();
}

/**
 * Update the UI when the page loads.
 */
document.addEventListener('DOMContentLoaded', updateUI);

/**
 * Handle update and reset button clicks
 */
document.querySelector('#update').addEventListener('click', updateShortcuts)
document.querySelector('#reset').addEventListener('click', resetShortcuts)
