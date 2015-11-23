'user strict';
angular.module('app')
    .factory('Colors', function () {
        var coloRgb = "#0000FF";

        var colors = [
            {id: 0, color: "#FF0000", name: "Red", rgb: "255, 0, 0"},
            {id: 1, color: "#00FF00", name: "Green", rgb: "0, 255, 0"},
            {id: 2, color: "#0000FF", name: "Dark blue", rgb: "0, 0, 255"},
            {id: 3, color: "#00FFFF", name: "Light blue", rgb: "0, 255, 255"},
            {id: 4, color: "#FFFF00", name: "Yellow", rgb: "255, 255, 0"},
            {id: 5, color: "#9900FF", name: "Purple", rgb: "153, 0, 255"},
            {id: 6, color: "#FF66FF", name: "Pink", rgb: "255, 102, 255"},
            {id: 7, color: "#FF9900", name: "Orange", rgb: "255, 153, 0"},
            {id: 8, color: "#009933", name: "Dark green", rgb: "0, 153, 51"}
        ];

        return {
            all: function () {
                return colors;
            },
            get: function (pos) {
                return colors[pos];
            },
            setRgbColor: function (pos) {
                coloRgb = pos.color;
            },
            getRgbColor: function(){
                return coloRgb;
            }
        }
    });