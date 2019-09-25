const request = require('../request');
const db = require('../db');

describe('bird api', () => {

  beforeEach(() => {
    return db.dropCollection('birds');
  });
  
  const barnOwl = {
    name: 'Barn Owl',
    appearance: {
      pattern: 'spotted',
      mainColor: 'Brown'
    },
    wingSpan: 33,
    flying: true,
    scientificClass: {
      Kingdom:	'Animalia',
      Phylum:	'Chordata',
      Class:	'Aves',
      Order:	'Strigiformes',
      Family:	'Tytonidae',
      Genus:	'Tyto',
      Species:	'T. alba'
    },
    diet: ['rodents', 'bats', 'lizards'],
    conservation: 'Least Concern',
  };
  
  function postBird(bird) {
    return request
      .post('/api/birds')
      .send(bird)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a bird', () => {
    return postBird(barnOwl)
      .then(bird => {
        expect(bird).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...barnOwl
        });
      });
  });

  it('gets a bird by id', () => {
    return postBird(barnOwl)
      .then(bird => {
        return request.get(`/api/birds/${bird._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(bird);
          });
        
      });
  });

  it('gets a list of birds', () => {
    return Promise.all([
      postBird({
        name: 'Barn Owl',
        appearance: {
          pattern: 'spotted',
          mainColor: 'Brown'
        },
        wingSpan: 33,
        flying: true,
        scientificClass: {
          Kingdom:	'Animalia',
          Phylum:	'Chordata',
          Class:	'Aves',
          Order:	'Strigiformes',
          Family:	'Tytonidae',
          Genus:	'Tyto',
          Species:	'T. alba'
        },
        diet: ['rodents', 'bats', 'lizards'],
        conservation: 'Least Concern',
      }),
      postBird({
        name: 'Barn Owl',
        appearance: {
          pattern: 'spotted',
          mainColor: 'Brown'
        },
        wingSpan: 33,
        flying: true,
        scientificClass: {
          Kingdom:	'Animalia',
          Phylum:	'Chordata',
          Class:	'Aves',
          Order:	'Strigiformes',
          Family:	'Tytonidae',
          Genus:	'Tyto',
          Species:	'T. alba'
        },
        diet: ['rodents', 'bats', 'lizards'],
        conservation: 'Least Concern',
      }),
      postBird({
        name: 'Barn Owl',
        appearance: {
          pattern: 'spotted',
          mainColor: 'Brown'
        },
        wingSpan: 33,
        flying: true,
        scientificClass: {
          Kingdom:	'Animalia',
          Phylum:	'Chordata',
          Class:	'Aves',
          Order:	'Strigiformes',
          Family:	'Tytonidae',
          Genus:	'Tyto',
          Species:	'T. alba'
        },
        diet: ['rodents', 'bats', 'lizards'],
        conservation: 'Least Concern',
      })
    ])
      .then(() => {
        return request
          .get('/api/birds')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });
  it('updates a bird', () => {
    return postBird(barnOwl)
      .then(bird => {
        bird.flying = false;
        return request
          .put(`/api/birds/${bird._id}`)
          .send(bird)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.flying).toBe(false);
      });
  });
  it('deletes a bird', () => {
    return postBird(barnOwl)
      .then(bird => {
        return request
          .delete(`/api/birds/${bird._id}`)
          .expect(200);
      });
  });
}); 

