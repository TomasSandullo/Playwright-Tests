const { test, expect } = require('@playwright/test');

//Take base information from the .env file
const baseURL=process.env.baseURL;
const bearerToken=process.env.bearerToken;
const role=process.env.role;

test('GET Administrator role and validate role type', async ({ request }) => {
    
    //Get request to the endpoint
    const response = await request.get(`${baseURL}/${role}`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    });

    //Assert that the response status is 200
    expect(response.status()).toBe(200);
    //Read rsponse body as JSON
    const responseBody = await response.json();
    //Check administrator role type
    expect(responseBody.type).toBe('ADMIN');
    console.log('Administrator type is: ', responseBody.type);
});