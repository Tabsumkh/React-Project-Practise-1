import React from "react"
import ReactDOM from "react-dom/client"
import './index.css'


const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];


function App() {  //component starts with upper case 
    // <div class ='container' > hudaina kina bhane class already reserved word ho JS ko so className hunxa jsx ma .

    return (<div className="container">

        <Header />
        <Menu />
        <Footer />

    </div>)

}

/* 
About function Pizza 

In react we write new components using functions!
In react there are two important rules when we write components as a functions.
-> Function names need to start with an upper case. 
-> Function needs to return some markup. (Usually in form of JSX) But we can even return nothing or null.

*/

function Header() {
    //const stye = { color: 'red', fontSize: '48px', textTransform: 'upperCase' }
    const style = {}

    return (
        <header className="header">

            <h1 style={style}>Fast React Pizza Co.</h1>
        </header>)
}

function Menu() { // Tala property (props) haleko xa. Pizza name ='', ingrdients ='' etc haru props or property ho.
    const pizzas = pizzaData
    // const pizzas = []

    // empty array halda ni shortCircuit run hunxa tala ko in the console. Because array empty bhaye ni true nai hunxa. So tei bhayera. 
    const numPizzas = pizzas.length //Now if there are no pizzas num pizzas will be zero



    return (
        <main className='menu'>
            <h2>Our Menu</h2>

            {numPizzas > 0 ? (

                <>
                    <p>
                        Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.
                    </p>


                    <ul className="pizzas">
                        {pizzas.map(pizza => (<Pizza pizzaObj={pizza} key={pizza.name} />))} {/* So pizzaObj bhaneko props ho. Yesma pizzas ma bhako every pizza object hunxa. */} {/*Now  'Key' property is basically a prop that is internal to react
                 which it needs for some perfomance optimization!  Key halena bhane chei console ma 'Each chid in a list should have a unique ;key' prop bhahnne error auxa.  So now we have passed something in the key that is unique to every element. Hamro case ma its name . Sabbai ko unique name xa afnai. */}


                    </ul> </>)
                : (<p> We will be open from  8:00 to 22:00 only! </p>)}




            {/* So mathi ko ul ma aile samma k garim bhane, pizzas array laii map garim which will create a new array. And in this array in each position there will be this 'pizza' component. And into each of these pizza component we pass as a prop the current pizza object.
            And then tala ko pizza function ma we recive the ccurrent object as a prop and from there we read all the data jun hami lai intrest xa. */}

            {/* { <Pizza
                name='Pizza Spinaci'  //Props bhanxa yiniharulai
                ingredients='Tomato, mozarella, spinach , and ricotta cheese'
                photoName='pizzas/spinaci.jpg'
                price={10} //whenever you want to pass anything that's not a sting , you go in JavaScript Mode.
            />

            <Pizza
                name="Pizza Funghi" //Order matter gardaina.
                ingredients='Tomato , mushrooms'
                price={12}
                photoName='pizzas/funghi.jpg'
            />} */}

        </main>
    )
}

// function Pizza(props) { // props chei thyakka mathi ko line <Pizza paxi ko name ingredient etc haru pass hunxa.
//     //  console.log(props) // object print garxa containing ingredients name photo name price .
//     return (<li className="pizza">
//         <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
//         <div>
//             <h3> {props.pizzaObj.name}</h3>
//             <p> {props.pizzaObj.ingredients}</p>
//             <span> {props.pizzaObj.price}</span>
//         </div>
//     </li>)
// }

function Pizza({ pizzaObj }) { // same mathi ko pizza function balai, tara yaha chei we immediatly destrucre the props. {pizzaObj} 
    return (<li className={`pizza ${pizzaObj.soldOut ? 'sold-out' : ''}`}>
        <img src={pizzaObj.photoName} alt={pizzaObj.name} />
        <div>
            <h3> {pizzaObj.name}</h3>
            <p> {pizzaObj.ingredients}</p>
            <span> {pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
        </div>
    </li>)
}


function Footer() {  // every component recieves props. BHnanu ko artha maile footer ma props paramenter banayera consoe.log props gare bhane ni euta empty object auxa! 

    const hour = new Date().getHours()
    const openHour = 8
    const closeHour = 22
    const isOpen = hour >= openHour && hour <= closeHour // 12-22 bich ko time ma xa bhane true

    console.log(isOpen) //2 choti execute hunxa since in strict mode 2 choti afai execute hunxa ekchoti bhanda.


    return (
        <footer className='footer'> {isOpen ? <Order closeHour={closeHour} openHour={openHour} /> : <p> We are happy to welcome you at {openHour}:00 to {closeHour}:00 </p>} </footer >
    )
}


function Order({ closeHour, openHour }) { // immediately destructuring multiple props

    return <div className="order">
        <p>
            We are open from {openHour}:00 until {closeHour}:00. Come visit us or order online.
        </p>
        <button className="btn" > Order</button>
    </div>
}

// React v18 
const root = ReactDOM.createRoot(document.getElementById("root"))  // root id xa html ma tyo bhitra teslai entry point initalize garxa.
root.render(<React.StrictMode> <App /> </React.StrictMode>) //root ma app component render garxa.
// Strict mode is not really a big deal. K garxa bhanda during development process , it renders all commponents twice in order to find certain bugs and also react will chec kif we are using outdated parts of react api





