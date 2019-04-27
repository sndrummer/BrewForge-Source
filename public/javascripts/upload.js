
var app = window.angular.module('app', [])
app.controller('mainCtrl', mainCtrl);

angular.module("app").directive("selectNgFiles", function () {
    return {
        require: "ngModel",
        link: function postLink(scope, elem, attrs, ngModel) {
            elem.on("change", function (e) {
                var files = elem[0].files;
                ngModel.$setViewValue(files);
            })
        }
    }
});

//THE NAME OF THE MONGO DB is brewforge_db
function mainCtrl($scope, $http) {

    $scope.title = "";
    $scope.game = "";
    $scope.type = "";
    $scope.partySize = "";
    $scope.sugLvl = "";
    $scope.desc = "";
    $scope.fileUrl = "";
    $scope.imgUrl = "https://cdn.shopify.com/s/files/1/1219/8174/articles/dd_1400x.jpg?v=1470147124";


    $scope.upvotes = 0;

    $scope.fileData = "";
    $scope.file = "";


    $scope.options = [{
            name: "One-Shot (1 session)",
            id: 1
        },
        {
            name: "Adventure (2-4 sessions)",
            id: 2
        },
        {
            name: "Campaign (4+ sessions)",
            id: 3
        },
        {
            name: "Custom class/race/etc.",
            id: 4
        },
        {
            name: "Custom map",
            id: 5
        }, {
            name: "Other",
            id: 6
        }
    ];
    $scope.selectedOption = $scope.options[0];


    $scope.fileNameChanged = function () {
        console.log("File change called");
        var fileReader = new FileReader();
        fileReader.onload = function () {
            $scope.fileData = fileReader.result; // data <-- in this var you have the file data in Base64 format
            console.log($scope.fileData);
        };
        fileReader.readAsDataURL($('#fileInput').prop('files')[0]);
        console.log("Success!");
    }


    $scope.setFile = function (element) {
        $scope.$apply(function () {
            $scope.file = element.files[0];
            console.log("$scope.file: ", $scope.file);
            console.log($scope.file.name);
        });
    };

    $scope.picChange = function () {
        console.log("Picchange called");

    }


    $scope.loading = function () {
        $(".lds-ring").show();
    }

    $scope.doneLoading = function () {
        $(".lds-ring").hide();
        $(".form-group").hide();
        $(".submitBtn").hide();
        $(".success").show();
    }


    $scope.submit = function () {

        var title = $('#title').val();
        var game = $('#game').val();
        var type = $scope.selectedOption.name; //$('#type').val();
        var partySize = $('#partySize').val();
        var sugLvl = $('#sugLvl').val();
        var desc = $('#desc').val();
        $scope.imgUrl = $('#imgURL').val();
        var upvotes = 0;
        var file = $scope.file;

        var regex0 = new RegExp(/^\s*$/);
        var regex1 = new RegExp(/^\d+$/);
        var regex2 = new RegExp(/^\d+\s*-\s*\d+$/);

        console.log("Regex test 1: " + regex1.test('1'));
        console.log("Regex test 2: " + regex2.test('1-2'));
        console.log("Regex test 3: " + regex2.test('1 -2'));

        console.log("TITLE: " + title);
        console.log("DESC: " + desc);

        if (title == "" || game == "" || file == "") {
            console.error("Not enough info");
            
            return false;
        }
        if (desc == "" ) {
            alert("Please include a brief description");
            return false;
        }
        if (! (regex0.test(partySize) || regex1.test(partySize) || regex2.test(partySize))) {
            console.error("Invalid format for party size");
            alert("Invalid format for party size, please use the format: 4 or 2-5, etc.");
            return false;
        }

        if (! (regex0.test(sugLvl) || regex1.test(sugLvl) || regex2.test(sugLvl))) {
            console.error("Invalid format for level range");
            alert("Invalid format for level range, please use the format: 5-15");
            return false;
        }

        // alert("Uploading has been temporarily disabled.\nThanks for your visit, come back again soon!");
        // return;

        $scope.uploadFile = function (file) {
            $scope.loading();
            console.log("upload file called!");
            var fileName = Date.now() + '_' + file.name;
            $scope.fileUrl = fileName;
            console.log("FILE NAME:::: ", fileName);
            var form_data = new FormData(); // Creating object of FormData class
            form_data.append("file-to-upload", file, fileName);
            $.ajax({
                url: "/uploadfile",
                dataType: 'script',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data, // Setting the data attribute of ajax with file_data
                type: 'post',
                success: handleData
            })
        }

        function handleData(data) {
            console.log("UPLOAD WAS A SUCCESS, adding to database");

            $scope.create({
                title: title,
                game: game,
                type: type,
                partySize: partySize,
                lvl: sugLvl,
                desc: desc,
                fileUrl: "/uploads/" + $scope.fileUrl,
                imgUrl: $scope.imgUrl,
                upvotes: 0
            });
            
        }

        $scope.uploadFile($scope.file);
    }

    $scope.create = function (upload) {
        console.log("CREATE CALLED");
        return $http.post('/uploads', upload).then(function successCallback(response) {
            //$scope.uploads.push(response);
            console.log("mongo db success");
            $scope.doneLoading();
        }, function errorCallback(response) {
            console.log("Upload failed");
            alert("Upload Failed, please upload refresh and upload a pdf file");
        });
    };

}