const HennServiceUrl: string = `http://ec2-18-156-77-107.eu-central-1.compute.amazonaws.com:5000/henns`;

const loadHenns: () => Promise<Henn[]> = () => {
    return new Promise((resolve, reject) => {
        fetch(HennServiceUrl, {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResults => {
            resolve(jsonResults);
        })
        .catch(err => {
            reject(err);
        });
    });
}

export interface CreateHennRequest {
    name: string,
    breed: string,
    imageUrl: string
}

const createHenn: (params: CreateHennRequest) => Promise<Henn> = (
    params
) => {
    return new Promise((resolve,reject) => {
        fetch(HennServiceUrl, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResults => {
            resolve(jsonResults);
        })
        .catch(err => {
            reject(err);
        });
    });
}

export interface UpdateHennRequest {
    name: string,
    breed: string,
}

const updateHenn: (id: string, params: UpdateHennRequest) => Promise<Henn> = (
    id,
    params
) => {
    return new Promise((resolve,reject) => {
        fetch(`${HennServiceUrl}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResults => {
            resolve(jsonResults);
        })
        .catch(err => {
            reject(err);
        });
    });
}

export const hennsService = {
    loadHenns: loadHenns,
    createHenn: createHenn,
    updateHenn: updateHenn
}