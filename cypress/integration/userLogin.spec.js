import {go, basePage} from './pageObjects/base.page.js';
//import { go } from './pageObjects/base.page.js';
import {logIn} from './pageObjects/userLogin.page.js';

describe ('log in the site', function () {
    let credentials;
    before ('Go to the main page', function () {
        // load credentials
        cy.fixture('userCredentials.json').then(function(cred){
            credentials = cred;
        }); 

        // Access the site
        go.toHomePage();
        basePage.urlShouldContain('/demoblaze.com');
    });

    beforeEach ('Reload page', function(){
        basePage.reload();
    });

    it ('Should display modal after clicking on log in', function () {
        logIn.clickOnLogInLink();
        logIn.logInModalShouldBeVisible();
    });

    it ('Should display the text "Log in" in the log in modal title', function(){
        logIn.clickOnLogInLink();
        logIn.modalTitleShouldHaveText('Log in');
    });

    it ('Should close modal after clicking on cross button', function(){
        logIn.clickOnLogInLink();
        logIn.clickOnCrossButton();
        logIn.logInModalShouldNotBeVisible();
    });

    it ('Should display an alert asking to fill in the required data if nothing is typed', function(){
        logIn.clickOnLogInLink();
        logIn.clickOnLogInButton();
        logIn.logInAlertShouldHaveText('Please fill out Username and Password.');
    });

    it ('Should display an alert warning that the user does not exist if user is invalid', function () {
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.wrongUSer);
        logIn.typePassword(credentials.password);
        logIn.clickOnLogInButton();
        logIn.logInAlertShouldHaveText('User does not exist.');
    });

    it ('Should display an alert warning that the password is wrong if password is invalid', function(){
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.user);
        logIn.typePassword(credentials.wrongPassword);
        logIn.clickOnLogInButton();
        logIn.logInAlertShouldHaveText('Wrong password.');
    });

    it ('Should log in successfully after introducing valid credentials', function(){
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.user);
        logIn.typePassword(credentials.password);
        logIn.clickOnLogInButton();
        logIn.welcomeMessageShouldGreet(credentials.user);
    });

    it ('Should successfully log out after clicking on log out', function(){
        logIn.clickOnLogInLink();
        logIn.typeUser(credentials.user);
        logIn.typePassword(credentials.password);
        logIn.clickOnLogInButton();
        logIn.clickOnLogOut();
        logIn.welcomeMessageShouldNotBeVisible();
    })
});