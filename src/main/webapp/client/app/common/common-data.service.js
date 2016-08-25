(function(angular, _) {
  'use strict';

  angular
    .module('app.common')
    .factory('dataService', dataService);

    dataService.$inject = [];
    function dataService() {
      return {
          getBookings: getBookings,
          getPoints: getPoints
      };

      function getBookings(startPointId, endPointId) {
        var data = [
          { startPoint: 1, endPoint: 2, flightNo: 'EZ1', email: 'ez1@gmail.com', date: new Date(), name: 'ez1 hall', landingTime: '11:00PM', image: 'http://lesmills.blob.core.windows.net/media/1156/flight-info_icon-13072015.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", price: "$120" },
          { startPoint: 2, endPoint: 4, flightNo: '122', email: 'zx@gmail.com', date: new Date(), name: 'HHH hall', landingTime: '12:00PM', image: 'http://lesmills.blob.core.windows.net/media/1156/flight-info_icon-13072015.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", price: "$120" },
          { startPoint: 3, endPoint: 4, flightNo: 'AA1', email: 'AA@gmail.com', date: new Date(), name: 'AAA hall', landingTime: '1:00PM', image: 'http://lesmills.blob.core.windows.net/media/1156/flight-info_icon-13072015.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", price: "$120" },
          { startPoint: 5, endPoint: 4, flightNo: 'DZ1', email: 'D1@gmail.com', date: new Date(), name: 'DD1 hall', landingTime: '11:00PM', image: 'http://lesmills.blob.core.windows.net/media/1156/flight-info_icon-13072015.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", price: "$120" },
          { startPoint: 9, endPoint: 10, flightNo: 'MM1', email: 'MM1@gmail.com', date: new Date(), name: 'MMM1 hall', landingTime: '4:00PM', image: 'http://lesmills.blob.core.windows.net/media/1156/flight-info_icon-13072015.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", price: "$120" },
          { startPoint: 7, endPoint: 1, flightNo: 'XX1', email: 'XXX@gmail.com', date: new Date(), name: 'XXX hall', landingTime: '11:00PM', image: 'http://lesmills.blob.core.windows.net/media/1156/flight-info_icon-13072015.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", price: "$120" },
          { startPoint: 1, endPoint: 3, flightNo: 'XFG', email: 'XFG@gmail.com', date: new Date(), name: 'XFG hall', landingTime: '11:00PM', image: 'http://lesmills.blob.core.windows.net/media/1156/flight-info_icon-13072015.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", price: "$120" },
          { startPoint: 6, endPoint: 7, flightNo: 'KKKK', email: 'KKKK@gmail.com', date: new Date(), name: 'KKKK hall', landingTime: '11:00PM', image: 'http://lesmills.blob.core.windows.net/media/1156/flight-info_icon-13072015.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", price: "$120" },
          { startPoint: 1, endPoint: 2, flightNo: 'HHG', email: 'HHG@gmail.com', date: new Date(), name: 'HHG hall', landingTime: '11:00PM', image: 'http://lesmills.blob.core.windows.net/media/1156/flight-info_icon-13072015.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", price: "$120" }
        ];

        var results = _.filter(data, function(o) { return o.startPoint === startPointId && o.endPoint === endPointId });

        return results;
      }

      function getPoints() {
        return [
            { 'id': 1, 'name': 'Colombo Airport', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
            { 'id': 2, 'name': 'Arugam Bay', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
            { 'id': 3, 'name': 'Dambulla', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' },
            { 'id': 4, 'name': 'Ella', 'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},
            { 'id': 5, 'name': 'Galle', 'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png' },
            { 'id': 6, 'name': 'Hikkaduwa', 'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png' },
            { 'id': 7, 'name': 'Kalpitiya', 'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png' },
            { 'id': 8, 'name': 'Kandy', 'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png' },
            { 'id': 9, 'name': 'Polunnaruwa', 'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png' },
            { 'id': 10, 'name':'Mirissa','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png' },
            { 'id': 11, 'name':'Weligama','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'}
        ];
      }

    }
}(angular, _));
