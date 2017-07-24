const teste = (value) => {
    console.log('value: ', value);
};

export default function printMe() {
    console.log('I get called from print.js!');
    teste("meu teste");
}