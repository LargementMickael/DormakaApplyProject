import { hennsService } from './henns.service';
import { loadingHennsResult, updatedHennResult, createdHennResult } from '../__mocksData__/fetchResults';

beforeAll(() => {
    global.fetch = jest.fn((
        url: RequestInfo, 
        optn: RequestInit
    ) => {
            if(typeof optn.method !== undefined){
                switch(optn.method){
                    case 'GET':
                        return Promise.resolve({
                            json: () => Promise.resolve(loadingHennsResult),
                        });
                    case 'POST':
                        return Promise.resolve({
                            json: () => Promise.resolve(createdHennResult),
                        });
                    case 'PATCH':
                        return Promise.resolve({
                            json: () => Promise.resolve(updatedHennResult),
                        });
                }
            }
        }
    ) as jest.Mock;
});

describe("Henns Services API calls testing", () => {

    test("Loading henns endpoint", () => {
        return hennsService.loadHenns().then(res => {
            expect(res).toEqual(loadingHennsResult);
        })
    });
    
    test("Updating henn endpoint", () => {
        return hennsService.updateHenn(
            '', 
            { 
                name: '', 
                breed: ''
            }
        ).then(res => {
            expect(res).toEqual(updatedHennResult);
        })
    });

    test("Creating henn endpoint", () => {
        return hennsService.createHenn(
            {
                name: '',
                breed: '',
                imageUrl: ''
            }
        ).then(res => {
            expect(res).toEqual(createdHennResult);
        })
    });

});