window.onload = function () {
  $(window).ready(function () {
    $('#auditorias-link').click(function (evt) {
      $('#auditoriasModal').modal();
    })
    $('#capacitaciones-link').click(function () {
      $('#capacitacionesModal').modal();
    })
    $('#liquidaciones-link').click(function () {
      $('#liquidacionesModal').modal();
    })
    $('#manuales-link').click(function () {
      $('#manualesModal').modal();
    })
    $('#eventos-link').click(function () {
      $('#eventosModal').modal();
    })
    $('#reclutamiento-link').click(function () {
      $('#reclutamientoModal').modal();
    })
  })
}