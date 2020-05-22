const userOperations = require('./utils/userOperations')

const newUser = {
    name: "New User",
    email: 'new_user@gmail.com',
    password: 'test1234'
}

const generateNewUserSignupData = () => {
    return {        
        ...newUser,
        email: `new_user_${new Date().getTime()}@gmail.com`
    }
}

const existingUserWithAdminRole = {
    email: 'ana_admin@gmail.com',
    password: 'test1234'
}

const existingUserWithUserRole = {
    email: 'loulou@example.com',
    password: 'test1234'
}

describe('Testing user module', () => {
    test('Should sign up', async () => {
        const { user } = await userOperations.signup(generateNewUserSignupData());

        expect(user).not.toBe(null)
        expect(user.name).toBe(newUser.name)
        expect(user.id).not.toBe(null)
        expect(user.password).toBeFalsy()
    })

    test('Should login', async () => {
        const newUserGenerated = generateNewUserSignupData();
        await userOperations.signup(newUserGenerated);

        const { user, token } = await userOperations.login({email: newUserGenerated.email, password: newUserGenerated.password});

        expect(user).not.toBe(null)
        expect(user.email).toBe(newUserGenerated.email)
        expect(user.password).toBeFalsy()
        expect(token).not.toBe(null)
    })

    test('Should reject login with bad credentials', async () => {
        const newUserGenerated = generateNewUserSignupData();
        await userOperations.signup(newUserGenerated);

        await expect(userOperations.login({email: newUserGenerated.email, password: 'bad password'})).rejects.toThrow()
    })

    test('Should reject get all users when user with USER role is logged in', async () => {
        const { token } = await userOperations.login(existingUserWithUserRole)

        await expect(userOperations.getAllUsers({page: 0}, token)).rejects.toThrow();
    })

    test('Should get all users when user with ADMIN role is logged in', async () => {
        const { token } = await userOperations.login(existingUserWithAdminRole);

        await expect(userOperations.getAllUsers({page: 0}, token)).resolves.not.toBeFalsy();
    })
})
