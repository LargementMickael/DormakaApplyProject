import request from "supertest";
import App from '../app';
import HennController from './henns.controller'

const app = new App([new HennController], 8000);

// jest.setTimeout(10000000);

describe("Henn controller endpoints testing", () => {
    
    it("GET /henns", async () => {
        const results = await request(app.getServer()).get('/henns');
        expect(results.body[0].name).toMatch(/[A-Z]*/g);
    });

    it("POST /henns with matching payload", done => {
        request(app.getServer())
            .post('/henns')
            .send({
                name: 'HennFromTest', 
                breed: 'Sussex'
            })
            .end((err, res) => {
                if(!err){
                    done();   
                }
            })
    });

    it("POST /henns with non matching payload", done => {
        request(app.getServer())
            .post('/henns')
            .send({
                wrongNameAttribute: 'HennFromFalse', 
                breed: 'Sussex'
            })
            .end((err, res) => {
                console.log(res.statusCode);
                if(res.statusCode === 400){
                    done();
                }
            })
    });

    it("PATCH /henns with matching payload", done => {
        request(app.getServer())
            .patch('/henns/61c2706016387b9bb367f0b0')
            .send({
                name: 'HennNameUpdated', 
                breed: 'Sussex'
            })
            .end((err, res) => {
                if(res.statusCode === 200){
                    done();
                }
            })
    });

})
