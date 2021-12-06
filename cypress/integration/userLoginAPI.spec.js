/// <reference types="cypress" />
import faker from 'faker';

describe('Given login through API and adding a product to the cart', () => {
    context('When user sends POST /login', () => {
        let token;
        
        it('should return the token', () => {
            cy.request({
                method: 'POST',
                url: 'https://api.demoblaze.com/login',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    username: "first@mailsac.com",
                    password: "Zmlyc3RAbWFpbHNhYy5jb20="
                }
            })
            .should((response) => {
                expect(response.status).to.be.eq(200)
                token = JSON.stringify(response.body).split(':')[1].replace(/\"/g,'').trim()
                cy.log('user token is:' + token)
            })
        });

        it('Then validate the user id, token and expiration', () => {
            let user_token = token;
            cy.request({
                method: 'POST',
                url: 'https://api.demoblaze.com/check',
                body: {
                    token: user_token
                }
            })
            .should((resp) => {
                expect(resp.status).eq(200)
                expect(resp.body.Item.token).eq(user_token)
                expect(resp.body.Item.username).eq("first@mailsac.com")
            });
        });

        //Create a new UUID to add product to cart
        const newuuid = faker.random.uuid();

        it('And user adds the product to the cart', () => {      
            cy.request({
                method: 'POST',
                url: 'https://api.demoblaze.com/addtocart',
                body: {
                    id: newuuid,
                    cookie: token,
                    prod_id :5,
                    flag: true
                }
            })
            .should((response) => {
                expect(response.status).to.be.eq(200)
                cy.log(response.body)
            })
        });

        it('Then check the product in the cart', () => {      
            cy.request({
                method: 'POST',
                url: 'https://api.demoblaze.com/viewcart',
                body: {
                    cookie: token,
                    flag: true
                }
            })
            .should((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body.Items[0].id).eq(newuuid)
                expect(response.body.Items[0].cookie).eq("first@mailsac.com")
                expect(response.body.Items[0].prod_id).eq(5)
            })
        });

        it('And delete the product from the cart', () => {      
            cy.request({
                method: 'POST',
                url: 'https://api.demoblaze.com/deleteitem',
                body: {
                    id: newuuid
                }
            })
            .should((response) => {
                expect(response.status).to.be.eq(200)
                expect(response.body).eq('Item deleted.')

            })
        });
    });
});