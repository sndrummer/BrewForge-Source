
var app = window.angular.module('app', [])

app.controller('mainCtrl', mainCtrl);

//THE NAME OF THE MONGO DB is brewforge_db
function mainCtrl($scope, $http) {
    $scope.uploads = [];
    $scope.title = "";
    $scope.game = "";
    $scope.type = "";
    $scope.partySize = "";
    $scope.sugLvl = "";
    $scope.desc = "";
    $scope.fileUrl = "";
    $scope.imgUrl = "";
    //imgUrl: String,
    $scope.upvotes = 0;

    $scope.upvoted = [];

    $scope.options = [{
            name: "",
            id: 0
        }, {
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



    $scope.gameOptions = [{
            name: "",
            id: 0
        }, {
            name: "Dungeons and Dragons, 5th edition",
            id: 1
        },
        {
            name: "Pathfinder",
            id: 2
        },
        {
            name: "AD&D",
            id: 3
        },
        {
            name: "Fantasy Flight Star Wars",
            id: 4
        },
        {
            name: "Other",
            id: 5
        }
    ];

    $scope.selectedType = $scope.options[0];
    $scope.selectedGameOption = $scope.gameOptions[0];
    $scope.search = "";

    $scope.uploadDisplayed = null;

    $scope.doSomething = function () {
        console.log("Size: ", $scope.uploads.length);
    };

    $scope.download = function (upload) {
        console.log("upload:", upload.fileUrl);
        
        $("#download-icon-small").attr({
            href: upload.fileUrl,
            download: upload.title
        });
    }
    $scope.downloadDesc = function (upload) {
        upload = $scope.uploadDisplayed;
        console.log("upload:", upload.fileUrl);
        // Add download
        // $("#download-icon").attr("download", true);
        $("#download-icon").attr({
            href: upload.fileUrl,
            download: upload.title
        });
    }

    $scope.getAll = function () {
        return $http.get('/uploads').then(function successCallback(res) {
                console.log("RESPONSE:", res);
                //angular.copy(res, $scope.uploads);
                console.log($scope.uploads.length);
                //let body = res.text(); // If response is a JSON use json()
                if (res) {
                    angular.copy(res.data, $scope.uploads);
                }
            },
            function errorCallback(res) {
                console.log("There was an error getting uploads");
            });
    };
    $scope.getAll();

    $scope.upvote = function (upload) {
        if ( $scope.upvoted.includes(upload)) {
            return;
        }
        console.log("upvote called");
        return $http.put('/uploads/' + upload._id + '/upvote')
            .then(function successCallback(data) {
                console.log("upvote worked!");
                upload.upvotes += 1;
                $scope.upvoted.push(upload);
            }, function errorCallback(response) {
                console.log("Upvote failed");
            });
    };

    $scope.downvote = function (upload) {
        return $http.put('/uploads/' + upload._id + '/downvote')
            .then(function successCallback(data) {
                console.log("downvote worked!");
                if (upload.upvotes > 0) {
                    //upload.upvotes -= 1;
                }
            }, function errorCallback(response) {
                console.log("downvote failed");
            });
    };

    $scope.getDescription = function (upload) {
        $scope.uploadDisplayed = upload;
        console.log("DESC: ", upload.desc)
        $(".filter-alt").hide();
        $(".list-group-item").hide();
        var title = upload.title;
        $(".content-container").css("background-color", "rgba(23, 13, 3, .9)");
        console.log("Title111: ", title)
        $("#desc-text-tag").text(title + ":");
        $("#desc-text").text(upload.desc);
        $scope.setImg();
        $("#desc-container2").show();
    }

    $scope.closeDescription = function () {
        upload = $scope.uploadDisplayed;
        console.log("DESC: ", upload.desc)
        $(".filter-alt").show();
        $(".list-group-item").show();
        $("#desc-text").text(upload.desc);
        $("#desc-container2").hide();
        $(".content-container").css("background-color", "rgba(80, 47, 13, .6)");
        $scope.uploadDisplayed = null;
    }

    $scope.setImg = function () {
        upload = $scope.uploadDisplayed;
        $("#desc-img").attr("src", upload.imgUrl);
        return upload.imgUrl;
    }


    $scope.filterCustom = function (upload) {
  
        typeFilter = $scope.selectedType.name;
        gameOptionFilter = $scope.selectedGameOption.name;
        searchFilter = $scope.search;

        if (typeFilter != upload.type && typeFilter != "") {
            return false;
        }

        if (gameOptionFilter != upload.game && gameOptionFilter != "") {
            return false;
        }

        if (searchFilter != "") {
            if ($scope.searchUpload(upload)) {
                return false;
            }
        }

        if (upload.upvotes > 500) {
            return false; // this will be NOT listed in the results
        }

        //console.log("Returning True");
        return true; // Will be listed in results
    };

    $scope.searchUpload = function (upload) {
        searchFilter = $scope.search;
        descrString = String(upload.desc);
        titleString = String(upload.title);

        if (upload.title.toLowerCase().includes(searchFilter.toLowerCase())) {
            return false;
        }
        if (upload.desc.toLowerCase().includes(searchFilter.toLowerCase())) {
            return false;
        }

        return true;
    }

}