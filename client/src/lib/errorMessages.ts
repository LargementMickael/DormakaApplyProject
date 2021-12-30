interface ErrorMessage {
    inputName: string,
    message: string
}

export const errorMessages: ErrorMessage[] = [
    {
        inputName: 'name',
        message: "Name length must be between 5 and 15 characters long",
    },
    {
        inputName: 'breed',
        message: "Breed length must be between 5 and 15 characters long"
    }
]