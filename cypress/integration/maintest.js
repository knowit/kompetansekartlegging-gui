/// <reference types="Cypress" />


const testKataloger = [
    {
        'Name': "Test katalog 1",
        'Categories': [
            {
                'Name': 'Kategori 1-1',
                'Description': 'Hmm, en eller annen beskrivelse her',
                'Questions': [
                    {
                        'Name': 'Spørsmål 1-1-1',
                        'Description': 'hey hey ho ho'
                    },
                    {  
                        'Name': 'Spørsmål 1-1-2',
                        'Description': 'what is going on?!'
                    }
                ]
            },
            {
                'Name': 'Kategori 1-2',
                'Description': 'tatatata',
                'Questions': [
                    {
                        'Name': 'Spørsmål 1-2-1',
                        'Description': 'tjadada'
                    },
                    {
                        'Name': 'Spørsmål 1-2-2',
                        'Description': 'kek kek kek'
                    }
                ]
            }
        ]
    }, 
    {
        'Name': "Test katalog 2",
        'Categories': [
            {
                'Name': 'Kategori 2-1',
                'Description': 'Kul kategori',
                'Questions': [
                    {
                        'Name': 'Spørsmål 2-1-1',
                        'Description': 'gimme gimme more!'
                    },
                    {  
                        'Name': 'Spørsmål 2-1-2',
                        'Description': "don't you know that you're toxic?"
                    }
                ]
            },
            {
                'Name': 'Kategori 2-2',
                'Description': 'whaattt, enda en kategori?',
                'Questions': [
                    {
                        'Name': 'Spørsmål 2-2-1',
                        'Description': 'hit me baby one more time!'
                    },
                    {
                        'Name': 'Spørsmål 2-2-2',
                        'Description': "you're a womanizer baby!"
                    }
                ]
            }
        ]
    }
];

const dev_login = () => {
   
    cy.get('amplify-authenticator').shadow().get('amplify-sign-in').shadow().find('form').within(() => {
        cy.get('#email').type('testbruker1@randomtestmail.no');
        cy.get('#password').type('', {force: true});
        cy.contains('Sign In').click();
    });
 
};

const test_main_page = () => {
    cy.contains('Kompetansekartlegging for Test Organization');
    cy.get('button').contains('OVERSIKT');
    cy.get('button').contains('MINE SVAR');
    cy.get('button').contains('ADMIN');
};

const test_admin_gui = () => {
    cy.get('button').contains(/^ADMIN$/).click();
    cy.get('button').contains(/^Rediger gruppeledere$/);
    cy.get('button').contains(/^Rediger grupper$/);
    cy.get('button').contains(/^Rediger administratorer$/);
    cy.get('button').contains(/^Rediger katalog$/)

};

const open_edit_catalogs = () => {
    cy.get('button').contains(/^ADMIN$/).click();
    cy.get('button').contains(/^Rediger katalog$/).click();
}

const open_oversikt = () => {
    cy.get('button').contains(/^OVERSIKT$/).click();
}

const open_mine_svar = () => {
    cy.get('button').contains(/^MINE SVAR$/).click();
}

const add_catalogs = () => {

    open_edit_catalogs();

    cy.contains('button', 'Lag ny katalog').click();
    cy.get('input').type(testKataloger[0]['Name']);
    cy.contains('button', 'Legg til').click();

    cy.contains('tr', testKataloger[0]['Name']).within(() => {
        cy.contains('button', 'Endre katalog').click();
    });

    testKataloger[0]['Categories'].forEach(category => {
        cy.contains('button', 'Legg til ny kategori').click();
        cy.contains('label', 'Navnet på den nye kategorien').parent().within(() => {
            cy.get('input').type(category['Name']);
        });
        cy.get('[data-cy=category-description-input]').type(category['Description']);
        cy.contains('button', /^Legg til$/).click();


        cy.contains('li', category['Name']).first().click();
        
        category['Questions'].forEach(question => {
            cy.contains('button', 'Legg til nytt spørsmål').click();
            cy.contains('label','Emnet på det nye spørsmålet').parent().within(() => {
                cy.get('input').type(question['Name']);
            })
            cy.get('[data-cy=question-description-input]').type(question['Description']);
            cy.contains('button', /^Legg til$/).click();
        });

        cy.contains('a', testKataloger[0]['Name']).click();
    });

    cy.contains('a', 'Kataloger').click();
};

const remove_catalogs = () => {

    open_edit_catalogs();

    cy.contains('tr', testKataloger[0]['Name']).within(() => {
        cy.contains('button', 'Fjern katalog').click();
    });
    cy.contains('button', /^Fjern$/).click(); 
    cy.contains('tr', testKataloger[0]['Name']).should('not.exist');
}

describe("renders the login page correctly", () => {
    it("renders correctly", () => {
        cy.visit("/");
        cy.contains('Kompetansekartlegging');
        cy.contains('Logg inn (Knowit Objectnet)');
        cy.contains('Logg inn (Andre Knowit Selskaper)');
        

        // for dev environment, noe må gjøres med prod
        cy.contains('Dev login').click();

        dev_login()

        test_main_page();

        test_admin_gui();

        add_catalogs();

        //cy.reload(); // this is bad! State change of catalogs should happen without reload

        remove_catalogs();

    }); 
});