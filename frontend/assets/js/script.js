const ajaxCall = function () {
  return $.ajax({
    url: 'http://localhost:8080/data',
    type: 'GET',
    dataType: 'JSON',
  });
};


$(() => {
  ajaxCall().done(res => console.log(res));
});
