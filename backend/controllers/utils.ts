import { IPlaceData } from "./places-controller";

type dataType = IPlaceData;

export function RemoveById(data: dataType[], toMatch: string){
    return data.filter(p => p.id !== toMatch);
}

export function GetIndexById(data: dataType[], toMatch: string){
    return data.findIndex(p => p.id === toMatch)
}

export function GetCopyByProp(data: any[], toMatch: string, prop: string){
    return {...Find(data, (p => p[prop] === toMatch))};
}

export function FindByProp(data: any[], toMatch: string, prop: string){
    if (prop in data){
        console.log(prop);
        console.log(data);
        throw new Error('Invalid prop');
    }
    return Find(data, (p => p[prop] === toMatch));
}

export function FilterByProp(data: any[], toMatch: string, prop: string){
    if (prop in data){
        console.log(prop);
        console.log(data);
        throw new Error('Invalid prop');
    }
    return Filter(data, (p => p[prop] === toMatch));
}

function Find(data: any[], predicate: (arg0: any) => boolean){
    return data.find(predicate);
}

function Filter(data: any[], predicate: (arg0: any) => boolean){
    return data.filter(predicate);
}
