// this is the couchdb tags view code that is part of a design document

"tags": {
           "map": "function(doc) {\n  for (var i=0;i<doc.categories.length; i++){\n     emit(doc.link, doc.categories[i]);\n  }\n}"
       }
