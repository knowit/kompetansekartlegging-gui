/// <reference types="Cypress" />


let environment_variables = {};
let api_headers = {};

const fetch_environment_variables = () => {
    environment_variables = Cypress.env();
    api_headers = {
        'x-api-key': environment_variables['api-key'],
        'accept-encoding':'json'
    };
};


/*
    The way the tests are implemented now, the arrays of this object has to be recursively sorted by the Name attribute.
*/
const test_catalogs = [
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

const string_compare = (a, b) => {
    if (a.Name < b.Name) {
        return -1;
    }else if(b.Name < a.Name){
        return 1;
    }else{
        return 0;
    }
};

const dev_login = (user) => {
   
    cy.get('amplify-authenticator').shadow().get('amplify-sign-in').shadow().find('form').within(() => {
        cy.get('#email').type(user['username']);
        cy.get('#password').type(user['password'], {force: true});
        cy.contains(/^Sign In$/).click();
    });
 
};

const test_main_page = () => {
    cy.contains(/^Kompetansekartlegging for Test Organization$/);
    cy.get('button').contains(/^OVERSIKT$/);
    cy.get('button').contains(/^MINE SVAR$/);
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

const add_catalog = (catalog) => {

    open_edit_catalogs();

    cy.contains('button', /^Lag ny katalog$/).click();
    cy.get('input').type(catalog['Name']);
    cy.contains('button', /^Legg til$/).click();

    cy.contains('tr', catalog['Name']).within(() => {
        cy.contains('button', /^Endre katalog$/).click();
    });

    catalog['Categories'].forEach(category => {
        cy.contains('button', /^Legg til ny kategori$/).click();
        cy.contains('label', /^Navnet på den nye kategorien$/).parent().within(() => {
            cy.get('input').type(category['Name']);
        });
        cy.get('[data-cy=category-description-input]').type(category['Description']);
        cy.contains('button', /^Legg til$/).click();


        cy.contains('li', category['Name']).first().click();
        
        category['Questions'].forEach(question => {
            cy.contains('button', /^Legg til nytt spørsmål$/).click();
            cy.contains('label',/^Emnet på det nye spørsmålet$/).parent().within(() => {
                cy.get('input').type(question['Name']);
            })
            cy.get('[data-cy=question-description-input]').type(question['Description']);
            cy.contains('button', /^Legg til$/).click();
        });

        cy.contains('a', catalog['Name']).click();
    });

    cy.contains('a', /^Kataloger$/).click();
};

const remove_catalog = (catalog) => {

    open_edit_catalogs();

    cy.contains('tr', catalog['Name']).within(() => {
        cy.contains('button', /^Fjern katalog$/).click();
    });
    cy.contains('button', /^Fjern$/).click(); 
    cy.contains('tr', catalog['Name']).should('not.exist');
}

const test_catalog_api = () => {

    const recreated_catalogs = [];
   
    cy.request({
        'url': `${environment_variables['api-url-core']}/catalogs`,
        'headers': api_headers
    }).then((catalog_response) => {
        expect(catalog_response.status).to.eq(200);
        catalog_response.body.forEach((catalog_data) => {
            
            const recreated_catalog = {
                'Name': catalog_data['label'],
                'Categories': []
            }

            cy.request({
                'url': `${environment_variables['api-url-core']}/catalogs/${catalog_data['id']}/categories`,
                'headers': api_headers
            }).then((category_response) => {
                expect(category_response.status).to.eq(200);
                category_response.body.forEach((category_data) => {

                    const recreated_category = {
                        'Name': category_data['text'],
                        'Description': category_data['description'],
                        'Questions': []
                    };

                    cy.request({
                        'url': `${environment_variables['api-url-core']}/catalogs/${catalog_data['id']}/categories/${category_data['id']}/questions`,
                        'headers': api_headers
                    }).then((questions_response) => {
                        expect(questions_response.status).to.eq(200);
                        questions_response.body.forEach((question_data) => {
                            const recreated_question = {
                                'Name': question_data['topic'],
                                'Description': question_data['text']
                            };
                            cy.then(() =>{
                                recreated_category['Questions'].push(recreated_question);
                            });
                        });
                    }); 
                    cy.then(() => {
                        recreated_category['Questions'].sort(string_compare)
                        recreated_catalog['Categories'].push(recreated_category);
                    });
                });
            });
            cy.then(() => {
                recreated_catalog['Categories'].sort(string_compare);
                recreated_catalogs.push(recreated_catalog);
            })
        })
    }); 

    
    cy.then(() => {
        recreated_catalogs.sort(string_compare);
        cy.then(() => {
            cy.expect(Cypress._.isEqual(recreated_catalogs, test_catalogs)).to.be.true;
        });
    })

};

const test_catalog_api_empty = () => {
    cy.request({
        'url': `${environment_variables['api-url-core']}/catalogs/`,
        'headers': api_headers
    }).then((catalog_response) => {
        expect(catalog_response.status).to.eq(200);
        expect(catalog_response.body.length).to.eq(0);
    });
};

describe("renders the login page correctly", () => {
    it("renders correctly", () => {


        fetch_environment_variables();

        cy.visit("/");
        cy.contains("Kompetansekartlegging");
        cy.contains("Logg inn (Knowit Objectnet)");
        cy.contains("Logg inn (Andre Knowit Selskaper)");
        
        
        // for dev environment, noe må gjøres med prod
        cy.contains('Dev login').click();

        dev_login(environment_variables['admin-user'])

        test_main_page();

        test_admin_gui();
        
        test_catalogs.forEach((catalog) => {
            add_catalog(catalog);
        })
        test_catalog_api();
        test_catalogs.forEach((catalog) => {
            remove_catalog(catalog);
        })        
        
        test_catalog_api_empty();
    }); 
});