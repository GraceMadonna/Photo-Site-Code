var directoryToJson = require('./directoryToJson.js');
var resizer = require('./resize.js');
resizer.resizer.sizes = [1200];
console.log('directoryToJson');
directoryToJson.buildDirectory(
    {
        root:'images/galleries', // start at images/galleries folder
        outputFile:'galleries.js', // Create a galleries.js file to contain our galleries data
        jsonPrefix:'var galleries=', // Store JSON output in "galleries" global variable :)
        outputTransform: (fn)=>resizer.resizer.mapSizes(fn), // make each image a map of different available filesizes
        filter : (fn)=>!fn.match(resizer.resizer.resizedMatcher),
        postProcess : (galleries)=>{
          for (var gallery of galleries) {
            gallery.images = gallery.images.filter(
              (imageData)=>{
                var imageNames = Object.values(imageData);
                if (imageNames.length > 0) {
                  // If our image contains the string 'cover' in any case...
                  if (imageNames[0].toLowerCase().indexOf('cover')>-1) {
                    return false;
                  }
                }
                return true;
              }
            ) // end filter
          } // end for each gallery...
          return galleries;
        }
    });


resizer.resizer.crawl({
  dir:'images/galleries',
}); // Do the actual resizing of images
//console.log('End of build.js');
//console.log('Not resizing images for now -- so so sorry');
