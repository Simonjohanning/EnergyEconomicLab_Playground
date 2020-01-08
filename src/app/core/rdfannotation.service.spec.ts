import {RDFAnnotationService} from './rdfannotation.service';

class RdfannotationService extends RDFAnnotationService {

}

describe('Service: rdfannotations', () => {

  let rdfAnnotationService: RdfannotationService;

  beforeEach(() => {
    rdfAnnotationService = new RdfannotationService();
  });

  describe('should create the correct primer', () => {
    it ('testing singleton', () => {
      expect(RDFAnnotationService.createPrimer(['dct'])).toEqual('@prefix dct:\t <http://purl.org/dc/terms/> .\n\n');
      expect(RDFAnnotationService.createPrimer(['dcat'])).toEqual('@prefix dcat:\t <http://www.w3.org/ns/dcat#> .\n\n');
      expect(RDFAnnotationService.createPrimer(['org'])).toEqual('@prefix org:\t <http://www.w3.org/ns/org#> .\n\n');
      expect(RDFAnnotationService.createPrimer(['rdf'])).toEqual('@prefix rdf:\t <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n\n');
      expect(RDFAnnotationService.createPrimer(['rdfs'])).toEqual('@prefix rdfs:\t <http://www.w3.org/2000/01/rdf-schema#> .\n\n');
      expect(RDFAnnotationService.createPrimer(['owl'])).toEqual('@prefix owl:\t <http://www.w3.org/2002/07/owl#> .\n\n');
      expect(RDFAnnotationService.createPrimer(['xsd'])).toEqual('@prefix xsd:\t <http://www.w3.org/2001/XMLSchema#> .\n\n');
      expect(RDFAnnotationService.createPrimer(['skos'])).toEqual('@prefix skos:\t <http://www.w3.org/2004/02/skos/core#> .\n\n');
      expect(RDFAnnotationService.createPrimer(['foaf'])).toEqual('@prefix foaf:\t <http://xmlns.com/foaf/0.1/> .\n\n');
      expect(RDFAnnotationService.createPrimer(['iirm'])).toEqual('@prefix iirm:\t <http://www.wifa.uni-leipzig.de/iirm/> .\n\n');
      expect(RDFAnnotationService.createPrimer(['vcard'])).toEqual('@prefix vcard:\t <http://www.w3.org/2006/vcard/ns#> .\n\n');
      expect(RDFAnnotationService.createPrimer(['eur'])).toEqual('@prefix eur:\t <http://publications.europa.eu/resource/authority/> .\n\n');
      expect(RDFAnnotationService.createPrimer(['dcatde'])).toEqual('@prefix dcatde:\t <http://dcat-ap.de/def/dcatde/> .\n\n');
      expect(() => {RDFAnnotationService.createPrimer(['blubb']); }).toThrow(new Error('vocabulary blubb is not implemented in annotation! Will create invalid RDF!!'));
    });

    it ('should create the primers in correct order', () => {
      expect(RDFAnnotationService.createPrimer(['dcat', 'skos', 'dct'])).toEqual('@prefix dcat:\t <http://www.w3.org/ns/dcat#> .\n' +
        '@prefix skos:\t <http://www.w3.org/2004/02/skos/core#> .\n' + '@prefix dct:\t <http://purl.org/dc/terms/> .\n\n');
    });
    it ('should throw an error for the first unrecognized input', () => {
      // throws error for first wrong input
      expect(() => {RDFAnnotationService.createPrimer(['vcard', 'scos', 'faf']); }).toThrow(new Error('vocabulary scos is not implemented in annotation! Will create invalid RDF!!'));
    });
  });

  it('should return author information', () => {
    expect(RDFAnnotationService.getAuthorVcardString('Simon')).toEqual('iirm:SimonJohanning a vcard:individual;\n' +
      '\t\t\t\t\tvcard:hasEmail <mailto:johanning@wifa.uni-leipzig.de>;\n' +
      '      \t\t\t\tvcard:fn "Simon Johanning";\n' +
      '      \t\t\t\tvcard:hasAddress [ \ta vcard:Work;\n' +
      '        \t\t\t\t\t\t\t\tvcard:country-name "Germany";\n' +
      '        \t\t\t\t\t\t\t\tvcard:locality "Leipzig";\n' +
      '        \t\t\t\t\t\t\t\tvcard:postal-code "04109";\n' +
      '        \t\t\t\t\t\t\t\tvcard:street-address "Grimmaische Strasse 12" ];\n' +
      '      \t\t\t\tvcard:hasTelephone [ \ta vcard:Work,\n' +
      '        \t\t\t\t\t\t\t\t\tvcard:Voice;\n' +
      '        \t\t\t\t\t\t\t\t\tvcard:hasValue <tel:+493419733554> ] .\n\n');

    expect( () => {RDFAnnotationService.getAuthorVcardString('someone'); }).toThrow(new Error('Author someone is unknown; might create invalid RDF'));
  });

  it( 'should create dataset entry', () => {
    expect(RDFAnnotationService.createDataSetEntry('iName')).toEqual('iName\t a dcat:Dataset .\n\n');

    expect(RDFAnnotationService.createDataSetEntry('iName', 'description', undefined,
      undefined, undefined, undefined,
      undefined, undefined)).toEqual('iName\t a dcat:Dataset;\n' +
      'dct:description "description" .\n\n');

    expect(RDFAnnotationService.createDataSetEntry('iName', undefined, 'title',
      undefined, undefined, undefined,
      undefined, undefined)).toEqual('iName\t a dcat:Dataset;\n' +
      'dct:title "title" .\n\n');

    expect(RDFAnnotationService.createDataSetEntry('iName', undefined, undefined,
      'contact', undefined, undefined,
      undefined, undefined)).toEqual('iName\t a dcat:Dataset;\n' +
      'dcat:contactPoint contact .\n\n');

    expect(RDFAnnotationService.createDataSetEntry('iName', undefined, undefined,
      undefined, 'corrDistr', undefined,
      undefined, undefined)).toEqual('iName\t a dcat:Dataset;\n' +
      'dcat:distribution corrDistr .\n\n');

    expect(RDFAnnotationService.createDataSetEntry('iName', undefined, undefined,
      undefined, undefined,  new Map([['key', ['value1', 'value2']]]),
      undefined, undefined)).toEqual('iName\t a dcat:Dataset;\n' +
      'dcat:keyword " value1"@key, " value2"@key .\n\n');

    expect(RDFAnnotationService.createDataSetEntry('iName', undefined, undefined,
      undefined, undefined, undefined,
      'theme', undefined)).toEqual('iName\t a dcat:Dataset;\n' +
      'dcat:theme theme .\n\n');

    expect(RDFAnnotationService.createDataSetEntry('iName', undefined, undefined,
      undefined, undefined, undefined,
      undefined, 'politGeocoding')).toEqual('iName\t a dcat:Dataset;\n' +
      'dcatde:politicalGeocodingURI "politGeocoding" .\n\n');
    // check all values

    expect(RDFAnnotationService.createDataSetEntry('iName', 'description', 'title',
      'contact', 'corrDistr', new Map([['key', ['value1', 'value2']]]),
      'theme', 'politGeocoding' )).toEqual('iName\t a dcat:Dataset;\n' +
      'dct:description "description";\n' + 'dct:title "title";\n' + 'dcat:contactPoint contact;\n' +
      'dcat:distribution corrDistr;\n' + 'dcat:keyword " value1"@key, " value2"@key;\n' + 'dcat:theme theme;\n' +
      'dcatde:politicalGeocodingURI "politGeocoding" .\n\n');
  });

  it('should create distribution entry', () => {
    expect(RDFAnnotationService.createDistributionEntry('iName')).toEqual(
      'iName\t a dcat:Dataset .\n\n');
    expect(RDFAnnotationService.createDistributionEntry('iName', 'url', undefined,
      undefined)).toEqual('iName\t a dcat:Dataset;\n' + 'dcat:accessURL url .\n\n');
    expect(RDFAnnotationService.createDistributionEntry('iName', undefined, 'title',
      undefined)).toEqual('iName\t a dcat:Dataset;\n' + 'dct:title "title" .\n\n');
    expect(RDFAnnotationService.createDistributionEntry('iName', undefined, undefined,
      'license')).toEqual('iName\t a dcat:Dataset;\n' + 'dct:license license .\n\n');

    expect(RDFAnnotationService.createDistributionEntry('iName', 'url', 'title',
      'license')).toEqual('iName\t a dcat:Dataset;\n' + 'dcat:accessURL url;\n' +
      'dct:title "title";\n' + 'dct:license license .\n\n');
  });
});
