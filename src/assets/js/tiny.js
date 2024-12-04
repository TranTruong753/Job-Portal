export function initializeTinyMCE(options = {},idName) {
    tinymce.init({
        selector: options.selector || idName,
        menubar: false,
        plugins: 'lists link image preview',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        setup: options.setup || (() => {}),
    });
  }