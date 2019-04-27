window.onresize = function () {
    location.reload();
}

// var app = window.angular.module('app', [])

// app.controller('mainCtrl', mainCtrl);

// //THE NAME OF THE MONGO DB is brewforge_db

// function mainCtrl($scope, $http) {
//     $scope.uploads = [];

//     //     title: String,
//     //   game: String,
//     //   type: String,
//     //   partySize: Number,
//     //   lvl: String,
//     //   desc: String,
//     //   fileUrl: String,
//     //   upvotes: {
//     //     type: Number,
//     //     default: 0
//     //   }
//     $scope.title = "";
//     $scope.game = "";
//     $scope.type = "";
//     $scope.partySize = "";
//     $scope.sugLvl = "";
//     $scope.desc = "";
//     $scope.fileUrl = "";
//     $scope.upvotes = 0;

//     $scope.getAll = function () {
//         return $http.get('/uploads').then(function successCallback(res) {
//                 angular.copy(res, $scope.uploads);
//             },
//             function errorCallback(res) {
//                 console.log("There was an error getting uploads");
//                 // called asynchronously if an error occurs
//                 // or server returns response with an error status.
//             });
//     };

//     $scope.upvote = function (upload) {
//         return $http.put('/browsing/' + upload._id + '/upvote')
//             .then(function successCallback(data) {
//                 console.log("upvote worked!");
//                 upload.upvotes += 1;
//             }, function errorCallback(response) {
//                 console.log("Upvote failed");
//             });
//     };

//     $scope.downvote = function (upload) {
//         return $http.put('/browsing/' + upload._id + '/downvote')
//             .then(function successCallback(data) {
//                 console.log("downvote worked!");
//                 if (upload.upvotes > 0) {
//                     upload.upvotes -= 1;
//                 }
//             }, function errorCallback(response) {
//                 console.log("downvote failed");
//             });
//     };

//     $scope.getAll();

//     $scope.options = [{
//             name: "One-Shot (1 session)",
//             id: 1
//         },
//         {
//             name: "Adventure (2-4 sessions)",
//             id: 2
//         },
//         {
//             name: "Campaign (4+ sessions)",
//             id: 3
//         },
//         {
//             name: "Custom class/race/etc.",
//             id: 4
//         },
//         {
//             name: "Custom map",
//             id: 5
//         }, {
//             name: "Other",
//             id: 6
//         }
//     ];
//     $scope.selectedOption = $scope.options[1];


//     // var UploadSchema = new mongoose.Schema({
//     //   title: String,
//     //   game: String,
//     //   type: String,
//     //   partySize: Number,
//     //   lvl: String,
//     //   desc: String
//     //   });

//     $scope.submit = function () {
//         var title = $('#title').val();
//         var game = $('#gameType').val();
//         var type = $('#type').val();
//         var partySize = $('#partySize').val();
//         var lvl = $('#sugLvl').val();
//         var desc = $('#desc').val();

//         var file = $('#file').val();

//         console.log("TITLE: " + title);
//         console.log("DESC: " + desc);

//         if (title == "" || desc == "" || game == "" || file == "") {
//             // TODO get file working or remove File!!!!
//             //console.error("Incomplete form");
//             return false;
//         }

//         $scope.create({
//             title: title,
//             type: type,
//             partySize: partySize,
//             lvl: sugLvl,
//             desc: desc
//         });
//     }

//     $scope.create = function (upload) {
//         return $http.post('/uploads', upload).then(function successCallback(response) {
//             $scope.uploads.push(response);
//             console.log("mongo db success");
//             // this callback will be called asynchronously
//             // when the response is available
//         }, function errorCallback(response) {
//             console.log("Upload failed");
//             // called asynchronously if an error occurs
//             // or server returns response with an error status.
//         });


//         // then(function (data) {
//         //     $scope.uploads.push(data);
//         // });
//     };
// }