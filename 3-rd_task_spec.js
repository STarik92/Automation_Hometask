const axios = require('axios');

const baseUrl = 'https://petstore.swagger.io/v2';

describe('User Creation API Tests', () => {
  it('Should allow creating a User', async () => {
    const user = {
      id: 1,
      username: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
    };

    try {
      const response = await axios.post(`${baseUrl}/user`, user);
      expect(response.status).to.equal(200);

    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  });

  it ('User should login in', async () => {
    const logininfo = {
        username: 'testuser',
        password: 'password123',
      };
      
      try {
        const response = await axios.get (`${baseUrl}/user/login`, logininfo);
        expect(response.status).to.equal(200);
      }catch (error) {
        throw new Error(`API request failed: ${error.message}`);
      }
  });

  it('Should allow creating List of Users', async () => {
    const userlist = [{
      id: 1,
      username: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
    },
    {
        id: 1,
        username: 'testuser',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890',
    }
];

    try {
      const response = await axios.post(`${baseUrl}/user/createWithList`, userlist);

      expect(response.status).to.equal(200);

    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  });

  it ('User should log out', async () => {
      
      try {
        const response = await axios.get (`${baseUrl}/user/logout`);
        expect(response.status).to.equal(200);
      }catch (error) {
        throw new Error(`API request failed: ${error.message}`);
      }
  });

  it('Should allow creating a Pet', async () => {
    const petdata = {
        id: 1,
        category: {
          id: 1,
          name: "Test_cat_name"
        },
        name: "doggie",
        photoUrls: [
          "https://www.google.com/search?q=cat+photo&sca_esv=570043172&tbm=isch&source=lnms&sa=X&ved=2ahUKEwiz-ILBw9eBAxVkWEEAHVHXH8kQ_AUoAXoECAEQAw&biw=958&bih=939&dpr=1#imgrc=0LtKV6SSeh9FYM"
        ],
        tags: [
          {
            id: 1,
            name: "tag"
          }
        ],
        status: "available"
    };

    try {
      const response = await axios.post(`${baseUrl}/pet`, petdata);

      expect(response.status).to.equal(200);

    } catch (error) {

      throw new Error(`API request failed: ${error.message}`);
    }
  });

  it('Should allow updating pet image', async () => {
    const updatepetphoto = {
        id: 1,

        photoUrls: [
          "https://www.google.com/search?q=cat+photo&sca_esv=570043172&tbm=isch&source=lnms&sa=X&ved=2ahUKEwiz-ILBw9eBAxVkWEEAHVHXH8kQ_AUoAXoECAEQAw&biw=958&bih=939&dpr=1#imgrc=0LtKV6SSeh9FYM"
        ]
    };

    try {
 
      const response = await axios.put(`${baseUrl}/pet`, updatepetphoto);
      expect(response.status).to.equal(200);

    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  });

  it('Should allow updating pet name and status', async () => {
    const updatepetphoto = {
        id: 1,
        name: "waffy",
        status: "pending"
    };

    try {
      const response = await axios.put(`${baseUrl}/pet`, updatepetphoto);
      expect(response.status).to.equal(200);

    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  });

  it('Should allow delete pet', async () => {
    const petidtoDelete = 1

    try {
      const response = await axios.delete(`${baseUrl}/pet/${petidtoDelete}`);
      expect(response.status).to.equal(200);

    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  });


});
