import { Injectable } from '@angular/core';

// TODO check how maintainable this class is / how to make it easier to maintain (intuition: very poorly, was done rather adhoc). Maybe move the Primer vocabulary list out and place it in a separate structure?

@Injectable({
  providedIn: 'root'
})

/**
 * Class to write the RDF annotation for data to be published on the EDM platform
 * (or any other place where data is stored in RDF (.ttl-style).
 *
 * Contains a number of static methods that generate respective strings (test strings validated through http://ttl.summerofcode.be/)
 */
export abstract class RDFAnnotationService {

  /**
   * Method to create the primer with the respective QNames from a list of (predefined) vocabularies.
   * Only pre-specified vocabularies can be chosen ('dct', 'dcat', 'org', 'rdf', 'rdfs', 'owl', 'xsd', 'skos', 'foaf', 'iirm', 'vcard', 'eur', 'dcatde').
   *
   * @param vocabularies array of the vocabularies to be used in the respective file, as an array pf prefix strings
   * @returns A string corresponding to the respective primer referencing the vocabulries provided in the argument
   * @throws Error throws an error when an unimplemented vocabulary is to be referenced in the argument array.
   */
  public static createPrimer(vocabularies: string[]): string {
    let preambleString = '';
    vocabularies.forEach(vocabularyToAdd => {
      preambleString += '@prefix ' + vocabularyToAdd + ':\t <http://';
      switch (vocabularyToAdd) {
        case 'dct': {
          preambleString += 'purl.org/dc/terms/';
          break;
        }
        case 'dcat': {
          preambleString += 'www.w3.org/ns/dcat#';
          break;
        }
        case 'org': {
          preambleString += 'www.w3.org/ns/org#';
          break;
        }
        case 'rdf': {
          preambleString += 'www.w3.org/1999/02/22-rdf-syntax-ns#';
          break;
        }
        case 'rdfs': {
          preambleString += 'www.w3.org/2000/01/rdf-schema#';
          break;
        }
        case 'owl': {
          preambleString += 'www.w3.org/2002/07/owl#';
          break;
        }
        case 'xsd': {
          preambleString += 'www.w3.org/2001/XMLSchema#';
          break;
        }
        case 'skos': {
          preambleString += 'www.w3.org/2004/02/skos/core#';
          break;
        }
        case 'foaf': {
          preambleString += 'xmlns.com/foaf/0.1/';
          break;
        }
        case 'iirm': {
          preambleString += 'www.wifa.uni-leipzig.de/iirm/';
          break;
        }
        case 'vcard': {
          preambleString += 'www.w3.org/2006/vcard/ns#';
          break;
        }
        case 'eur': {
          preambleString += 'publications.europa.eu/resource/authority/';
          break;
        }
        case 'dcatde': {
          preambleString += 'dcat-ap.de/def/dcatde/';
          break;
        }
        default:
          console.log('in default case with ' + vocabularyToAdd);
          throw new Error('vocabulary ' + vocabularyToAdd + ' is not implemented in annotation! Will create invalid RDF!!');
      }
      preambleString += '> .\n';
    });
    preambleString += '\n';
    return preambleString;
  }

  /**
   * Method to create a string for the VCard data of a number of predetermined authors (Simon), based on the string provided as the argument
   *
   * @param author The instance / person the VCard is to be generated for
   * @returns A string describing the VCard corresponding to the author as specified by the argument
   * @throws Error Throws error if author is not recognized (i.e. not in the predefined list of authors)
   */
  public static getAuthorVcardString(author: string) {
    switch (author) {
      case 'Simon':
        return 'iirm:SimonJohanning a vcard:individual;\n' +
          '\t\t\t\t\tvcard:hasEmail <mailto:johanning@wifa.uni-leipzig.de>;\n' +
          '      \t\t\t\tvcard:fn "Simon Johanning";\n' +
          '      \t\t\t\tvcard:hasAddress [ \ta vcard:Work;\n' +
          '        \t\t\t\t\t\t\t\tvcard:country-name "Germany";\n' +
          '        \t\t\t\t\t\t\t\tvcard:locality "Leipzig";\n' +
          '        \t\t\t\t\t\t\t\tvcard:postal-code "04109";\n' +
          '        \t\t\t\t\t\t\t\tvcard:street-address "Grimmaische Strasse 12" ];\n' +
          '      \t\t\t\tvcard:hasTelephone [ \ta vcard:Work,\n' +
          '        \t\t\t\t\t\t\t\t\tvcard:Voice;\n' +
          '        \t\t\t\t\t\t\t\t\tvcard:hasValue <tel:+493419733554> ] .\n\n';
      default:
        throw new Error('Author ' + author + ' is unknown; might create invalid RDF');
    }
  }

  /**
   * Method to generate the string describing a dcat:Dataset.
   * Based on the provided arguments, it generates the RDF-description of the respective dataset.
   * Method uses aliases (prefixes) for respective vocabularies (as noted with the parameters), which need to appear in the primer of the RDF-file.
   * All arguments but the instance name are optional.
   *
   * @param instanceName The name/reference of the instance to be described (including a the namespace). Makes use of the dcat vocabulary.
   * @param description A verbose, yet concise string for the description of the data set. Uses the dct vocabulary.
   * @param title The string representing the title of the data set. Uses the dct vocabulary.
   * @param contact The entity to contact regarding questions and requests about the dataset. Needs to be a string of the respective object (as URI). Uses the dcat vocabulary.
   * @param correspondingDistribution The URI of the distribution corresponding to the data set. Uses the dcat vocabulary.
   * @param keywords A map containing the keywords to be used for the data set. Features the language tags as keys and the respective strings of the keywords corresponding to the language tags as entries in the array. Uses the dcat vocabulary.
   * @param theme The URI of the theme the dataset is assigned to. Needs to a valid URI and ensure that the prefix is included in the primer. Uses the dcat vocabulary.
   * @param politicalGeocoding The URI of the political geocoding the dataset is assigned to. Needs to a valid URI and ensure that the prefix is included in the primer. Uses the dcatde vocabulary.
   *
   * @returns A string of (valid) RDF following .ttl-format including the provided arguments
   */
  public static createDataSetEntry(instanceName: string, description?: string, title?: string, contact?: string, correspondingDistribution?: string, keywords?: Map<string, string[]>, theme?: string, politicalGeocoding?: string) {
    let datasetRawString = '';
    datasetRawString += (instanceName + '\t a dcat:Dataset;\n');
    if (description !== undefined) {
      datasetRawString += ('dct:description "' + description + '";\n');
    }
    if (title !== undefined) {
      datasetRawString += ('dct:title "' + title + '";\n');
    }
    if (contact !== undefined) {
      datasetRawString += ('dcat:contactPoint ' + contact + ';\n');
    }
    if (correspondingDistribution !== undefined) {
      datasetRawString += ('dcat:distribution ' + correspondingDistribution + ';\n');
    }
    if (keywords !== undefined) {
      if (keywords.size > 0) {
        let keywordString = 'dcat:keyword ';
        keywords.forEach((value: string[], key: string) => {
          value.forEach(entry => {
            keywordString += ('" ' + entry + '"@' + key + ', ');
          });
        });
        // remove last comma and whitespace to replace it by a semicolon and add it to the descriptive string
        datasetRawString += keywordString.slice(0, keywordString.length - 2);
        datasetRawString += ';\n';
      }
    }
    if (theme !== undefined) {
      datasetRawString += ('dcat:theme ' + theme + ';\n');
    }
    if (politicalGeocoding !== undefined) {
      // TODO why inserting description here???
      datasetRawString += ('dcatde:politicalGeocodingURI "' + politicalGeocoding + '";\n');
    }
    let datasetString = datasetRawString.slice(0, datasetRawString.length - 2);
    datasetString += ' .\n\n';
    return datasetString;
  }

  /**
   * Method to generate the string describing a dcat:Distribution.
   * Based on the provided arguments, it generates the RDF-description of the respective distribution.
   * Method uses aliases (prefixes) for respective vocabularies (as noted with the parameters), which need to appear in the primer of the RDF-file.
   * All arguments but the instance name are optional.
   *
   * @param instanceName The name/reference of the instance to be described (including a the namespace). Makes use of the dcat vocabulary.
   * @param url The location under which the distribution is accessible, provided as a ressource.  Uses the dcat vocabulary.
   * @param title The string representing the title of the distribution. Uses the dct vocabulary.
   * @param license The URI of the license the distribution is licensed under. Needs to be a string of the respective object (as URI). Uses the dct vocabulary.
   *
   * @returns A string of (valid) RDF following .ttl-format including the provided arguments
   */
  public static createDistributionEntry(instanceName: string, url?: string, title?: string, license?: string) {
    let distributionRawString = '';
    distributionRawString += (instanceName + '\t a dcat:Dataset;\n');
    if (url !== undefined) {
      distributionRawString += ('dcat:accessURL ' + url + ';\n');
    }
    if (title !== undefined) {
      distributionRawString += ('dct:title "' + title + '";\n');
    }
    if (license !== undefined) {
      distributionRawString += ('dct:license ' + license + ';\n');
    }
    let distributionString = distributionRawString.slice(0, distributionRawString.length - 2);
    distributionString += ' .\n\n';
    return distributionString;
  }
}
