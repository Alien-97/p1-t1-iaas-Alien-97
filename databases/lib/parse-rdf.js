'use strict';
const cheerio = require('cheerio');
//Modo estricto JS
// Prohibe usar funciones antes de declararlas
// y otras medidas

/**
 * Module exports nos permite usar
 * la funcion que le pasemos como libreria,
 * podremos hacer un require en otras partes
 * del proyecto etc...
 */
module.exports = (rdf) => {
  const $ = cheerio.load(rdf);
  const book = {};

  book.id = +$('pgterms\\:ebook')
    .attr('rdf:about')
    .replace('ebooks/', '');

  book.title = $('dcterms\\:title').text();

  book.authors = $('pgterms\\:agent pgterms\\:name')
    .toArray()
    .map((elem) => $(elem).text());

  book.subjects = $('[rdf\\:resource$="/LCSH"]')
    .parent()
    .find('rdf\\:value')
    .toArray()
    .map((elem) => $(elem).text());

  book.lcc = $('[rdf\\:resource$="/LCC"]')
    .parent()
    .find('rdf\\:value')
    .text();

  return book;
};
