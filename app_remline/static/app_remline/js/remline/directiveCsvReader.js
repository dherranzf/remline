
//----------------------------------------------------------------------------------------------------------------------------
// Directiva para leer ficheros csv
//----------------------------------------------------------------------------------------------------------------------------

app.directive('csvReader', function () { //basada en el proyecto https://github.com/bahaaldine/angular-csv-import

    //Funcion para convertir a json
    var convertToJSON = function (content) {

        //variables
        var lines = content.csv.split('\n'),
            headers = lines[0].split(content.separator),
            columnCount = lines[0].split(content.separator).length,
            results = [];

        // For each row
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var line = lines[i].split(new RegExp(content.separator + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
            // For each header
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = line[j];
            }
            // Añadirmos al array de resultados
            results.push(obj);
        }
        return results;
    };

    return {
        restrict: 'A',
        scope: {
            results: '=',
            separator: '=',
        },
        link: function (scope, element, attrs) {

            var data = {
                csv: null,
                separator: scope.separator || ','
            };

            element.on('change', function (e) {

                var files = e.target.files;

                if (files && files.length) {
                    // fileReader
                    var reader = new FileReader();
                    var file = (e.srcElement || e.target).files[0];
                    // fileReader has loaded
                    reader.onload = function (e) {
                        var contents = e.target.result;
                        data.csv = contents;
                        scope.$apply(function () {
                            scope.results = convertToJSON(data);

                        });
                    };
                    reader.readAsText(file);
                }
            });
        }
    };
});
