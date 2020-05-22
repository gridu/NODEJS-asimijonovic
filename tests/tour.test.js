const userOperations = require('./utils/userOperations')
const tourOperations = require('./utils/tourOperations')

const userWithAdminRole = {
    email: 'ana_admin@gmail.com',
    password: 'test1234'
}

const userWithUserRole = {
    email: 'loulou@example.com',
    password: 'test1234'
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

describe('Testing tour module', () => {
    test('Should return all tours', async () => {
        const { token } = await userOperations.login(userWithAdminRole)
   
        await tourOperations.createTour({
            ...newTourData,
            name: newTourData.name + new Date().getTime()
        }, token)

        const tours = await tourOperations.getTours({page: 0})

        expect(tours).not.toBe(null)
        expect(tours.length).toBeGreaterThan(0)
    })

    test('Should create new tour when user with ADMIN role is logged in', async () => {
        const { token } = await userOperations.login(userWithAdminRole)
   
        const createdTour = await tourOperations.createTour({
            ...newTourData,
            name: newTourData.name + new Date().getTime()
        }, token)

        expect(createdTour).not.toBeFalsy()
        expect(createdTour.id).not.toBeFalsy()
        expect(createdTour.summary).toEqual(newTourData.summary)
    })

    test('Should reject create new tour when user is NOT logged in', async () => {
        // do not send token => not logged in
        await expect(tourOperations.createTour({
            ...newTourData,
            name: newTourData.name + new Date().getTime()
        }, null)).rejects.toThrow()
    })

    test('Should reject create new tour when user with USER role is logged in', async () => {
        const { token } = await userOperations.login(userWithUserRole)
    
        await expect(tourOperations.createTour({
            ...newTourData,
            name: newTourData.name + new Date().getTime()
        }, token)).rejects.toThrow()
    })

    test('Should update tour when user with ADMIN role is logged in', async () => {
        const { token} = await userOperations.login(userWithAdminRole)
        const { id: createdTourId } = await tourOperations.createTour(
            {
                ...newTourData,
                name: newTourData.name + new Date().getTime()
            },
            token)

        const newName = `New name of the tour ${new Date().getTime()}`;

        const updatedTour = await tourOperations.updateTour(
            createdTourId,
            {
                name: newName
            },
            token)

        expect(updatedTour).not.toBeFalsy()
        expect(updatedTour.name).toEqual(newName)
    })

    test('Should delete tour when user with ADMIN role is logged in', async () => {
        const { token } = await userOperations.login(userWithAdminRole)
        const { id } = await tourOperations.createTour(
            {
                ...newTourData,
                name: newTourData.name + new Date().getTime()
            },
            token)

        await expect(tourOperations.deleteTour(id, token)).resolves.toBeFalsy();
    })
})
