const bookingOperatons = require('./utils/bookingOperations')
const userOperations = require('./utils/userOperations')
const tourOperations = require('./utils/tourOperations')

const userWithAdminRole = {
    email: 'ana_admin@gmail.com',
    password: 'test1234'
}

const newBookingData = {
    price: 1999,
    paid: false
}

const newTourData = {
    name: 'The Snow Adventurer 2',
    duration: 4,
    maxGroupSize: 10,
    difficulty: "difficult",
    price: 1999,
    summary: 'This tour is amazing!',
    imageCover: "tour-3-cover.jpg",
    startLocation: {
        description: "Las Vegas, USA",
        type: "Point",
        coordinates: [-115.172652, 36.110904]
      }
}

describe('Testing booking module', () => {
    test('Should return all bookings', async () => {
        const bookings = await bookingOperatons.getBookings({page: 0})

        expect(bookings).not.toBe(null)
        expect(bookings.length).toBeGreaterThan(0)
    })

    test('Should create new booking when user with ADMIN role is logged in', async () => {
        const { token, user } = await userOperations.login(userWithAdminRole)
        const tour = await tourOperations.createTour(
            {
                ...newTourData,
                name: newTourData.name + new Date().getTime()
            },
            token)

        const createdBooking = await bookingOperatons.createBooking({
            ...newBookingData,
            tour: tour.id,
            user: user.id
        }, token)

        expect(createdBooking).not.toBeFalsy()
        expect(createdBooking.id).not.toBeFalsy()
        expect(createdBooking.price).toEqual(newBookingData.price)
        expect(createdBooking.user).toEqual(user.id)
    })

    test('Should reject create new booking when user is NOT logged in', async () => {
        const { token, user } = await userOperations.login(userWithAdminRole)
        const tour = await tourOperations.createTour(
            {
                ...newTourData,
                name: newTourData.name + new Date().getTime()
            },
            token)

        // do not send token => not logged in
        await expect(bookingOperatons.createBooking({
            ...newBookingData,
            tour: tour.id,
            user: user.id
        }, null)).rejects.toThrow()
    })

    test('Should update booking when user with ADMIN role is logged in', async () => {
        const { token, user } = await userOperations.login(userWithAdminRole)
        const tour = await tourOperations.createTour(
            {
                ...newTourData,
                name: newTourData.name + new Date().getTime()
            },
            token)

        const createdBooking = await bookingOperatons.createBooking({
            ...newBookingData,
            tour: tour.id,
            user: user.id
        }, token)

        const newPrice = newBookingData.price - 1000

        const updatedBooking = await bookingOperatons.updateBooking(
            createdBooking.id,
            {
                price: newPrice
            }, 
            token)

        expect(updatedBooking).not.toBeFalsy()
        expect(updatedBooking.price).toEqual(newPrice)
    })

    test('Should delete booking when user with ADMIN role is logged in', async () => {
        const { token, user } = await userOperations.login(userWithAdminRole)
        const tour = await tourOperations.createTour(
            {
                ...newTourData,
                name: newTourData.name + new Date().getTime()
            },
            token)

        const createdBooking = await bookingOperatons.createBooking({
            ...newBookingData,
            tour: tour.id,
            user: user.id
        }, token)

        await expect(bookingOperatons.deleteBooking(createdBooking.id, token)).resolves.toBeFalsy()
    })
})
