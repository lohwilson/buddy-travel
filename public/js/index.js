
console.log('index js is working')
// const moment = require('moment');

$(()=>{
    let $home = $('.home')

    $home.on('click', ()=>{
        console.log('home is clicked')
    })



/////////////////////////////////   UPDATE BUDGET IN NEW TRIP PAGE      ////////////////////////
    const $flightPrice = $('#flightPrice');
    const $accommodationPrice = $('#accommodationPrice')
    const $allocatedBudget = $('#allocatedBudget');

    let flightPrice 
    let accommodationPrice 

    $flightPrice.change((event)=>{
        flightPrice = parseInt(event.target.value)
        $flightPrice.attr('value', flightPrice)
        if (!$accommodationPrice.attr('value')){
            accommodationPrice = 0
        } else {
            accommodationPrice = parseInt($accommodationPrice.attr('value'))
        }
        setMinimumBudget()
    })

    $accommodationPrice.change((event)=>{
        accommodationPrice = parseInt(event.target.value)
        $accommodationPrice.attr('value', accommodationPrice)
        if (!$flightPrice.attr('value')){
            flightPrice = 0
        } else {
            flightPrice = parseInt($flightPrice.attr('value'))
        }
        setMinimumBudget()
    })

    function setMinimumBudget(){
        $allocatedBudget.attr('placeholder', flightPrice+accommodationPrice)
        $allocatedBudget.attr('min', flightPrice+accommodationPrice)
    }
/////////////////////////////////   UPDATE BUDGET IN NEW TRIP PAGE      ////////////////////////




// not working yet
/////////////////////////////////   APPEND FLAG IN NEW TRIP PAGE      ////////////////////////
    const $chooseNewCountry = $('#chooseNewCountry')
    const $selectedCountryFlag = $('.selectedCountryFlag')
    let countryName
    let countryFlag

    $chooseNewCountry.change(async (event)=>{
        countryName = event.target.value
        await getFlag(countryName)
        $selectedCountryFlag.css('background-image', `url(${countryFlag})`)
    })

    async function getFlag(name){
        let response = await fetch('https://restcountries.eu/rest/v2/all')
        let country = await response.json()
        for (let i = 0; i < country.length; i++){
            if (name === country[i].name){
                countryFlag = country[i].flag
            }
        }
    }
/////////////////////////////////   APPEND FLAG IN NEW TRIP PAGE      ////////////////////////



// not working yet
///////////////////////////////// depart date cannot be before arrive date ///////////////////////

    const $arrive = $('#arrive');
    const $depart = $('#depart');

    let arriveDate 
    let departDate 

    $arrive.change((event) => {
        arriveDate = event.target.value
        departDate = $depart.val()
        if(departDate !== undefined){
            checkDate()
        
        }
    })
    $depart.change((event) => {
        departDate = event.target.value
        checkDate()
    })
    function checkDate (){
        if(arriveDate === undefined){
            arriveDate = $arrive.val()
            console.log(arriveDate)
        }
        let departure = departDate.split('')
        departure.splice(4,1)
        departure.splice(6,1)
        let joinedDeparture = departure.join('')

        let arrival = arriveDate.split('')
        arrival.splice(4,1)
        arrival.splice(6,1)
        let joinedArrival = arrival.join('')
        
        if(joinedDeparture < joinedArrival){
            departDate = arriveDate
            $depart.val(departDate)
        }

        console.log(departDate)
    }

///////////////////////////////// depart date cannot be before arrive date ///////////////////////


///////////////////////////////// overviewpage charts //////////////////////////////////

    const $totalSpent = $('#totalSpent')
    const $totalSpentFlight = $('#totalSpentFlight')
    const $totalSpentAccommodation = $('#totalSpentAccommodation')

    let totalSpent = parseInt($totalSpent.attr('val'))
    let totalSpentFlight = parseInt($totalSpentFlight.attr('val'))
    let totalSpentAccommodation = parseInt($totalSpentAccommodation.attr('val'))
    let spending = totalSpent - totalSpentFlight - totalSpentAccommodation

    let spendingPercentage = (spending/totalSpent*100).toFixed(2)
    let flightPercentage = (totalSpentFlight/totalSpent*100).toFixed(2)
    let accommodationPercentage = (totalSpentAccommodation/totalSpent*100).toFixed(2)

    const $ctx1 = $("#myChart1")[0].getContext('2d');
    let myChart = new Chart($ctx1, {
        type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: ['Spending', 'Flight', 'Accommodation'],
            datasets: [{
                label: 'Amount spent based on category',
                data: [spendingPercentage, flightPercentage, accommodationPercentage],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 159, 64, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            animation: {
                animateScale: true
            },
            cutoutPercentage: 20,
            title: {
                display: true,
                text: 'Amount spent based on category (%)',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
            tooltips: {
                enabled: true
            }
        }
    });


})