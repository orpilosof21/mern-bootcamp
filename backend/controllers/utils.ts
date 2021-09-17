export function FindByProp(data: any[], toMatch: string, prop: string){
    if (prop in data){
        console.log(prop);
        console.log(data);
        throw new Error('Invalid prop');
    }
    return Find(data, (p => p[prop] === toMatch));
}

function Find(data: any[], predicate: (arg0: any) => boolean){
    return data.find(predicate);
}
