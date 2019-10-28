import { Ingredient } from './ingredient';

export interface Recipe {
    id?: string;
    title?: string;
    ingredients?:Array<Ingredient>;
    description?:string;
    instructions?: string;
    category?:string;
    picture?: string;
}
