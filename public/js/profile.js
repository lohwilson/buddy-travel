// console.log('profile js is working')


// const $totalSpent = $('#totalSpent')
// const $totalSpentFlight = $('#totalSpentFlight')
// const $totalSpentAccommodation = $('#totalSpentAccommodation')

// let totalSpent = parseInt($totalSpent.attr('val'))
// let totalSpentFlight = parseInt($totalSpentFlight.attr('val'))
// let totalSpentAccommodation = parseInt($totalSpentAccommodation.attr('val'))
// let spending = totalSpent - totalSpentFlight - totalSpentAccommodation

// let spendingPercentage = (spending/totalSpent*100).toFixed(2)
// let flightPercentage = (totalSpentFlight/totalSpent*100).toFixed(2)
// let accommodationPercentage = (totalSpentAccommodation/totalSpent*100).toFixed(2)

// const $ctx1 = $("#myChart1")[0].getContext('2d');
// let myChart = new Chart($ctx1, {
//     type: 'pie', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
//     data: {
//         labels: ['Spending', 'Flight', 'Accommodation'],
//         datasets: [{
//             label: 'Amount spent based on category',
//             data: [spendingPercentage, flightPercentage, accommodationPercentage],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.4)',
//                 'rgba(54, 162, 235, 0.4)',
//                 'rgba(255, 206, 86, 0.4)',
//                 'rgba(75, 192, 192, 0.4)',
//                 'rgba(153, 102, 255, 0.4)',
//                 'rgba(255, 159, 64, 0.4)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1,
//             hoverBorderWidth: 5
//         }]
//     },
//     options: {
//         responsive: true,
//         animation: {
//             animateScale: true
//         },
//         cutoutPercentage: 20,
//         title: {
//             display: true,
//             text: 'Amount spent based on category (%)',
//             fontSize: 25
//         },
//         legend: {
//             display: true,
//             position: 'right',
//             labels: {
//                 fontColor: '#000'
//             }
//         },
//         layout: {
//             padding: {
//                 left: 50,
//                 right: 0,
//                 bottom: 0,
//                 top: 0
//             }
//         },
//         tooltips: {
//             enabled: true
//         }
//     }
// });




// // check database, inbound dates of flights.
// // for each year, add the year to labels
// // count number of labels per year and add to data
// const $ctx2 = $("#myChart2")[0].getContext('2d');

// // let ctx2 = document.getElementById('myChart2').getContext('2d');
// let myChart2 = new Chart($ctx2, {
//     type: 'radar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
//     data: {
//         labels: ['2020', '2019', '2018', '2017', '2016', '2015'],
//         datasets: [{
//             label: 'Trips per Year',
//             data: [7, 9, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.4)',
//                 'rgba(54, 162, 235, 0.4)',
//                 'rgba(255, 206, 86, 0.4)',
//                 'rgba(75, 192, 192, 0.4)',
//                 'rgba(153, 102, 255, 0.4)',
//                 'rgba(255, 159, 64, 0.4)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1,
//             hoverBorderWidth: 5
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         },
//         title: {
//             display: true,
//             text: 'Total Trips Completed in a year',
//             fontSize: 25
//         },
//         legend: {
//             display: false,
//             position: 'right',
//             labels: {
//                 fontColor: '#000'
//             }
//         },
//         layout: {
//             padding: {
//                 left: 50,
//                 right: 0,
//                 bottom: 0,
//                 top: 0
//             }
//         },
//         tooltips: {
//             enabled: true
//         }
//     }
// });