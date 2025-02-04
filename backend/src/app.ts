// Type générique pour une fonction avec retour de type spécifique
export type GenericFunction<T = any, R = void> = (arg: T) => R;

// Type générique pour un tableau avec des éléments d'un type spécifique
export type ArrayOf<T = any> = T[];

// Type générique pour un objet avec des clés de type `string` et des valeurs de type spécifique
export type StringKeyedObject<T = any> = {
  [key: string]: T;
};

// Type pour une réponse d'API
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

// Exemple d'interface pour une fonction de transformation
export interface TransformFunction<TInput, TOutput> {
  (input: TInput): TOutput;
}

// Type générique pour une pagination d'éléments
export interface PaginatedData<T> {
  data: T[];
  total: number;
  limit: number;
  page: number;
}

// Type générique pour une fonction asynchrone
export type AsyncFunction<T = any, R = void> = (arg: T) => Promise<R>;

// Exemple d'interface pour un utilisateur (à adapter en fonction de tes besoins)
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Exemple d'interface pour une erreur d'API
export interface ApiError {
  message: string;
  status: number;
}

// Un type générique pour les éléments d'une liste (type par défaut)
export type ListItem<T = any> = T;

/// <reference types="vite/client" />

// interface ImportMetaEnv {
//     readonly VITE_API_URL: string;
//     readonly VITE_SOME_KEY: string;
//   }

//   interface ImportMeta {
//     readonly env: ImportMetaEnv;
//   }

//   interface User {
//     id: ID;
//     name: string;
//     email?: string;
//   }
//   declare module "*.json" {
//     interface MyData {
//       name: string;
//       age: number;
//     }
//     const value: MyData;
//     export default value;
//   }

//   declare module "*.png" {
//     const src: string;
//     export default src;
//   }

// // Définition d'un type simple
// type ID = string | number;

// // Interface pour un utilisateur
// interface User {
//   id: ID;
//   name: string;
//   email?: string; // "?" signifie que la propriété est optionnelle
// }

// // Exemple d'utilisation
// const user: User = {
//   id: 1,
//   name: "Aragorn",
// };

// // Fonction qui retourne une chaîne de caractères
// function greet(user: User): string {
//     return `Bonjour, ${user.name} !`;
//   }
  
//   console.log(greet(user)); // Bonjour, Aragorn !

//   // Tableau d'utilisateurs
// const users: User[] = [
//     { id: 1, name: "Frodo" },
//     { id: 2, name: "Sam", email: "sam@shire.com" },
//   ];
  
//   // Objet avec des clés dynamiques typées
//   const userRoles: Record<string, string> = {
//     admin: "Gandalf",
//     user: "Frodo",
//   };

//   function parseData(data: unknown): void {
//     if (typeof data === "string") {
//       console.log(`C'est une chaîne : ${data.toUpperCase()}`);
//     } else {
//       console.log("Données non reconnues");
//     }
//   }

//   // Fonction générique qui retourne un élément aléatoire d'un tableau
// function getRandomElement<T>(arr: T[]): T {
//     const index = Math.floor(Math.random() * arr.length);
//     return arr[index];
//   }
  
//   const names = ["Legolas", "Gimli", "Arwen"];
//   console.log(getRandomElement(names)); // Exemple de sortie : "Gimli"
  
//   parseData("Hello"); // C'est une chaîne : HELLO
//   parseData(42); // Données non reconnues

//   async function fetchUser(id: number): Promise<User> {
//     const response = await fetch(`https://api.example.com/users/${id}`);
//     return response.json(); // TypeScript comprend que ça retourne un `User`
//   }
  
//   fetchUser(1).then((user) => console.log(user.name));

