export type Move = {
    from: { x: number; y: number }, 
    to: { x: number; y: number },
  };

export type User = {
    id? : number;
    login: string;
    email: string;
    password: string;
};