var DIRS = {
  // id (nombre de directorio) : titulo de entrega
  'tp0':'Trabajo Práctico 0',
  'admmemoria': 'Vector y Persona',
  'pila':'Pila',
  'cola':'Cola Enlazada',
  'lista':'Lista Enlazada',
  'tp1':'Trabajo Práctico 1: votaciones',
  'hash':'Tabla de Hash',
  'abb':'Árbol Binario de Búsqueda',
  'heap':'Heap',
  'tp2':'Trabajo Práctico 2',
  'tp3':'Trabajo Práctico 3'
}

var FILES ={
  // id (nombre de directorio) : contenido de directorio
  'tp0':['tp0.go','tp0_test.go', 'go.mod'],
  'admmemoria':['vector.go','persona.go','administrador_memoria.go','persona_test.go','vector_test.go', 'go.mod'],
  'pila':['pila.go','pila_dinamica.go','pila_test.go'],
  'cola':['cola.go'],
  'lista':[],
  'tp1':['diseno_alumnos.zip', 'pruebas.zip'],
  'hash':['diccionario.go','diccionario_test.go'],
  'abb':['diccionario_ordenado.go'],
  'heap':['cola_prioridad.go'],
  'tp2':['pruebas.zip'],
  'tp3':[]
}

var ENTREGABLES ={
  // id (nombre de directorio) : contenido a entregar
  'tp0':['tp0.go'],
  'admmemoria':['vector.go', 'persona.go'],
  'pila':['pila_dinamica.go','pila_test.go'],
  'cola':['cola_enlazada.go','cola_test.go'],
  'lista':['lista_enlazada.go','lista.go','lista_test.go'],
  'tp1':['Detalles en consigna'],
  'hash':['hash.go'],
  'abb':['abb.go','diccionario_ordenado_test.go'],
  'heap':['heap.go','cola_prioridad_test.go'],
  'tp2':['Detalles en consigna'],
  'tp3':['Detalles en consigna']
}

var currentZip;

$(document).ready(function() {
  $.each(DIRS, function(key,value){
    $('#tp').append($("<option></option>").attr('value',key).text(value))
  })
})

document.addEventListener("DOMContentLoaded", function() {
    $('#tp').on('input', function(){
      showFilesAdjuntos(this)
      showFilesEntregables(this)
      previewZip(this)
      toggleDownload()
    })
    $('#downloadzip').on('click', downloadZip);
})

function showFilesAdjuntos(event){
  var tp = $(event).val()
  var files = FILES[tp]
  var id = '#files-adjuntos'
  showFiles(id,files, true)
}

function showFilesEntregables(event){
  var id = '#files-entregables'
  var tp = $(event).val()
  var files = ENTREGABLES[tp]
  showFiles(id, files, false)
}

function showFiles(id, files, hasPreview){
  $(id).empty()
  $.each(files, function(i){
    var inputGroup = $(htmlFile(files[i], hasPreview));
    $(id).append(inputGroup)
  })
}

function htmlFile(file, hasPreview) {
  previewButton = '<span class="input-group-btn">' +
      '<button class="btn btn-default" type="button"' +
      'onclick="displayCode(\'' + file + '\')">' +
      '<i class="glyphicon glyphicon-new-window"></i>' +
      '</button>' +
      '</span>'
  return '<div class="form-group">' +
        '<div class="input-group">' +
        '<input type="text" class="form-control" value="' +
        file +
        '" readonly>' +
        (hasPreview ? previewButton : "") +
        '</div>' +
        '</div>'
}

function toggleDownload(){
  var files = $('#files-adjuntos')[0].childNodes
  if(files.length != 0) $('#downloadzip').prop('disabled',false)
  else $('#downloadzip').prop('disabled',true)
}

function downloadZip(){
  var tp = $('#tp').val()
  var files = $('#files-adjuntos').val()
  var zipurl = 'zips/'+tp+'.zip'
  window.location = zipurl
}

function previewZip(event) {
  var tp = $(event).val()
  var zipurl = 'zips/'+tp+'.zip'
  JSZipUtils.getBinaryContent(zipurl, function(err, data) {
    currentZip = data
  })
}

function displayCode(filename) {
  JSZip.loadAsync(currentZip).then(function(zippedFiles) {
    zippedFiles.file(filename).async("string").then((code) => {
      code = escapeHtml(code);
        $("#previewCode").html(code);
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        $("#modal-title").html(filename);
        $("#modal").modal('show');
    })
  });
}

function escapeHtml(str) {
    return str
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

