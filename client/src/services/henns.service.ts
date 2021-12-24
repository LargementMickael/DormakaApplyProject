const loadHenns: () => Promise<Henn[]> = () => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/henns', {
            method: 'GET'
        }).then(response => {
            return response.json();
        }).then(jsonResults => {
            resolve(jsonResults);
        })
    });
}

export interface CreateHennRequest {
    name: string,
    breed: string
}

const createHenn: (params: CreateHennRequest) => Promise<Henn> = (
    params
) => {
    return new Promise((resolve,reject) => {
        fetch('http://localhost:5000/henns', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',

            },
        }).then(response => {
            return response.json();
        }).then(jsonResults => {
            resolve(jsonResults);
        })
    });
}

const updateHenn: (id: string, params: CreateHennRequest) => Promise<Henn> = (
    id,
    params
) => {
    return new Promise((resolve,reject) => {
        fetch(`http://localhost:5000/henns/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            return response.json();
        }).then(jsonResults => {
            resolve(jsonResults);
        })
    });
}

export const hennsService = {
    loadHenns: loadHenns,
    createHenn: createHenn,
    updateHenn: updateHenn
}