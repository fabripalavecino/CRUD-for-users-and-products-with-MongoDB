const info = (text:string): string => {
    console.log("Info:", text);
    return text;
};
const error = (text:string): string => {
    console.log("Error:", text);
    return text;
};

interface SumData {
    num1: number;
    num2: number;
}

const suma = (data: SumData) :number => {
    return data.num1 + data.num2;
};

export {info, error, suma};
