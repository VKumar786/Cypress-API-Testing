describe('Gorest APIO Chaining', () => {
    //* POST        https://gorest.co.in/public/v2/users
    //* PUT         https://gorest.co.in/public/v2/users/${userId}
    //* DELETE      https://gorest.co.in/public/v2/users/${userId}
    const auth_token = `Bearer f4907c95f9f5d63f569ce78039553defb87422bc85bf2ffe6f292ddf7f09ead4`

    it('create, update, delete user in Gorest API', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: auth_token
            },
            body: {
                name: "Vishal Kumar",
                email: Math.random().toString(5).substring(2) + "@gmail.com",
                gender: "male",
                status: "active"
            }
        })
            .then(res => {
                expect(res.status).to.equal(201)
                const userId = res.body.id

                //* Update User
                cy.request({
                    method: 'PUT',
                    url: `https://gorest.co.in/public/v2/users/${userId}`,
                    headers: {
                        Authorization: auth_token
                    },
                    body: {
                        status: 'inactive',
                        name: 'tushar'
                    }
                })
                    .then((res) => {
                        expect(res.body.status).to.equal('inactive')
                        expect(res.body.name).to.equal('tushar')
                        expect(res.status).to.equal(200)

                        //* Delete User
                        cy.request({
                            method: 'DELETE',
                            url: `https://gorest.co.in/public/v2/users/${userId}`,
                            headers: {
                                Authorization: auth_token
                            },
                        })
                            .then((res) => {
                                expect(res.status).to.equal(204)
                            })
                    })
            })
    });
})