// 1. Tüm koltuklarin kapsayicisi container divi cek
// 2. Container'e Click eventi ekle
const container = document.querySelector(".container");

const infoText = document.querySelector('.infoText')
//console.log (infoText)

const movieList = document.querySelector('#movie')
//console.log(movieList)

const seatCount = document.getElementById('count')

const totalAmount = document.getElementById('amount')

const seats = document.querySelectorAll('.seat:not(reserved)')

const saveToDatabase = (index) => {

    //console.log('data',index)

    localStorage.setItem('seatsIndex', JSON.stringify(index))

    //Film verisi kaydı
    localStorage.setItem('movieIndex',JSON.stringify(movieList.selectedIndex))
};

const getFromDatabase = () => {
    const dbSelectedSeats = JSON.parse(localStorage.getItem('seatsIndex'))
    return dbSelectedSeats

    if (dbSelectedSeats !== null) {
        seats.forEach((seat, index) => {
            if (dbSelectedSeats.includes(index)) {
                seat.classList.add('selected')
            }
        })
    }

const dbSelectedMovie=JSON.parse(localStorage.getItem('movieIndex'))
movieList.selectedIndex=dbSelectedMovie
}

const createIndex = () => {
    let allSeatsArray = []

    seats.forEach((seat) => {
        allSeatsArray.push(seat)
    })
    //console.log(allSeatsArray)
    const allSelectedSeatsArray = []
    console.log(getFromDatabase())
    const allSelectedSeats = container.querySelectorAll('.seat.selected')

    allSelectedSeats.forEach((selectedSeat) => {
        allSelectedSeatsArray.push(selectedSeat)
    })
    //console.log(allSelectedSeatsArray)

    const selectedSeatsIndex = allSelectedSeatsArray.map((selectedSeat) => {

        return allSeatsArray.indexOf(selectedSeat)

    })
    //console.log(selectedSeatsIndex)

    saveToDatabase(selectedSeatsIndex)
}

const calculateTotal = () => {
    createIndex()
    //console.log('calculate Çalıştı')

    let selectedSeatsCount =
        container.querySelectorAll('.seat.selected').length;
    //console.log(selectedSeatsCount)

    seatCount.innerText = selectedSeatsCount
    totalAmount.innerText = selectedSeatsCount * movieList.value

    if (selectedSeatsCount > 0) {
        infoText.classList.add('open')
    } else {
        infoText.classList.remove('open')
    }

};

calculateTotal()
container.addEventListener('click', (pointerEvent) => {
    const clickedSeat = pointerEvent.target.offsetParent

    if (clickedSeat.classList.contains('seat') &&
        !clickedSeat.classList.contains('reserved')) {
        clickedSeat.classList.toggle('selected')
    }
    calculateTotal()
})

movieList.addEventListener('change', () => {
    calculateTotal()
})