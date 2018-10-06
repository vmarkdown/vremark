require('../assets/vremark.css');

const editor = require('./editor');

const preview = require('./preview');

function setValue() {
    const value = editor.getValue();
    preview.setValue(value);
}

editor.on("change",  function () {
    setValue();
});

setValue();