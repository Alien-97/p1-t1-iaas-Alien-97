#!/usr/bin/env node
'use strict'; // modo estricto en JS, no se
// puede definir asignar un valor a una variable
// no definida etc...

const parseRDF = require('../lib/parse-rdf.js'); //invocando modulo parseRDF
const fs = require('fs'); // libreria para lectura por fichero
const expect = require('chai').expect; // require del
//modulo expect de la librería chai

const rdf = fs.readFileSync(`../data/pg132.rdf`); // la ruta al fichero que vamos a parsear
//console.log(JSON.stringify(book, null, ' '));

describe('parseRDF', () => {
  //Bloque de expectativas
  it('should be a function', () => {
    //Expectativa
    expect(parseRDF).to.be.a('function');
    // esperamos que parseRDF sea una funcion
  });

  it('should parse RDF content', () => {
    const book = parseRDF(rdf);
    expect(book).to.be.an('object');
    expect(book).to.have.a.property('id', 132);
    expect(book).to.have.a.property('title', 'The Art of War');
    expect(book)
      .to.have.a.property('authors')
      .that.is.an('array')
      .with.lengthOf(2)
      .and.contains('Sunzi, active 6th century B.C.')
      .and.contains('Giles, Lionel');
    expect(book)
      .to.have.a.property('subjects')
      .that.is.an('array')
      .with.lengthOf(2)
      .and.contains('Military art and science -- Early works to 1800')
      .and.contains('War -- Early works to 1800');
    expect(book)
      .to.have.a.property('lcc')
      .that.is.a('string')
      .with.a.lengthOf(1)
      .and.match(/^[^IOWXY]/);
  });
});
