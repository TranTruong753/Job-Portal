
// export function initializeTinyMCE() {
//   tinymce.init({
//     selector: '#description',  // Chọn textarea có id="description"
//     plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
//     toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
//   });
// }

export async function initializeTinyMCE(options = {}) {
  tinymce.init({
      selector: options.selector || '#description',
      menubar: false,
      plugins: 'lists link image preview',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      setup: options.setup || (() => {}),
  });
}
