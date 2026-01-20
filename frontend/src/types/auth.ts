export type Register={
    name:string,
    email:string,
    passsword: string,
    password_confirmation:string
}

export type RegisterResponse={
    message:string,
    user:{
        id:string,
        name:string,
        role:string,
        email:string
    },
    token:string,
    token_type:string
}

export type Login ={
    email: string,
    password: string
}